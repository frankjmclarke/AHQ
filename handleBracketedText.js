

function handleBracketedText(text) {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
    switch (text) {
        // Adding the missing case as highlighted
        case "!Start Exploration":
            console.log("Handling '!Start Exploration'");
            newRect = rectangleLib.createRoom("Stairs Down", 0, 15, 5, direction = Direction.LEFT);			
			rectangleLib.rectangles.push(newRect);			
			rectangleLib.drawAllRectangles(ctx);			
            break;
        case "!Place 1 Section Passage":
            console.log("Handling '!Place 1 Section Passage'");
            newRect = rectangleLib.createRoom("Corridor", -1, -1, 5, direction = Direction.LEFT);	
			rectangleLib.rectangles.push(newRect);			
			rectangleLib.drawAllRectangles(ctx);				
            break;
        case "!Place 2 Sections Passage":
            console.log("Handling '!Place 2 Sections Passage'");
            newRect = rectangleLib.createRoom("Corridor", -1, -1, 5, direction = Direction.LEFT);	
			rectangleLib.rectangles.push(newRect);	
            newRect = rectangleLib.createRoom("Corridor", -1, -1, 5, direction = Direction.LEFT);	
			rectangleLib.rectangles.push(newRect);	            		
			rectangleLib.drawAllRectangles(ctx);            
            break;
        case "!Place 3 Sections Passage":
            console.log("Handling '!Place 3 Sections Passage'");
            newRect = rectangleLib.createRoom("Corridor", -1, -1, 5, direction = Direction.LEFT);	
			rectangleLib.rectangles.push(newRect);	
            newRect = rectangleLib.createRoom("Corridor", -1, -1, 5, direction = Direction.LEFT);	
			rectangleLib.rectangles.push(newRect);	 
            newRect = rectangleLib.createRoom("Corridor", -1, -1, 5, direction = Direction.LEFT);	
			rectangleLib.rectangles.push(newRect);	           		
			rectangleLib.drawAllRectangles(ctx);  
            break;
        case "!T-Junction":
            console.log("Handling '!T-Junction'");
            break;
        case "!Dead End":
            console.log("Handling '!Dead End'");
            break;
        case "!Right Turn":
            console.log("Handling '!Right Turn'");
            newRect = rectangleLib.createRoom("Right Turn", -1, -1, 5, direction = Direction.LEFT)			
			rectangleLib.rectangles.push(newRect);			
			rectangleLib.drawAllRectangles(ctx);
            break;
        case "!Left Turn":
            console.log("Handling '!Left Turn'");
            newRect = rectangleLib.createRoom("Left Turn", -1, -1, 5, direction = Direction.LEFT)			
			rectangleLib.rectangles.push(newRect);			
			rectangleLib.drawAllRectangles(ctx);
            break;
        case "!Stairs Down":
            console.log("Handling '!Stairs Down'");
            break;
        case "!Stairs Out":
            console.log("Handling '!Stairs Out'");
            break;
        case "!Place Small Room, Empty":
            console.log("Handling '!Place Small Room, Empty'");
            break;
        case "!GM Consults Hazards Section":
            console.log("Handling '!GM Consults Hazards Section'");
            break;
        case "!Roll on Lairs Matrix, Place Treasure":
            console.log("Handling '!Roll on Lairs Matrix, Place Treasure'");
            break;
        case "!Roll on Quest Rooms Matrix, Place Treasure":
            console.log("Handling '!Roll on Quest Rooms Matrix, Place Treasure'");
            break;
        case "!1 Door Room":
            console.log("Handling '!1 Door Room'");
            break;
        case "!2 Doors Room":
            console.log("Handling '!2 Doors Room'");
            break;
        case "!Room Has No Additional Exits":
            console.log("Handling '!Room Has No Additional Exits'");
            break;
        case "!Leader Chooses Wall for Door":
            console.log("Handling '!Leader Chooses Wall for Door'");
            break;
        case "!Leader Chooses Walls for 2 Doors":
            console.log("Handling '!Leader Chooses Walls for 2 Doors'");
            break;
        default:
            console.log("Unknown text: " + text);
    }
}
