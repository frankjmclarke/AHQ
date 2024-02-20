function handleBracketedText(text) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 3;

    const roomHandlers = {
        "!Start Exploration": () => {
            console.log("Handling '!Start Exploration'");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            rectangleLib.rectangles = []; // Clear the rectangles array
            
            let attempts = 0;
            while (attempts < 3) { // Attempt up to 3 times
                const newRect = rectangleLib.createRoom("Stairs Down", 0, 305, scale, rectangleLib.currentDirection);
                if (newRect !== null) {
                    rectangleLib.rectangles.push(newRect);
                    rectangleLib.drawAllRectangles(ctx);
                    break; // Exit loop if room creation is successful
                } else {
                    console.error("Failed to create a new Stairs Down room");
                    attempts++; // Increment attempts counter
                }
            }
        },
        "!Place 1 Section Passage": () => {
            console.log("Handling '!Place 1 Section Passage'");
            createMultipleRooms("Corridor", 1);
        },
        "!Place 2 Sections Passage": () => {
            console.log("Handling '!Place 2 Sections Passage'");
            createMultipleRooms("Corridor", 2);
        },
        "!Place 3 Sections Passage": () => {
            console.log("Handling '!Place 3 Sections Passage'");
            createMultipleRooms("Corridor", 3);
        },
        "!T-Junction": () => handleSingleRoomCreation("T-Junction"),
        "!Dead End": () => handleSingleRoomCreation("Dead End"),
        "!Right Turn": () => handleSingleRoomCreation("Right Turn"),
        "!Left Turn": () => handleSingleRoomCreation("Left Turn"),
        "!Stairs Down": () => handleSingleRoomCreation("Stairs Down"),
        "!Stairs Out": () => handleSingleRoomCreation("Stairs Out"),
        "!Place Small Room, Empty": () => console.log("Handling '!Place Small Room, Empty'"),
        "!GM Consults Hazards Section": () => console.log("Handling '!GM Consults Hazards Section'"),
        "!Roll on Lairs Matrix, Place Treasure": () => console.log("Handling '!Roll on Lairs Matrix, Place Treasure'"),
        "!Roll on Quest Rooms Matrix, Place Treasure": () => console.log("Handling '!Roll on Quest Rooms Matrix, Place Treasure'"),
        "!1 Door Room": () => console.log("Handling '!1 Door Room'"),
        "!2 Doors Room": () => console.log("Handling '!2 Doors Room'"),
        "!Room Has No Additional Exits": () => console.log("Handling '!Room Has No Additional Exits'"),
        "!Leader Chooses Wall for Door": () => console.log("Handling '!Leader Chooses Wall for Door'"),
        "!Leader Chooses Walls for 2 Doors": () => console.log("Handling '!Leader Chooses Walls for 2 Doors'"),
        "default": (text) => console.log("Unknown text: " + text)
    };

    const handler = roomHandlers[text] || roomHandlers["default"];
    handler(text);

    function handleSingleRoomCreation(roomType) {
        let attempts = 0;
        while (attempts < 3) { // Attempt up to 3 times
            const newRect = rectangleLib.createRoom(roomType, -1, -1, scale, rectangleLib.currentDirection);
            if (newRect !== null) {
                rectangleLib.rectangles.push(newRect);
                rectangleLib.drawAllRectangles(ctx);
                if (roomType === "Right Turn") {
                    rectangleLib.currentDirection = rotateDirectionClockwise(rectangleLib.currentDirection);
                } else if (roomType === "Left Turn") {
                    rectangleLib.currentDirection = rotateDirectionAntiClockwise(rectangleLib.currentDirection);
                }
                console.log("Current Direction: " + rectangleLib.currentDirection);
                break; // Exit loop if room creation is successful
            } else {
                console.error("Failed to create a new " + roomType);
                attempts++; // Increment attempts counter
            }
        }
    }

    function createMultipleRooms(roomType, count) {
        for (let i = 0; i < count; i++) {
            handleSingleRoomCreation(roomType);
        }
    }
}
