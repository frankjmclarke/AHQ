const mermaidText = `A(!Start Exploration) -->  C{Junction or Door?}
C -->|Junction| I{Roll for Passage Length}
C -->|Door| E{Roll Dice for Room or Passage}
E -->|Evens Passage| P{Roll for Passage Features}
E -->|Odds Room| AE{Roll for Room Type}
I --> M[!Place 1 Section Passage]
I --> N[!Place 2 Sections Passage]
I --> L[!Place 3 Sections Passage]
P --> Q[!Wandering Monsters]
P --> R[!1 Door]
P --> S[!2 Doors]
P --> T[!Nothing]
T --> X{Roll for Passage End}
X --> Y[!T-Junction]
X --> Z[!Dead End]
X --> AA[!Right Turn]    
X --> AB[!Left Turn]
X --> AC[!Stairs Down]  
X --> AD[!Stairs Out]                
AE --> AJ[!Place Small Room, Empty]
AE --> AG[Hazard]
AE --> AH[Lair]
AE --> AI[Quest Room]
AJ --> AN{Roll for Room Doors}
AN --> AO[None]
AN --> AP[!1 Door Room]
AN --> AQ[!2 Doors Room]`;

const flowchart = parseMermaidFlowchart(mermaidText, true);
console.log("Flowchart Structure:", flowchart);

// Start traversal (assuming 'A' is the starting point)
//traverseFlowchart(flowchart, 'A');

document.getElementById("placeRectangles").addEventListener("click", function() {
    // Start traversal (assuming 'A' is the starting point)
    traverseFlowchart(flowchart, 'A');
});

document.getElementById("addRectangles").addEventListener("click", function() {
    console.log(lastVisitedNode);
    traverseFlowchart(flowchart, lastVisitedNode);
});
