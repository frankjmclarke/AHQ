

// Sample usage with your provided text
const mermaidText = `A(!Start Exploration) -->  C{Junction or Door?}
C -->|Junction| I{Roll for Passage Length}
C -->|Door| E{Roll Dice for Room or Passage}
E -->|Evens Passage| P{Roll for Passage Features}
E -->|Odds Room| AE{Roll for Room Type}
I --> M[!Place 1 Section Passage]
I --> N[!Place 2 Sections Passage]
I --> L[!Place 3 Sections Passage]    
P -->|!Wandering Monsters| Q
P -->|!1 Door| R
P -->|!2 Doors| S
P -->|!Nothing| T
Q --> U[GM Rolls on Wandering Monsters Table]
R --> V[Leader Chooses Passage Section for Door]
S --> W[Leader Chooses Sections for 2 Doors]
T --> X{Roll for Passage End}
X -->|!T-Junction| Y
X -->|!Dead End| Z
X -->|!Right Turn| AA
X -->|!Left Turn| AB
X -->|!Stairs Down| AC
X -->|!Stairs Out| AD    
AE -->|Normal| AF
AE -->|Hazard| AG
AE -->|Lair| AH
AE -->|Quest Room| AI
AF --> AJ[!Place Small Room, Empty]
AG --> AK[!GM Consults Hazards Section]
AH --> AL[!Roll on Lairs Matrix, Place Treasure]
AI --> AM[!Roll on Quest Rooms Matrix, Place Treasure]
AJ --> AN{Roll for Room Doors}
AN -->|None| AO
AN -->|!1 Door Room| AP
AN -->|!2 Doors Room| AQ
AO --> AR[!Room Has No Additional Exits]
AP --> AS[!Leader Chooses Wall for Door]
AQ --> AT[!Leader Chooses Walls for 2 Doors]`;

const flowchart = parseMermaidFlowchart(mermaidText, true);
console.log("Flowchart Structure:", flowchart);

// Start traversal (assuming 'A' is the starting point)
traverseFlowchart(flowchart, 'A');
