{

&nbsp;   "$schema": "https://json-schema.org/draft/2020-12/schema",

&nbsp;   "$id": "https://worldforge-prime.dev/schemas/runtime\_capsule.schema.json",

&nbsp;   "title": "Worldforge Prime Runtime Capsule",

&nbsp;   "type": "object",

&nbsp;   "additionalProperties": false,

&nbsp;   "required": \[

&nbsp;       "capsuleId",

&nbsp;       "userId",

&nbsp;       "campaign",

&nbsp;       "preferences",

&nbsp;       "state",

&nbsp;       "runtimeFlags"

&nbsp;   ],

&nbsp;   "properties": {

&nbsp;       "capsuleId": {

&nbsp;           "type": "string",

&nbsp;           "description": "Unique identifier for this capsule (user+campaign tab)."

&nbsp;       },

&nbsp;       "userId": {

&nbsp;           "type": "string",

&nbsp;           "description": "Stable ID for the user this capsule belongs to."

&nbsp;       },

&nbsp;       "campaign": {

&nbsp;           "type": "object",

&nbsp;           "additionalProperties": false,

&nbsp;           "required": \[

&nbsp;               "id",

&nbsp;               "name",

&nbsp;               "system",

&nbsp;               "lastActive",

&nbsp;               "projectType"

&nbsp;           ],

&nbsp;           "properties": {

&nbsp;               "id": {

&nbsp;                   "type": "string",

&nbsp;                   "description": "Stable ID of the campaign or project."

&nbsp;               },

&nbsp;               "name": {

&nbsp;                   "type": "string",

&nbsp;                   "description": "Human-readable campaign or project name."

&nbsp;               },

&nbsp;               "system": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "DND5.5E-2024"

&nbsp;                   ],

&nbsp;                   "description": "Rule system identifier."

&nbsp;               },

&nbsp;               "projectType": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "campaign",

&nbsp;                       "world",

&nbsp;                       "region",

&nbsp;                       "faction",

&nbsp;                       "city",

&nbsp;                       "pantheon",

&nbsp;                       "npc-set",

&nbsp;                       "item-set",

&nbsp;                       "sandbox"

&nbsp;                   ],

&nbsp;                   "description": "High-level type of this tab: play-focused campaign vs creative/worldbuilding project."

&nbsp;               },

&nbsp;               "era": {

&nbsp;                   "type": \[

&nbsp;                       "string",

&nbsp;                       "null"

&nbsp;                   ],

&nbsp;                   "description": "Optional in-world era label for this campaign or project."

&nbsp;               },

&nbsp;               "lastActive": {

&nbsp;                   "type": "string",

&nbsp;                   "format": "date-time",

&nbsp;                   "description": "ISO8601 timestamp of last activity in this capsule."

&nbsp;               }

&nbsp;           }

&nbsp;       },

&nbsp;       "preferences": {

&nbsp;           "type": "object",

&nbsp;           "additionalProperties": false,

&nbsp;           "required": \[

&nbsp;               "tone",

&nbsp;               "density",

&nbsp;               "pacing",

&nbsp;               "cinematic"

&nbsp;           ],

&nbsp;           "properties": {

&nbsp;               "tone": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "heroic",

&nbsp;                       "gritty",

&nbsp;                       "grounded",

&nbsp;                       "mythic",

&nbsp;                       "cozy",

&nbsp;                       "noir",

&nbsp;                       "default"

&nbsp;                   ],

&nbsp;                   "description": "Overall tonal preference for narration."

&nbsp;               },

&nbsp;               "density": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "lean",

&nbsp;                       "balanced",

&nbsp;                       "lush"

&nbsp;                   ],

&nbsp;                   "description": "Narrative density / wordiness preference."

&nbsp;               },

&nbsp;               "pacing": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "fast",

&nbsp;                       "normal",

&nbsp;                       "slow"

&nbsp;                   ],

&nbsp;                   "description": "Preferred narrative pacing."

&nbsp;               },

&nbsp;               "cinematic": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "low",

&nbsp;                       "medium",

&nbsp;                       "high"

&nbsp;                   ],

&nbsp;                   "description": "How cinematic vs. mechanical output should be."

&nbsp;               },

&nbsp;               "narratorVoice": {

&nbsp;                   "type": \[

&nbsp;                       "string",

&nbsp;                       "null"

&nbsp;                   ],

&nbsp;                   "description": "Optional descriptor for narrator voice (e.g., 'mythic gravitas')."

&nbsp;               },

&nbsp;               "dmPersona": {

&nbsp;                   "type": \[

&nbsp;                       "string",

&nbsp;                       "null"

&nbsp;                   ],

&nbsp;                   "description": "Optional descriptor for DM persona (e.g., 'dry wit, low drama')."

&nbsp;               },

&nbsp;               "creativeFocus": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "none",

&nbsp;                       "world",

&nbsp;                       "region",

&nbsp;                       "city",

&nbsp;                       "settlement",

&nbsp;                       "faction",

&nbsp;                       "culture",

&nbsp;                       "pantheon",

&nbsp;                       "npc",

&nbsp;                       "npc-roster",

&nbsp;                       "item",

&nbsp;                       "location",

&nbsp;                       "misc"

&nbsp;                   ],

&nbsp;                   "default": "none",

&nbsp;                   "description": "What type of asset the user is primarily working on right now."

&nbsp;               },

&nbsp;               "creativeDepth": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "broad-strokes",

&nbsp;                       "medium",

&nbsp;                       "deep-dive"

&nbsp;                   ],

&nbsp;                   "default": "medium",

&nbsp;                   "description": "How detailed Creative outputs should be by default."

&nbsp;               },

&nbsp;               "creativeFormat": {

&nbsp;                   "type": "string",

&nbsp;                   "enum": \[

&nbsp;                       "prose",

&nbsp;                       "bullet-outline",

&nbsp;                       "mixed",

&nbsp;                       "schema-oriented"

&nbsp;                   ],

&nbsp;                   "default": "mixed",

&nbsp;                   "description": "Preferred output shape for worldbuilding work."

&nbsp;               }

&nbsp;           }

&nbsp;       },

&nbsp;       "state": {

&nbsp;           "type": "object",

&nbsp;           "additionalProperties": false,

&nbsp;           "required": \[

&nbsp;               "activeScene",

&nbsp;               "pcs",

&nbsp;               "npcs",

&nbsp;               "locationsVisited",

&nbsp;               "questFlags",

&nbsp;               "travel"

&nbsp;           ],

&nbsp;           "properties": {

&nbsp;               "activeScene": {

&nbsp;                   "type": \[

&nbsp;                       "string",

&nbsp;                       "null"

&nbsp;                   ],

&nbsp;                   "enum": \[

&nbsp;                       "exploration",

&nbsp;                       "combat",

&nbsp;                       "social",

&nbsp;                       "downtime",

&nbsp;                       null

&nbsp;                   ],

&nbsp;                   "description": "Current high-level scene mode (for play-oriented tabs)."

&nbsp;               },

&nbsp;               "pcs": {

&nbsp;                   "type": "array",

&nbsp;                   "description": "Array of PC identifiers referenced in this capsule.",

&nbsp;                   "items": {

&nbsp;                       "type": "string"

&nbsp;                   }

&nbsp;               },

&nbsp;               "npcs": {

&nbsp;                   "type": "array",

&nbsp;                   "description": "Array of NPC identifiers relevant to this capsule.",

&nbsp;                   "items": {

&nbsp;                       "type": "string"

&nbsp;                   }

&nbsp;               },

&nbsp;               "locationsVisited": {

&nbsp;                   "type": "array",

&nbsp;                   "description": "IDs of locations the party has visited or that are central to this project.",

&nbsp;                   "items": {

&nbsp;                       "type": "string"

&nbsp;                   }

&nbsp;               },

&nbsp;               "questFlags": {

&nbsp;                   "type": "object",

&nbsp;                   "description": "Loose key-value structure for quest progress flags or project milestones.",

&nbsp;                   "additionalProperties": true

&nbsp;               },

&nbsp;               "travel": {

&nbsp;                   "type": "object",

&nbsp;                   "additionalProperties": false,

&nbsp;                   "required": \[

&nbsp;                       "region",

&nbsp;                       "path",

&nbsp;                       "progress"

&nbsp;                   ],

&nbsp;                   "properties": {

&nbsp;                       "region": {

&nbsp;                           "type": \[

&nbsp;                               "string",

&nbsp;                               "null"

&nbsp;                           ],

&nbsp;                           "description": "Region identifier for current or last-known area (if relevant)."

&nbsp;                       },

&nbsp;                       "path": {

&nbsp;                           "type": \[

&nbsp;                               "string",

&nbsp;                               "null"

&nbsp;                           ],

&nbsp;                           "description": "Optional path/route identifier or description."

&nbsp;                       },

&nbsp;                       "progress": {

&nbsp;                           "type": "number",

&nbsp;                           "minimum": 0,

&nbsp;                           "maximum": 1,

&nbsp;                           "description": "Travel progress as a 0–1 fraction along the current path."

&nbsp;                       }

&nbsp;                   }

&nbsp;               },

&nbsp;               "creativeContext": {

&nbsp;                   "type": "object",

&nbsp;                   "additionalProperties": false,

&nbsp;                   "required": \[],

&nbsp;                   "properties": {

&nbsp;                       "assetType": {

&nbsp;                           "type": \[

&nbsp;                               "string",

&nbsp;                               "null"

&nbsp;                           ],

&nbsp;                           "enum": \[

&nbsp;                               null,

&nbsp;                               "world",

&nbsp;                               "region",

&nbsp;                               "city",

&nbsp;                               "settlement",

&nbsp;                               "faction",

&nbsp;                               "culture",

&nbsp;                               "pantheon",

&nbsp;                               "npc",

&nbsp;                               "npc-roster",

&nbsp;                               "item",

&nbsp;                               "location",

&nbsp;                               "dungeon",

&nbsp;                               "document"

&nbsp;                           ],

&nbsp;                           "description": "Type of the main asset currently in focus, if any."

&nbsp;                       },

&nbsp;                       "assetId": {

&nbsp;                           "type": \[

&nbsp;                               "string",

&nbsp;                               "null"

&nbsp;                           ],

&nbsp;                           "description": "Optional identifier for the asset being iterated (could map to Archivist records)."

&nbsp;                       },

&nbsp;                       "assetLabel": {

&nbsp;                           "type": \[

&nbsp;                               "string",

&nbsp;                               "null"

&nbsp;                           ],

&nbsp;                           "description": "Human-friendly label for the current asset if no stable ID is used."

&nbsp;                       }

&nbsp;                   },

&nbsp;                   "description": "Optional focus area for ongoing worldbuilding or drafting work."

&nbsp;               }

&nbsp;           }

&nbsp;       },

&nbsp;       "runtimeFlags": {

&nbsp;           "type": "object",

&nbsp;           "additionalProperties": false,

&nbsp;           "required": \[

&nbsp;               "awaitingChoice",

&nbsp;               "needsSummary",

&nbsp;               "toneShift"

&nbsp;           ],

&nbsp;           "properties": {

&nbsp;               "awaitingChoice": {

&nbsp;                   "type": "boolean",

&nbsp;                   "description": "True when Prime is explicitly waiting for a player choice."

&nbsp;               },

&nbsp;               "needsSummary": {

&nbsp;                   "type": "boolean",

&nbsp;                   "description": "True when a high-level recap would be useful next response."

&nbsp;               },

&nbsp;               "toneShift": {

&nbsp;                   "type": "boolean",

&nbsp;                   "description": "True when recent events suggest tone should adjust (lighter/darker)."

&nbsp;               }

&nbsp;           }

&nbsp;       }

&nbsp;   }

}













{

&nbsp; "$id": "https://worldforge/schemas/capsule\_campaign\_v1.schema.json",

&nbsp; "$schema": "https://json-schema.org/draft/2020-12/schema",

&nbsp; "title": "Campaign Capsule v1",

&nbsp; "type": "object",

&nbsp; "required": \[

&nbsp;   "capsule\_id",

&nbsp;   "capsule\_type",

&nbsp;   "status",

&nbsp;   "owner\_user\_id",

&nbsp;   "meta",

&nbsp;   "preferences",

&nbsp;   "players",

&nbsp;   "pcs",

&nbsp;   "npcs",

&nbsp;   "scenes",

&nbsp;   "state",

&nbsp;   "lineage"

&nbsp; ],

&nbsp; "properties": {

&nbsp;   "capsule\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Unique ID for this campaign capsule."

&nbsp;   },

&nbsp;   "capsule\_type": {

&nbsp;     "type": "string",

&nbsp;     "const": "campaign"

&nbsp;   },

&nbsp;   "status": {

&nbsp;     "type": "string",

&nbsp;     "enum": \["temp", "draft", "promoted"],

&nbsp;     "description": "Lifecycle state for cleanup and promotion logic."

&nbsp;   },

&nbsp;   "owner\_user\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Primary account/user that owns this campaign."

&nbsp;   },

&nbsp;   "created\_at": {

&nbsp;     "type": "string",

&nbsp;     "format": "date-time"

&nbsp;   },

&nbsp;   "updated\_at": {

&nbsp;     "type": "string",

&nbsp;     "format": "date-time"

&nbsp;   },



&nbsp;   "meta": {

&nbsp;     "type": "object",

&nbsp;     "required": \["campaign\_name", "ruleset"],

&nbsp;     "properties": {

&nbsp;       "campaign\_name": { "type": "string" },

&nbsp;       "ruleset": { "type": "string", "examples": \["5.5e"] },

&nbsp;       "world\_key": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional world/setting identifier."

&nbsp;       },

&nbsp;       "description": { "type": \["string", "null"] },

&nbsp;       "tags": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "preferences": {

&nbsp;     "type": "object",

&nbsp;     "description": "Narrative/voice/rules preferences scoped to this campaign.",

&nbsp;     "properties": {

&nbsp;       "tone\_profile": {

&nbsp;         "type": "string",

&nbsp;         "description": "Named tone profile, e.g. 'Low-Fantasy Gritty'."

&nbsp;       },

&nbsp;       "narrative\_density": {

&nbsp;         "type": "string",

&nbsp;         "enum": \["sparse", "moderate", "lush", "maximalist"]

&nbsp;       },

&nbsp;       "voice\_style": {

&nbsp;         "type": "string",

&nbsp;         "description": "High-level description of narration style."

&nbsp;       },

&nbsp;       "rules\_strictness": {

&nbsp;         "type": "string",

&nbsp;         "enum": \["raw\_strict", "raw\_hybrid", "cinematic", "osr\_lean"]

&nbsp;       },

&nbsp;       "safety\_profile\_id": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Reference to a safety/boundaries profile."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "players": {

&nbsp;     "type": "array",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["player\_id"],

&nbsp;       "properties": {

&nbsp;         "player\_id": { "type": "string" },

&nbsp;         "display\_name": { "type": \["string", "null"] },

&nbsp;         "pc\_ids": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "pcs": {

&nbsp;     "type": "array",

&nbsp;     "description": "List of character\_ids for PCs associated with this campaign.",

&nbsp;     "items": { "type": "string" }

&nbsp;   },



&nbsp;   "npcs": {

&nbsp;     "type": "array",

&nbsp;     "description": "List of character\_ids for important NPCs.",

&nbsp;     "items": { "type": "string" }

&nbsp;   },



&nbsp;   "factions": {

&nbsp;     "type": "array",

&nbsp;     "description": "List of faction IDs relevant to this campaign.",

&nbsp;     "items": { "type": "string" }

&nbsp;   },



&nbsp;   "scenes": {

&nbsp;     "type": "object",

&nbsp;     "required": \["last\_scene\_id", "scene\_history"],

&nbsp;     "properties": {

&nbsp;       "last\_scene\_id": { "type": \["string", "null"] },

&nbsp;       "open\_scenes": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "scene\_history": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "state": {

&nbsp;     "type": "object",

&nbsp;     "description": "High-level in-world state markers.",

&nbsp;     "properties": {

&nbsp;       "current\_date": { "type": \["string", "null"] },

&nbsp;       "current\_region\_id": { "type": \["string", "null"] },

&nbsp;       "current\_location\_id": { "type": \["string", "null"] },

&nbsp;       "active\_quests": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "flags": {

&nbsp;         "type": "object",

&nbsp;         "additionalProperties": { "type": "boolean" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "lineage": {

&nbsp;     "type": "object",

&nbsp;     "description": "Promotion and history metadata.",

&nbsp;     "properties": {

&nbsp;       "promoted\_from": { "type": \["string", "null"] },

&nbsp;       "promotion\_status": {

&nbsp;         "type": "string",

&nbsp;         "enum": \["temp", "draft", "promoted"]

&nbsp;       },

&nbsp;       "promotion\_log": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "properties": {

&nbsp;             "timestamp": { "type": "string", "format": "date-time" },

&nbsp;             "reason": { "type": "string" }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "storage": {

&nbsp;     "type": "object",

&nbsp;     "description": "Optional convenience references to KV keys.",

&nbsp;     "properties": {

&nbsp;       "pc\_keys": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "npc\_keys": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   }

&nbsp; },

&nbsp; "additionalProperties": false

}

















{

&nbsp; "$id": "https://worldforge/schemas/character\_v1.schema.json",

&nbsp; "$schema": "https://json-schema.org/draft/2020-12/schema",

&nbsp; "title": "Character v1 (PC \& NPC)",

&nbsp; "type": "object",

&nbsp; "required": \["character\_id", "role", "identity", "rules\_profile", "abilities", "derived"],

&nbsp; "properties": {

&nbsp;   "character\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Unique ID for this character."

&nbsp;   },

&nbsp;   "role": {

&nbsp;     "type": "string",

&nbsp;     "enum": \["pc", "npc"]

&nbsp;   },

&nbsp;   "npc\_detail\_level": {

&nbsp;     "type": \["string", "null"],

&nbsp;     "enum": \["compact", "full", null],

&nbsp;     "description": "For NPCs: 'compact' or 'full'; null or omitted for PCs."

&nbsp;   },



&nbsp;   "identity": {

&nbsp;     "type": "object",

&nbsp;     "required": \["name", "level"],

&nbsp;     "properties": {

&nbsp;       "name": { "type": "string" },

&nbsp;       "species": { "type": \["string", "null"] },

&nbsp;       "class": { "type": \["string", "null"] },

&nbsp;       "subclass": { "type": \["string", "null"] },

&nbsp;       "level": { "type": "integer", "minimum": 1 },

&nbsp;       "background": { "type": \["string", "null"] },

&nbsp;       "pronouns": { "type": \["string", "null"] },

&nbsp;       "alignment": { "type": \["string", "null"] }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "rules\_profile": {

&nbsp;     "type": "object",

&nbsp;     "required": \["ruleset"],

&nbsp;     "properties": {

&nbsp;       "ruleset": { "type": "string", "examples": \["5.5e"] },

&nbsp;       "advancement\_type": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "enum": \["milestone", "xp", null]

&nbsp;       },

&nbsp;       "xp": { "type": \["integer", "null"] }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "abilities": {

&nbsp;     "type": "object",

&nbsp;     "required": \["str", "dex", "con", "int", "wis", "cha"],

&nbsp;     "properties": {

&nbsp;       "str": { "type": "integer" },

&nbsp;       "dex": { "type": "integer" },

&nbsp;       "con": { "type": "integer" },

&nbsp;       "int": { "type": "integer" },

&nbsp;       "wis": { "type": "integer" },

&nbsp;       "cha": { "type": "integer" }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "derived": {

&nbsp;     "type": "object",

&nbsp;     "required": \["proficiency\_bonus", "max\_hp", "current\_hp", "ac", "speed"],

&nbsp;     "properties": {

&nbsp;       "proficiency\_bonus": { "type": "integer" },

&nbsp;       "max\_hp": { "type": "integer" },

&nbsp;       "current\_hp": { "type": "integer" },

&nbsp;       "temporary\_hp": { "type": \["integer", "null"] },

&nbsp;       "ac": { "type": "integer" },

&nbsp;       "speed": { "type": "integer" },

&nbsp;       "initiative\_mod": { "type": \["integer", "null"] },

&nbsp;       "hit\_dice": { "type": \["string", "null"] }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "skills": {

&nbsp;     "type": "object",

&nbsp;     "description": "Map of skill name → { mod, proficient, expertise }.",

&nbsp;     "additionalProperties": {

&nbsp;       "type": "object",

&nbsp;       "properties": {

&nbsp;         "mod": { "type": "integer" },

&nbsp;         "proficient": { "type": "boolean" },

&nbsp;         "expertise": { "type": \["boolean", "null"] }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "saving\_throws": {

&nbsp;     "type": "object",

&nbsp;     "description": "Per-ability saving throw profile.",

&nbsp;     "additionalProperties": {

&nbsp;       "type": "object",

&nbsp;       "properties": {

&nbsp;         "mod": { "type": "integer" },

&nbsp;         "proficient": { "type": "boolean" }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "features": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "class\_features": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["id", "name"],

&nbsp;           "properties": {

&nbsp;             "id": { "type": "string" },

&nbsp;             "name": { "type": "string" },

&nbsp;             "uses": { "type": \["integer", "null"] },

&nbsp;             "recharge": { "type": \["string", "null"] },

&nbsp;             "notes": { "type": \["string", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "racial\_features": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "object" }

&nbsp;       },

&nbsp;       "background\_features": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "object" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "resources": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "spell\_slots": {

&nbsp;         "type": "object",

&nbsp;         "additionalProperties": {

&nbsp;           "type": "object",

&nbsp;           "properties": {

&nbsp;             "max": { "type": "integer" },

&nbsp;             "current": { "type": "integer" }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "class\_pools": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["name", "max", "current"],

&nbsp;           "properties": {

&nbsp;             "name": { "type": "string" },

&nbsp;             "max": { "type": "integer" },

&nbsp;             "current": { "type": "integer" },

&nbsp;             "recharge": { "type": \["string", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "spells": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "spellcasting\_ability": { "type": \["string", "null"] },

&nbsp;       "save\_dc": { "type": \["integer", "null"] },

&nbsp;       "attack\_bonus": { "type": \["integer", "null"] },

&nbsp;       "known\_spells": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["name", "level"],

&nbsp;           "properties": {

&nbsp;             "name": { "type": "string" },

&nbsp;             "level": { "type": "integer" }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "equipment": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "weapons": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "properties": {

&nbsp;             "name": { "type": "string" },

&nbsp;             "attack\_bonus": { "type": \["integer", "null"] },

&nbsp;             "damage": { "type": \["string", "null"] },

&nbsp;             "properties": {

&nbsp;               "type": "array",

&nbsp;               "items": { "type": "string" }

&nbsp;             }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "armor": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "properties": {

&nbsp;             "name": { "type": "string" },

&nbsp;             "base\_ac": { "type": \["integer", "null"] },

&nbsp;             "calculated\_ac": { "type": \["integer", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "inventory": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["name"],

&nbsp;           "properties": {

&nbsp;             "name": { "type": "string" },

&nbsp;             "qty": { "type": \["number", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "coins": {

&nbsp;         "type": "object",

&nbsp;         "properties": {

&nbsp;           "pp": { "type": \["integer", "null"] },

&nbsp;           "gp": { "type": \["integer", "null"] },

&nbsp;           "sp": { "type": \["integer", "null"] },

&nbsp;           "cp": { "type": \["integer", "null"] }

&nbsp;         },

&nbsp;         "additionalProperties": false

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "conditions": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "exhaustion": { "type": \["integer", "null"] },

&nbsp;       "active\_conditions": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "story": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "short\_bio": { "type": \["string", "null"] },

&nbsp;       "goals": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "bonds": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "flaws": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "ideals": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "lineage": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "tier": { "type": \["integer", "null"] },

&nbsp;       "created\_in\_campaign": { "type": \["string", "null"] },

&nbsp;       "created\_at": { "type": \["string", "null"], "format": "date-time" },

&nbsp;       "updated\_at": { "type": \["string", "null"], "format": "date-time" }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   }

&nbsp; },

&nbsp; "additionalProperties": false

}












{

&nbsp; "$id": "https://worldforge/schemas/region\_v1.schema.json",

&nbsp; "$schema": "https://json-schema.org/draft/2020-12/schema",

&nbsp; "title": "Region v1",

&nbsp; "type": "object",

&nbsp; "required": \[

&nbsp;   "region\_id",

&nbsp;   "name",

&nbsp;   "kind",

&nbsp;   "parent\_region\_id",

&nbsp;   "biomes",

&nbsp;   "climate",

&nbsp;   "meta"

&nbsp; ],

&nbsp; "properties": {

&nbsp;   "region\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Unique ID for this region."

&nbsp;   },



&nbsp;   "name": {

&nbsp;     "type": "string",

&nbsp;     "description": "Region name."

&nbsp;   },



&nbsp;   "kind": {

&nbsp;     "type": "string",

&nbsp;     "description": "Scale/type of this region.",

&nbsp;     "enum": \[

&nbsp;       "continent",

&nbsp;       "macroregion",

&nbsp;       "region",

&nbsp;       "province",

&nbsp;       "domain",

&nbsp;       "territory",

&nbsp;       "wilds",

&nbsp;       "other"

&nbsp;     ]

&nbsp;   },



&nbsp;   "parent\_region\_id": {

&nbsp;     "type": \["string", "null"],

&nbsp;     "description": "Optional parent region (e.g., province inside a macroregion)."

&nbsp;   },



&nbsp;   "cartography": {

&nbsp;     "type": "object",

&nbsp;     "description": "Spatial data for this region.",

&nbsp;     "properties": {

&nbsp;       "bounds": {

&nbsp;         "type": "object",

&nbsp;         "description": "Optional bounding box or polygon reference.",

&nbsp;         "properties": {

&nbsp;           "min\_x": { "type": \["number", "null"] },

&nbsp;           "min\_y": { "type": \["number", "null"] },

&nbsp;           "max\_x": { "type": \["number", "null"] },

&nbsp;           "max\_y": { "type": \["number", "null"] }

&nbsp;         },

&nbsp;         "additionalProperties": false

&nbsp;       },

&nbsp;       "center": {

&nbsp;         "type": "object",

&nbsp;         "properties": {

&nbsp;           "x": { "type": \["number", "null"] },

&nbsp;           "y": { "type": \["number", "null"] }

&nbsp;         },

&nbsp;         "additionalProperties": false

&nbsp;       },

&nbsp;       "map\_layer\_key": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional reference to an external map layer or tile key."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "biomes": {

&nbsp;     "type": "array",

&nbsp;     "description": "List of biome types present in this region.",

&nbsp;     "items": { "type": "string" }

&nbsp;   },



&nbsp;   "climate": {

&nbsp;     "type": "object",

&nbsp;     "required": \["summary"],

&nbsp;     "properties": {

&nbsp;       "summary": {

&nbsp;         "type": "string",

&nbsp;         "description": "Short climate description (e.g., temperate coastal, arid plateau)."

&nbsp;       },

&nbsp;       "temperature\_band": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "e.g., cold, cool, temperate, warm, hot."

&nbsp;       },

&nbsp;       "precipitation\_pattern": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "e.g., dry, seasonal rains, heavy rainfall, monsoon."

&nbsp;       },

&nbsp;       "seasonal\_notes": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Any notable seasonal extremes or patterns."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "terrain": {

&nbsp;     "type": "object",

&nbsp;     "description": "Topographical summary.",

&nbsp;     "properties": {

&nbsp;       "major\_landforms": {

&nbsp;         "type": "array",

&nbsp;         "description": "Mountains, plains, plateaus, canyons, etc.",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "water\_features": {

&nbsp;         "type": "array",

&nbsp;         "description": "Rivers, lakes, seas, deltas, etc.",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "natural\_landmarks": {

&nbsp;         "type": "array",

&nbsp;         "description": "Named features; cross-link to locations where possible.",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "adjacency": {

&nbsp;     "type": "object",

&nbsp;     "description": "Region adjacency and connectivity.",

&nbsp;     "properties": {

&nbsp;       "adjacent\_region\_ids": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "primary\_routes": {

&nbsp;         "type": "array",

&nbsp;         "description": "High-level routes in/out of the region.",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["label"],

&nbsp;           "properties": {

&nbsp;             "label": { "type": "string" },

&nbsp;             "from\_region\_id": { "type": \["string", "null"] },

&nbsp;             "to\_region\_id": { "type": \["string", "null"] },

&nbsp;             "notes": { "type": \["string", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "settlements": {

&nbsp;     "type": "array",

&nbsp;     "description": "Settlements contained within this region.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["settlement\_id"],

&nbsp;       "properties": {

&nbsp;         "settlement\_id": { "type": "string" },

&nbsp;         "role": {

&nbsp;           "type": \["string", "null"],

&nbsp;           "description": "e.g., capital, trade hub, holy site, border town."

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "faction\_influence": {

&nbsp;     "type": "array",

&nbsp;     "description": "Factions significantly active in this region.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["faction\_id"],

&nbsp;       "properties": {

&nbsp;         "faction\_id": { "type": "string" },

&nbsp;         "influence\_level": {

&nbsp;           "type": \["string", "null"],

&nbsp;           "description": "e.g., minor, moderate, dominant, contested."

&nbsp;         },

&nbsp;         "notes": { "type": \["string", "null"] }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "hazards": {

&nbsp;     "type": "object",

&nbsp;     "description": "Environmental and systemic hazards relevant to travel \& play.",

&nbsp;     "properties": {

&nbsp;       "environmental\_hazards": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "political\_hazards": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "supernatural\_hazards": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "hooks": {

&nbsp;     "type": "array",

&nbsp;     "description": "Region-level rumors, tensions, and plot hooks.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["text"],

&nbsp;       "properties": {

&nbsp;         "text": { "type": "string" },

&nbsp;         "tags": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         },

&nbsp;         "related\_factions": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         },

&nbsp;         "related\_locations": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "description": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "summary": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Short, table-friendly overview of the region."

&nbsp;       },

&nbsp;       "detail": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Long-form description and lore."

&nbsp;       },

&nbsp;       "travel\_impressions": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "What it feels like to travel through this region."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "meta": {

&nbsp;     "type": "object",

&nbsp;     "required": \["tier", "readiness"],

&nbsp;     "properties": {

&nbsp;       "tier": {

&nbsp;         "type": "integer",

&nbsp;         "description": "1=user/campaign canon, 2=world canon, 3=improv/draft."

&nbsp;       },

&nbsp;       "readiness": {

&nbsp;         "type": "string",

&nbsp;         "enum": \["draft", "refined", "final"]

&nbsp;       },

&nbsp;       "created\_at": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "format": "date-time"

&nbsp;       },

&nbsp;       "updated\_at": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "format": "date-time"

&nbsp;       },

&nbsp;       "created\_in\_campaign": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "If this region originated from campaign improv."

&nbsp;       },

&nbsp;       "style\_profile": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional style/aesthetic label for generation."

&nbsp;       },

&nbsp;       "tags": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   }

&nbsp; },

&nbsp; "additionalProperties": false

}







{

&nbsp; "$id": "https://worldforge/schemas/location\_v1.schema.json",

&nbsp; "$schema": "https://json-schema.org/draft/2020-12/schema",

&nbsp; "title": "Location v1",

&nbsp; "type": "object",

&nbsp; "required": \[

&nbsp;   "location\_id",

&nbsp;   "name",

&nbsp;   "category",

&nbsp;   "region\_id",

&nbsp;   "meta"

&nbsp; ],

&nbsp; "properties": {

&nbsp;   "location\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Unique ID for this specific location/point of interest."

&nbsp;   },



&nbsp;   "name": {

&nbsp;     "type": "string",

&nbsp;     "description": "Location name."

&nbsp;   },



&nbsp;   "category": {

&nbsp;     "type": "string",

&nbsp;     "description": "General type of location.",

&nbsp;     "enum": \[

&nbsp;       "tavern",

&nbsp;       "inn",

&nbsp;       "shop",

&nbsp;       "temple",

&nbsp;       "shrine",

&nbsp;       "market\_stall",

&nbsp;       "guard\_post",

&nbsp;       "gate",

&nbsp;       "bridge",

&nbsp;       "plaza",

&nbsp;       "alley",

&nbsp;       "house",

&nbsp;       "manor",

&nbsp;       "farm",

&nbsp;       "camp",

&nbsp;       "cave",

&nbsp;       "ruin",

&nbsp;       "dungeon\_entry",

&nbsp;       "natural\_feature",

&nbsp;       "landmark",

&nbsp;       "other"

&nbsp;     ]

&nbsp;   },



&nbsp;   "region\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Region the location resides in."

&nbsp;   },



&nbsp;   "settlement\_id": {

&nbsp;     "type": \["string", "null"],

&nbsp;     "description": "Settlement this location belongs to, if any."

&nbsp;   },



&nbsp;   "coordinates": {

&nbsp;     "type": "object",

&nbsp;     "description": "Optional map coordinates for Cartographer.",

&nbsp;     "properties": {

&nbsp;       "x": { "type": "number" },

&nbsp;       "y": { "type": "number" },

&nbsp;       "z": { "type": \["number", "null"] }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "environment": {

&nbsp;     "type": "object",

&nbsp;     "description": "Environmental/context tags for this location.",

&nbsp;     "properties": {

&nbsp;       "terrain\_context": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "E.g., street-level, rooftop, underground, cliffside, forest clearing, etc."

&nbsp;       },

&nbsp;       "light\_level": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "E.g., bright, dim, dark, variable."

&nbsp;       },

&nbsp;       "noise\_level": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "E.g., quiet, busy, chaotic."

&nbsp;       },

&nbsp;       "safety\_level": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "E.g., safe, tense, dangerous, lawless."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "owners\_and\_staff": {

&nbsp;     "type": "array",

&nbsp;     "description": "Important NPCs who own or work here.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["character\_id"],

&nbsp;       "properties": {

&nbsp;         "character\_id": { "type": "string" },

&nbsp;         "role": { "type": \["string", "null"] }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "factions\_present": {

&nbsp;     "type": "array",

&nbsp;     "description": "Factions with a notable presence or stake here.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["faction\_id"],

&nbsp;       "properties": {

&nbsp;         "faction\_id": { "type": "string" },

&nbsp;         "influence\_type": {

&nbsp;           "type": \["string", "null"],

&nbsp;           "description": "e.g., owner, protector, extortion, covert cell."

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "usage": {

&nbsp;     "type": "object",

&nbsp;     "description": "How the location is typically used.",

&nbsp;     "properties": {

&nbsp;       "primary\_function": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "e.g., lodging, worship, trade, meeting place, hideout."

&nbsp;       },

&nbsp;       "secondary\_functions": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "access\_level": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "e.g., public, restricted, secret, invitation\_only."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "features": {

&nbsp;     "type": "object",

&nbsp;     "description": "Physical or magical traits that matter in play.",

&nbsp;     "properties": {

&nbsp;       "notable\_features": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "hazards": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "hidden\_elements": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "hooks": {

&nbsp;     "type": "array",

&nbsp;     "description": "Rumors, secrets, or situations tied to this location.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["text"],

&nbsp;       "properties": {

&nbsp;         "text": { "type": "string" },

&nbsp;         "tags": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         },

&nbsp;         "related\_factions": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         },

&nbsp;         "related\_npcs": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "description": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "summary": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Short, table-usage description."

&nbsp;       },

&nbsp;       "detail": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Long-form descriptive text and lore."

&nbsp;       },

&nbsp;       "sensory\_notes": {

&nbsp;         "type": "object",

&nbsp;         "description": "Quick hooks for narration.",

&nbsp;         "properties": {

&nbsp;           "sight": { "type": \["string", "null"] },

&nbsp;           "sound": { "type": \["string", "null"] },

&nbsp;           "smell": { "type": \["string", "null"] },

&nbsp;           "touch": { "type": \["string", "null"] },

&nbsp;           "taste": { "type": \["string", "null"] }

&nbsp;         },

&nbsp;         "additionalProperties": false

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "meta": {

&nbsp;     "type": "object",

&nbsp;     "required": \["tier", "readiness"],

&nbsp;     "properties": {

&nbsp;       "tier": {

&nbsp;         "type": "integer",

&nbsp;         "description": "1=user/campaign canon, 2=world canon, 3=improv/draft."

&nbsp;       },

&nbsp;       "readiness": {

&nbsp;         "type": "string",

&nbsp;         "enum": \["draft", "refined", "final"]

&nbsp;       },

&nbsp;       "created\_at": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "format": "date-time"

&nbsp;       },

&nbsp;       "updated\_at": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "format": "date-time"

&nbsp;       },

&nbsp;       "created\_in\_campaign": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "If generated inside a specific campaign capsule."

&nbsp;       },

&nbsp;       "style\_profile": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional style/aesthetic label used for prompts."

&nbsp;       },

&nbsp;       "tags": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   }

&nbsp; },

&nbsp; "additionalProperties": false

}






{

&nbsp; "$id": "https://worldforge/schemas/settlement\_v1.schema.json",

&nbsp; "$schema": "https://json-schema.org/draft/2020-12/schema",

&nbsp; "title": "Settlement v1",

&nbsp; "type": "object",

&nbsp; "required": \[

&nbsp;   "settlement\_id",

&nbsp;   "name",

&nbsp;   "kind",

&nbsp;   "region\_id",

&nbsp;   "population",

&nbsp;   "demographics",

&nbsp;   "government",

&nbsp;   "points\_of\_interest",

&nbsp;   "meta"

&nbsp; ],

&nbsp; "properties": {

&nbsp;   "settlement\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Unique ID for this settlement."

&nbsp;   },



&nbsp;   "name": {

&nbsp;     "type": "string",

&nbsp;     "description": "Settlement name."

&nbsp;   },



&nbsp;   "kind": {

&nbsp;     "type": "string",

&nbsp;     "description": "Classification of settlement size/type.",

&nbsp;     "enum": \[

&nbsp;       "hamlet",

&nbsp;       "village",

&nbsp;       "town",

&nbsp;       "city",

&nbsp;       "metropolis",

&nbsp;       "fortress",

&nbsp;       "outpost",

&nbsp;       "encampment",

&nbsp;       "other"

&nbsp;     ]

&nbsp;   },



&nbsp;   "region\_id": {

&nbsp;     "type": "string",

&nbsp;     "description": "Region or province this settlement belongs to."

&nbsp;   },



&nbsp;   "parent\_settlement\_id": {

&nbsp;     "type": \["string", "null"],

&nbsp;     "description": "Optional parent (e.g., district group hub or capital)."

&nbsp;   },



&nbsp;   "coordinates": {

&nbsp;     "type": "object",

&nbsp;     "description": "Optional map coordinates for Cartographer.",

&nbsp;     "properties": {

&nbsp;       "x": { "type": "number" },

&nbsp;       "y": { "type": "number" },

&nbsp;       "z": { "type": \["number", "null"] }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "population": {

&nbsp;     "type": "object",

&nbsp;     "required": \["estimate"],

&nbsp;     "properties": {

&nbsp;       "estimate": {

&nbsp;         "type": "integer",

&nbsp;         "minimum": 0,

&nbsp;         "description": "Rough population estimate."

&nbsp;       },

&nbsp;       "notes": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional extra detail about population variability."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "demographics": {

&nbsp;     "type": "object",

&nbsp;     "description": "Species and culture composition.",

&nbsp;     "properties": {

&nbsp;       "species\_breakdown": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["label", "percent"],

&nbsp;           "properties": {

&nbsp;             "label": { "type": "string" },

&nbsp;             "percent": { "type": "number" }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "cultural\_groups": {

&nbsp;         "type": "array",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["label"],

&nbsp;           "properties": {

&nbsp;             "label": { "type": "string" },

&nbsp;             "notes": { "type": \["string", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "government": {

&nbsp;     "type": "object",

&nbsp;     "required": \["type"],

&nbsp;     "properties": {

&nbsp;       "type": {

&nbsp;         "type": "string",

&nbsp;         "description": "E.g., council, monarchy, theocracy, guild rule, etc."

&nbsp;       },

&nbsp;       "ruling\_body\_name": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Name of the council/house/order/etc."

&nbsp;       },

&nbsp;       "key\_officials": {

&nbsp;         "type": "array",

&nbsp;         "description": "Important NPCs by ID.",

&nbsp;         "items": {

&nbsp;           "type": "object",

&nbsp;           "required": \["character\_id"],

&nbsp;           "properties": {

&nbsp;             "character\_id": { "type": "string" },

&nbsp;             "role\_title": { "type": \["string", "null"] }

&nbsp;           },

&nbsp;           "additionalProperties": false

&nbsp;         }

&nbsp;       },

&nbsp;       "stability": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional loose indicator: stable, tense, collapsing, occupied, etc."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "economy": {

&nbsp;     "type": "object",

&nbsp;     "description": "Basic economic profile.",

&nbsp;     "properties": {

&nbsp;       "primary\_industries": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "notable\_exports": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "notable\_imports": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "wealth\_level": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Relative wealth: poor, modest, prosperous, rich, etc."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "factions\_present": {

&nbsp;     "type": "array",

&nbsp;     "description": "Factions with notable presence here.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["faction\_id"],

&nbsp;       "properties": {

&nbsp;         "faction\_id": { "type": "string" },

&nbsp;         "influence\_level": {

&nbsp;           "type": \["string", "null"],

&nbsp;           "description": "e.g., minor, moderate, dominant, covert."

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "districts": {

&nbsp;     "type": "array",

&nbsp;     "description": "Named districts/quarters/wards.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["district\_id", "name"],

&nbsp;       "properties": {

&nbsp;         "district\_id": { "type": "string" },

&nbsp;         "name": { "type": "string" },

&nbsp;         "role": {

&nbsp;           "type": \["string", "null"],

&nbsp;           "description": "E.g., market, temple ward, docks, noble quarter."

&nbsp;         },

&nbsp;         "notes": { "type": \["string", "null"] }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "points\_of\_interest": {

&nbsp;     "type": "array",

&nbsp;     "description": "Key locations inside or immediately around the settlement.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["location\_id"],

&nbsp;       "properties": {

&nbsp;         "location\_id": { "type": "string" },

&nbsp;         "label": { "type": \["string", "null"] }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "features": {

&nbsp;     "type": "object",

&nbsp;     "description": "Environmental or structural traits.",

&nbsp;     "properties": {

&nbsp;       "terrain\_context": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "E.g., coastal, river junction, cliffside, desert oasis."

&nbsp;       },

&nbsp;       "defenses": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       },

&nbsp;       "notable\_features": {

&nbsp;         "type": "array",

&nbsp;         "items": { "type": "string" }

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "hooks": {

&nbsp;     "type": "array",

&nbsp;     "description": "Rumors, tensions, and hooks rooted in this settlement.",

&nbsp;     "items": {

&nbsp;       "type": "object",

&nbsp;       "required": \["text"],

&nbsp;       "properties": {

&nbsp;         "text": { "type": "string" },

&nbsp;         "tags": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         },

&nbsp;         "related\_factions": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         },

&nbsp;         "related\_npcs": {

&nbsp;           "type": "array",

&nbsp;           "items": { "type": "string" }

&nbsp;         }

&nbsp;       },

&nbsp;       "additionalProperties": false

&nbsp;     }

&nbsp;   },



&nbsp;   "description": {

&nbsp;     "type": "object",

&nbsp;     "properties": {

&nbsp;       "summary": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Short 1–3 sentence summary."

&nbsp;       },

&nbsp;       "detail": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Long-form descriptive text."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   },



&nbsp;   "meta": {

&nbsp;     "type": "object",

&nbsp;     "required": \["tier", "readiness"],

&nbsp;     "properties": {

&nbsp;       "tier": {

&nbsp;         "type": "integer",

&nbsp;         "description": "1=user/campaign canon, 2=world canon, 3=improv/draft."

&nbsp;       },

&nbsp;       "readiness": {

&nbsp;         "type": "string",

&nbsp;         "enum": \["draft", "refined", "final"]

&nbsp;       },

&nbsp;       "style\_profile": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "Optional style/aesthetic label used when generating text for this settlement."

&nbsp;       },

&nbsp;       "created\_at": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "format": "date-time"

&nbsp;       },

&nbsp;       "updated\_at": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "format": "date-time"

&nbsp;       },

&nbsp;       "created\_in\_campaign": {

&nbsp;         "type": \["string", "null"],

&nbsp;         "description": "If this settlement originated from campaign-level improv."

&nbsp;       }

&nbsp;     },

&nbsp;     "additionalProperties": false

&nbsp;   }

&nbsp; },

&nbsp; "additionalProperties": false

}




















