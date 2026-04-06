#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  Telegram Kanallar Statistikasi Yuklovchi
═══════════════════════════════════════════════════════════════

USUL:
  Public Telegram sahifalarini o'qib kanal statistikalarini yig'adi.
  Bot token talab qilinmaydi.

ISHLATISH:
  pip install requests
  python fetch_telegram_stats.py

  → Natija: data/telegram_channels.json
"""

import json
import time
from pathlib import Path

import requests

# ─── Tekshiriladigan kanallar ro'yxati ───────────────────────────
CHANNELS = [
    # Biznes / IT
    {"handle": "webmakon",             "category": "tech",        "name": "Webmakon"},
    {"handle": "asroriskandarovshb",   "category": "business",    "name": "Asror Iskandarov"},
    {"handle": "temurbek_adhamov",     "category": "business",    "name": "Temurbek Adhamov"},
    {"handle": "alisherrustamov",      "category": "business",    "name": "Alisher Rustamov"},
    {"handle": "MFaktorUZ",           "category": "lifestyle",   "name": "M Faktor UZ"},

    # Yangiliklar
    {"handle": "kunuz",               "category": "education",   "name": "Kun.uz"},
    {"handle": "daryo",               "category": "education",   "name": "Daryo.uz"},
    {"handle": "qalampir",            "category": "education",   "name": "Qalampir.uz"},

    # Germaniya
    {"handle": "sardorbek_germany",   "category": "education",   "name": "Sardorbek Germany"},
    {"handle": "Germaniya_visa",      "category": "education",   "name": "Germaniya Viza"},
    {"handle": "articles365",         "category": "education",   "name": "Articles 365"},
    {"handle": "Baxodirjon_Mullajonov", "category": "business",  "name": "Baxodirjon Mullajonov"},

    # Lifestyle
    {"handle": "xushnudbek",          "category": "lifestyle",   "name": "Xushnudbek"},
    {"handle": "shaxzod_blog",        "category": "lifestyle",   "name": "Shaxzod Blog"},
    {"handle": "kanallani_dodasi",    "category": "humor",       "name": "Kanallani Dodasi"},
    {"handle": "uzbek_shou_biznes",   "category": "lifestyle",   "name": "Uzbek Show Biznes"},
    {"handle": "top_faktlar",         "category": "education",   "name": "Top Faktlar"},
    {"handle": "prikollar_olami",     "category": "humor",       "name": "Prikollar Olami"},

    # Ta'lim
    {"handle": "ingliz_tili_uz",      "category": "education",   "name": "Ingliz Tili UZ"},
    {"handle": "goethe_uzbekistan",   "category": "education",   "name": "Goethe Uzbekistan"},
    {"handle": "uzedu",               "category": "education",   "name": "UzEdu"},
    {"handle": "grantlar_uz",         "category": "education",   "name": "Grantlar UZ"},

    # Ayollar / Pazandalik
    {"handle": "pazandachilik",       "category": "lifestyle",   "name": "Pazandachilik"},
    {"handle": "ayollar_sahifasi",    "category": "lifestyle",   "name": "Ayollar Sahifasi"},
    {"handle": "retseptlar_olami",    "category": "lifestyle",   "name": "Retseptlar Olami"},

    # Sport
    {"handle": "tribunauz",           "category": "sport",       "name": "Tribuna.uz"},
    {"handle": "sportuz_official",    "category": "sport",       "name": "Sport.uz"},
    {"handle": "championatasia",      "category": "sport",       "name": "Championat Asia"},

    # Avto
    {"handle": "avtouz_bozor",        "category": "tech",        "name": "Avto.uz Bozor"},
]

# ─── Bozor narx formulasi ────────────────────────────────────────
def calc_price(members: int) -> int:
    """Obunachilarga ko'ra taxminiy 1 post narxi (USD)."""
    if members >= 500_000:  return 400
    if members >= 200_000:  return 150
    if members >= 100_000:  return  80
    if members >= 50_000:   return  45
    if members >= 20_000:   return  25
    return 15


def fetch_via_public_api(channels: list[dict]) -> list[dict]:
    """
    Telegram'ning t.me/channelname sahifasini parse qilish.
    Ba'zi kanallar bloklangan bo'lishi mumkin.
    """
    import re
    results = []

    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; ReklamerData/1.0)",
    }

    for ch in channels:
        handle = ch["handle"]
        url = f"https://t.me/s/{handle}"

        try:
            resp = requests.get(url, headers=headers, timeout=10)
            html = resp.text

            # Subscribers count'ni HTML'dan olish
            match = re.search(r'"members_count"\s*:\s*(\d+)', html)
            if not match:
                # Boshqa pattern
                match = re.search(r"(\d[\d\s]*)\s*(?:subscribers|members|a'zolar)", html)

            members = int(match.group(1).replace(" ", "")) if match else 0

            # Title
            title_match = re.search(r'<meta\s+property="og:title"\s+content="([^"]+)"', html)
            name = title_match.group(1) if title_match else ch["name"]

            # Description
            desc_match = re.search(r'<meta\s+property="og:description"\s+content="([^"]+)"', html)
            bio = desc_match.group(1)[:200] if desc_match else ""

            result = {
                "id":      f"tg-{handle.lower()}",
                "name":    name,
                "handle":  handle,
                "platform": "telegram",
                "category": ch.get("category", "education"),
                "followers": members,
                "rating":   4.7,
                "price":    calc_price(members),
                "isTop":    members > 100_000,
                "location": "Toshkent",
                "verified": False,
                "bio":      bio,
                "engagementRate": None,
                "socialUrl": f"https://t.me/{handle}",
                "imageUrl":  "",
            }
            results.append(result)
            print(f"  ✓ @{handle:30} → {members:>8,} obunachi")
            time.sleep(0.5)

        except Exception as e:
            print(f"  ✗ @{handle}: {e}")

    return results


def main():
    output_dir = Path(__file__).parent / "data"
    output_dir.mkdir(exist_ok=True)

    print("📡 Telegram kanallar statistikasini yuklyapman...\n")
    print("ℹ Public scraping usulidan foydalanilyapman\n")
    results = fetch_via_public_api(CHANNELS)

    if not results:
        print("\n❌ Hech qanday natija yo'q.")
        return

    results.sort(key=lambda x: x["followers"], reverse=True)

    output_path = output_dir / "telegram_channels.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {len(results)} ta kanal saqlandi → {output_path}")
    print("\n📋 Frontendga import qilish uchun:")
    print("   web/domain/influencer/mock.ts fayliga qo'shing yoki")
    print("   API endpoint yaratib qaytaring: GET /api/influencers")


if __name__ == "__main__":
    main()
