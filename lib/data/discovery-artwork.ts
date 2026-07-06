/**
 * Curated Unsplash crops used as mock album/artist artwork in the Discover MVP.
 * Stable IDs — safe for demos without hosting assets locally.
 */
export const DISCOVERY_ARTWORK: Record<string, string> = {
  // Discovery journey tracks
  "dt-01": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80",
  "dt-02": "https://images.unsplash.com/photo-1511379938647-f1fb69468b1d?w=400&h=400&fit=crop&q=80",
  "dt-03": "https://images.unsplash.com/photo-1459749321177-041a43cc4aae?w=400&h=400&fit=crop&q=80",
  "dt-04": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80",
  "dt-05": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop&q=80",
  "dt-06": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80",
  "dt-07": "https://images.unsplash.com/photo-1524368535928-5b11e00bdba9?w=400&h=400&fit=crop&q=80",
  "dt-08": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop&q=80",
  "dt-09": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&q=80",
  "dt-10": "https://images.unsplash.com/photo-1487187223607-47f8ab9431fd?w=400&h=400&fit=crop&q=80",
  "dt-11": "https://images.unsplash.com/photo-1514320291840-7557a9eca2ed?w=400&h=400&fit=crop&q=80",
  "dt-12": "https://images.unsplash.com/photo-1498038432885-c6f89e8eb946?w=400&h=400&fit=crop&q=80",
  "dt-13": "https://images.unsplash.com/photo-1507834702127-4bb94a4d2daa?w=400&h=400&fit=crop&q=80",
  "dt-14": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop&q=80",
  "dt-15": "https://images.unsplash.com/photo-1485579149621-3123dd97980f?w=400&h=400&fit=crop&q=80",
  "dt-16": "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop&q=80",
  "dt-17": "https://images.unsplash.com/photo-1415201364774-f6f0ff35a028?w=400&h=400&fit=crop&q=80",
  "dt-18": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80",
  "dt-19": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop&q=80",
  "dt-20": "https://images.unsplash.com/photo-1511379938647-f1fb69468b1d?w=400&h=400&fit=crop&q=80",

  // Recently played
  "rp-01": "https://images.unsplash.com/photo-1524368535928-5b11e00bdba9?w=400&h=400&fit=crop&q=80",
  "rp-02": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80",
  "rp-03": "https://images.unsplash.com/photo-1459749321177-041a43cc4aae?w=400&h=400&fit=crop&q=80",
  "rp-04": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80",
  "rp-05": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80",

  // Profile — recently discovered artists
  "Ravyn Lenae": "https://images.unsplash.com/photo-1524368535928-5b11e00bdba9?w=400&h=400&fit=crop&q=80",
  "Fousheé": "https://images.unsplash.com/photo-1487187223607-47f8ab9431fd?w=400&h=400&fit=crop&q=80",
};

export function getDiscoveryArtwork(key: string): string | undefined {
  return DISCOVERY_ARTWORK[key];
}
