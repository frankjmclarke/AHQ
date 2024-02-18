

const parseMermaidFlowchart = (inputText, convertCurlyToUpperCase = false) => {
  const flowchart = {};
  const lines = inputText.split("\n");

  const addNode = (id, text = '', type = 'unknown') => {
    // If the flag is set and type is curly, convert text to uppercase
    if (convertCurlyToUpperCase && type === 'curly') {
      text = text.toUpperCase();
    }
    if (!flowchart[id]) {
      flowchart[id] = { type, text, children: [] };
    }
  };

  lines.forEach(line => {
    line = line.trim();
    if (line.length === 0 || !line.includes("-->")) return;

    // Remove conditions enclosed in "|" characters following an arrow
    line = line.replace(/-->\s*\|[^|]*\|\s*/, '-->');

    const parts = line.split("-->").map(part => part.trim());

    // Attempt to parse the left part (parentId)
    let parentIdMatch = parts[0].match(/^([A-Z]+)(\((.*?)\)|\[(.*?)\]|\{(.*?)\})?$/);
    if (parentIdMatch) {
      const parentId = parentIdMatch[1];
      const text = parentIdMatch[3] || parentIdMatch[4] || parentIdMatch[5] || '';
      const type = parentIdMatch[2] ? (parentIdMatch[2].startsWith('(') ? 'round' : parentIdMatch[2].startsWith('[') ? 'square' : parentIdMatch[2].startsWith('{') ? 'curly' : 'unknown') : 'unknown';
      addNode(parentId, text, type);
    }

    // Attempt to parse the right part (childId)
    if (parts.length > 1) {
      let childIdMatch = parts[1].match(/^([A-Z]+)(\((.*?)\)|\[(.*?)\]|\{(.*?)\})?$/);
      if (childIdMatch) {
        const childId = childIdMatch[1];
        const text = childIdMatch[3] || childIdMatch[4] || childIdMatch[5] || '';
        const type = childIdMatch[2] ? (childIdMatch[2].startsWith('(') ? 'round' : childIdMatch[2].startsWith('[') ? 'square' : childIdMatch[2].startsWith('{') ? 'curly' : 'unknown') : 'unknown';
        addNode(childId, text, type);
        // Update children for parentId if parentId was successfully parsed
        if (parentIdMatch) {
          flowchart[parentIdMatch[1]].children.push(childId);
        }
      }
    }
  });

  return flowchart;
};

