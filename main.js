const mermaidText1 = `A(!Start Exploration) -->  C{Junction or Door?}
C -->|Junction| I{Roll for Passage Length}
C -->|Door| E{Roll Dice for Room or Passage}
E -->|Evens Passage| P{Roll for Passage Features}
I --> M[!Place 1 Section Passage]
I --> N[!Place 2 Sections Passage]
P --> T[Nothing]
M --> P
N --> P
L --> P
T --> X{Roll for Passage End}
X --> AA[!Right Turn]    
X --> AB[!Left Turn]`;



const mermaidText = `A(!Start Exploration) -->  C{Junction or Door?}
C --> I{Roll for Passage Length}
C --> E{Roll Dice for Room or Passage}
E --> P{Roll for Passage Features}
E --> AE{Roll for Room Type}
I --> M[!Place 1 Section Passage]
I --> N[!Place 2 Sections Passage]
I --> L[!Place 3 Sections Passage]
M --> P
N --> P
L --> P
P --> R[!1 Door]
P --> S[!2 Doors]
P --> T[Nothing]
T --> X{Roll for Passage End}
X --> AA[!Right Turn]    
X --> AB[!Left Turn]               
AE --> AJ[Place Small Room, Empty]
AJ --> AN{Roll for Room Doors}
AN --> AO[!None]
AN --> AP[!1 Door Room]
AN --> AQ[!2 Doors Room]`;

const mermaidTextd = `A(!Start Exploration) -->  C{Junction or Door?}
C --> I{Roll for Passage Length}
C --> E{Roll Dice for Room or Passage}
E --> P{Roll for Passage Features}
E --> AE{Roll for Room Type}
I --> M[!Place 1 Section Passage]
I --> N[!Place 2 Sections Passage]
I --> L[!Place 3 Sections Passage]
M --> P
N --> P
L --> P
P --> Q[!Wandering Monsters]
P --> R[!1 Door]
P --> S[!2 Doors]
P --> T[Nothing]
T --> X{Roll for Passage End}
X --> Y[!T-Junction]
X --> Z[!Dead End]
X --> AA[!Right Turn]    
X --> AB[!Left Turn]
X --> AC[!Stairs Down]  
X --> AD[!Stairs Out]                
AE --> AJ[Place Small Room, Empty]
AE --> AG![Hazard]
AE --> AH[!Lair]
AE --> AI[!Quest Room]
AJ --> AN{Roll for Room Doors}
AN --> AO[!None]
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
    for (let index = 0; index < 4; index++) {
        traverseFlowchart(flowchart, "C");       
    }

/*
document.getElementById("addRectangles").addEventListener("click", function() {
    console.log(lastVisitedNode);
    traverseFlowchart(flowchart, lastVisitedNode);
});
*/
});
