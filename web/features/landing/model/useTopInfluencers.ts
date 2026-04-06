"use client";

import { useEffect, useState } from "react";
import { getTopInfluencers } from "@/domain/influencer/selectors";
import type { Influencer } from "@/domain/influencer/types";
import { fetchTopInfluencers } from "@/features/catalog/api/catalog";

export function useTopInfluencers(limit: number): Influencer[] {
  const [influencers, setInfluencers] = useState<Influencer[]>(() => getTopInfluencers(limit));

  useEffect(() => {
    let isActive = true;

    void fetchTopInfluencers(limit).then((items) => {
      if (isActive) {
        setInfluencers(items);
      }
    });

    return () => {
      isActive = false;
    };
  }, [limit]);

  return influencers;
}
