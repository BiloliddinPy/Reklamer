#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  YouTube Data API v3 — O'zbekiston kanallarini yuklovchi skript
═══════════════════════════════════════════════════════════════

SOZLASH:
  1. Google Cloud Console'dan YouTube Data API v3 yoqing:
     https://console.cloud.google.com/apis/library/youtube.googleapis.com
  2. API Key oling → Credentials → Create Credentials → API Key
  3. .env faylga yozing: YOUTUBE_API_KEY=AIza...

ISHLATISH:
  pip install google-api-python-client python-dotenv
  python fetch_youtube_stats.py
  
  → Natija: data/youtube_channels.json (frontend'ga import qilsa bo'ladi)
"""

import json
import os
from pathlib import Path

from dotenv import load_dotenv
from googleapiclient.discovery import build

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")
if not API_KEY:
    raise ValueError(
        "YOUTUBE_API_KEY topilmadi!\n"
        "Yuqoridagi yo'riqnomaga qarang va .env faylga qo'shing."
    )

# ─── O'zbekiston YouTube kanallarining @handle/ID larini shu yerga yozing ───
CHANNEL_HANDLES = [
    "@Subyektiv",
    "@TeacherAzam",
    "@MobiluzTech",
    "@muxlislar",
    "@KomiljonOtaniyozov",
    "@itparkuzbekistan",
    "@hayotsoglik",
    # Qo'shimcha kanallar shu yerga:
]

# Yoki to'g'ridan-to'g'ri Channel ID bilan (handle ishlamasa):
CHANNEL_IDS = [
    # "UCxxxxxxx",  # example
]


def get_channel_stats(youtube, identifiers: list[str], id_type: str = "forHandle") -> list[dict]:
    """
    Kanallar statistikasini YouTube API orqali oladi.
    id_type: 'forHandle' (@ bilan) yoki 'id' (UCxx... bilan)
    """
    results = []

    # YouTube API'da bir so'rovda max 50 ta
    for i in range(0, len(identifiers), 50):
        batch = identifiers[i:i + 50]

        params = dict(
            part="snippet,statistics,brandingSettings",
            maxResults=50,
        )
        if id_type == "forHandle":
            # Eski API uchun: bitta-bitta search qilish kerak
            for handle in batch:
                clean_handle = handle.lstrip("@")
                try:
                    resp = youtube.channels().list(
                        part="snippet,statistics",
                        forHandle=clean_handle,
                    ).execute()
                    if resp.get("items"):
                        results.append(resp["items"][0])
                except Exception as e:
                    print(f"  ⚠ {handle} uchun xato: {e}")
        else:
            params["id"] = ",".join(batch)
            resp = youtube.channels().list(**params).execute()
            results.extend(resp.get("items", []))

    return results


def format_channel(item: dict) -> dict:
    """YouTube API javobini frontend Influencer formatiga o'tkazadi."""
    snippet = item.get("snippet", {})
    stats = item.get("statistics", {})

    subscribers = int(stats.get("subscriberCount", 0))
    views = int(stats.get("viewCount", 0))

    # Taxminiy narx hisoblash (O'zbekiston bozori)
    # $0.0003 per subscriber (taxminiy bozor bahosi)
    estimated_price = round(subscribers * 0.0003)
    estimated_price = max(50, min(estimated_price, 5000))  # $50 - $5000 oralig'ida

    channel_id = item.get("id", "")
    handle = snippet.get("customUrl", "").lstrip("@")

    return {
        "id": f"yt-{handle or channel_id[:8]}",
        "name": snippet.get("title", ""),
        "handle": handle or channel_id,
        "platform": "youtube",
        "category": "education",  # Qo'lda to'g'irlash kerak
        "followers": subscribers,
        "rating": 4.7,           # Qo'lda to'g'irlash kerak
        "price": estimated_price,
        "isTop": subscribers > 300000,
        "location": snippet.get("country", "UZ"),
        "bio": snippet.get("description", "").split("\n")[0][:200] if snippet.get("description") else "",
        "engagementRate": None,   # YouTube'dan ER hisoblash uchun video statistika kerak
        "socialUrl": f"https://www.youtube.com/channel/{channel_id}",
        "imageUrl": snippet.get("thumbnails", {}).get("high", {}).get("url", ""),
        "views_total": views,
        "_raw_subscribers": subscribers,
    }


def main():
    youtube = build("youtube", "v3", developerKey=API_KEY)

    print("🔍 YouTube kanallarini tekshiryapman...\n")

    all_items = []

    if CHANNEL_HANDLES:
        print(f"  @handle orqali {len(CHANNEL_HANDLES)} ta kanal...", end=" ")
        items = get_channel_stats(youtube, CHANNEL_HANDLES, "forHandle")
        all_items.extend(items)
        print(f"✓ {len(items)} ta topildi")

    if CHANNEL_IDS:
        print(f"  ID orqali {len(CHANNEL_IDS)} ta kanal...", end=" ")
        items = get_channel_stats(youtube, CHANNEL_IDS, "id")
        all_items.extend(items)
        print(f"✓ {len(items)} ta topildi")

    if not all_items:
        print("\n⚠  Hech qanday kanal topilmadi. Handle'larni tekshiring.")
        return

    channels = [format_channel(item) for item in all_items]

    # Obunachilarga ko'ra saralash
    channels.sort(key=lambda x: x["followers"], reverse=True)

    # Saqlash
    output_dir = Path(__file__).parent / "data"
    output_dir.mkdir(exist_ok=True)
    output_path = output_dir / "youtube_channels.json"

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(channels, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {len(channels)} ta kanal saqlandi: {output_path}\n")
    print("─" * 60)
    for ch in channels:
        subs = ch["followers"]
        label = f"{subs/1_000_000:.1f}M" if subs >= 1_000_000 else f"{subs//1000}K"
        print(f"  {ch['name']:35} {label:8} obunachilar  ~${ch['price']}/post")


if __name__ == "__main__":
    main()
