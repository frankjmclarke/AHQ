// Purpose: Traverses a flowchart and prints out the text of each node visited.
let lastVisitedNode = 'A';


const traverseFlowchart = (flowchart, startId) => {
  const visited = new Set(); // To avoid revisiting nodes

  const visitNode = (id) => {
    if (visited.has(id)) return; // Prevent infinite loops
    visited.add(id); // Mark as visited
    lastVisitedNode = id;
    const node = flowchart[id];
    if (!node) {
      printOut(`Node ${id} does not exist.`);
      return;
    }

    printOut(node.text); 

    if (node.children.length > 0) {
      let childId;
      // If more than one child, pick one at random
      if (node.children.length > 1) {
        const randomIndex = Math.floor(Math.random() * node.children.length);
        childId = node.children[randomIndex];
      } else {
        childId = node.children[0]; // Only one child
      }

      visitNode(childId); // Visit the selected child
    }
  };

  visitNode(startId); // Start traversal
};