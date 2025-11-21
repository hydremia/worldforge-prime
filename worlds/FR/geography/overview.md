# worlds/FR/geography/overview.md — Geographic Overview of Faerûn (Prime Canon Layer v1.0)

This document provides a **high-level geographic overview** of Faerûn for Worldforge Prime. It establishes stable, edition-agnostic reference points for campaigns and map logic and acts as the foundation for region manifests in later Cartographer phases.

This is not a full atlas—only the essential structural elements needed for consistent worldbuilding, travel logic, and regional context.

---
## 1. Continental Context
Faerûn is a vast continent with diverse climates, cultures, and magical influences. It spans:
- **Arctic tundra** in the far northwest
- **Temperate coastal and inland regions** along the Sword Coast, Heartlands, Dalelands, and Moonsea
- **Mediterranean-like climates** in Amn, Tethyr, and Calimshan
- **Tropical jungles** in Chult
- **Deserts and ancient empires** in Anauroch and the Old Empires

The continent’s geography is shaped by:
- long-standing magical events
- ancient civilizations and ruins
- planar bleed-through zones
- political borders that shift only gradually in the 1490s DR era

---
## 2. Major Macro-Regions of Faerûn
Prime recognizes the following top-level regions. Detailed manifests will appear in their own files.

### **2.1 The Sword Coast & Western Heartlands**
A coastal and inland stretch known for major cities, trade routes, and adventuring hubs.
Key anchors:
- Waterdeep
- Neverwinter
- Baldur’s Gate
- Candlekeep
- The High Forest

The Coastway and Trade Way define the continent’s north–south travel backbone.

### **2.2 The North & Silver Marches**
Frontier wilderness mixed with fortified cities and dwarven strongholds.
Key anchors:
- Icewind Dale
- Luskan
- Mirabar
- Mithral Hall
- Silverymoon

Harsh climate, wide wildlands, and frequent planar or monstrous incursions.

### **2.3 The Dalelands**
Forest-laced heartlands built around semi-autonomous dales.
Key anchors:
- Shadowdale
- Mistledale
- Archendale
- Cormanthor Forest

A region of ancient elven ruins, deep history, and political nuance.

### **2.4 The Moonsea**
Industrial, harsh, and politically volatile.
Key anchors:
- Zhentil Keep
- Mulmaster
- Hillsfar
- Phlan

Dominated by commerce, tyranny, and old scars from repeated conflicts.

### **2.5 Cormyr & The Heartlands**
Politically stable kingdoms and trade-rich cities.
Key anchors:
- Suzail
- Arabel
- Marsember
- Tilverton ruins

A strong noble culture, martial tradition, and historic continuity.

### **2.6 Amn, Tethyr, and Calimshan**
Southern realms with deep mercantile and ancient influences.
Key anchors:
- Athkatla
- Zazesspur
- Calimport
- The Cloud Peaks

Lush and warm climates, old dynasties, and complex political webs.

### **2.7 Chult**
A tropical peninsula dominated by dense jungle, lost cities, and dinosaurs.
Key anchors:
- Port Nyanzaru
- Mezro (ruined/returned depending on continuity)

A region of exploration, survival, and ancient magic.

### **2.8 Anauroch & The Old Empires**
The vast desert north of Cormyr and fallen/fragmented eastern states.
Key anchors:
- The Great Sand Sea
- Shade ruins
- Chessenta
- Mulhorand

Rich in history, magically altered terrains, and colossal ancient legacies.

### **2.9 Icewind Dale**
Far northern frontier of tundra, mountains, and isolated settlements.
Key anchors:
- Ten-Towns
- Kelvin’s Cairn

Harsh climate and survival-driven culture.

### **2.10 The Underdark**
A multi-layer subterranean world spanning the continent.
Key anchors:
- Menzoberranzan
- Blingdenstone
- Gracklstugh
- Darklake networks

Treated as its own super-region, with manifests divided by layer and domain.

---
## 3. Major Trade & Travel Corridors
For Cartographer Mode and future Worker integration, the following corridors are considered continental arteries:

- **The Coastway / Trade Way** — Baldur’s Gate ↔ Waterdeep ↔ Neverwinter
- **The Long Road** — Waterdeep ↔ Mirabar
- **The Black Road** — Anauroch’s eastern routes
- **The Moonsea Ride** — Hillsfar ↔ Mulmaster
- **The Uldoon Trail** — Amn ↔ Tethyr inland route
- **The Northfurrow Road** — Dalelands interior

These routes form the basis for travel-time calculations and adjacency graphs.

---
## 4. Terrain Bands & Climate Zones
Prime uses simplified climate modeling:
- **Arctic:** Icewind Dale
- **Subarctic:** Northern Sword Coast, The Spine of the World
- **Temperate:** Most central Faerûn
- **Semi-arid:** Anauroch fringes
- **Arid/Desert:** Deep Anauroch, Calim Desert
- **Tropical:** Chult

This breakdown supports structured travel models and biome-linked encounter tables.

---
## 5. Elven, Dwarven & Ancient Sites (Structural Anchors)
These anchor points often influence campaigns regardless of starting region:

### **Elven Sites**
- Myth Drannor (ruins)
- Evereska
- Evermeet (planar remote)
- Cormanthor Forest

### **Dwarven Sites**
- Mithral Hall
- Citadel Adbar
- Citadel Felbarr
- The Great Rift (dwarven subraces)

### **Ancient or Mythic Sites**
- Netheril (ruins/shadow remnants)
- Imaskar (remnants)
- The Old Empires
- Dragon Coast ancient vaults

These are high-value landmarks for campaigns, exploration arcs, and magical archaeology.

---
## 6. Notes for Campaign Integration
When Prime is asked to run or generate content within FR geography:
- Always check Archivist first for campaign-specific modifications.
- If none exist, fall back to this overview.
- If a user introduces new cities, regions, or subregions, Prime treats them as improv until promoted.
- When detailing travel or distances, Prime should:
  - use adjacency and route logic when Cartographer Worker becomes available
  - otherwise keep distances approximate and internally consistent

---
## 7. Next Steps (Suggested Files)
Recommended expansions following this overview:
- `sword_coast.md` — region manifest
- `the_north.md` — region manifest
- `dalelands.md` — region manifest
- `underdark/_index.md` — multi-layer structure

This overview forms the baseline for Faerûn’s macro-geography as used by Worldforge Prime.