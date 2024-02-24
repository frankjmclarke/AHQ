class MapCreator {
    constructor(canvasId) {
        this.passages = [];
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scale = 3;
        this.roomHandlers = this.initializeRoomHandlers();
    }

    initializeRoomHandlers() {
        return {
            "!Start Exploration": () => this.startExploration(),
            "!Place 1 Section Passage": () => this.createMultipleRooms("Corridor", 1),
            "!Place 2 Sections Passage": () => this.createMultipleRooms("Corridor", 2),
            "!Place 3 Sections Passage": () => this.createMultipleRooms("Corridor", 3),
            "!T-Junction": () => this.handleSingleRoomCreation("T-Junction"),
            "!Dead End": () => this.handleSingleRoomCreation("Dead End"),
            "!Right Turn": () => this.handleSingleRoomCreation("Right Turn"),
            "!Left Turn": () => this.handleSingleRoomCreation("Left Turn"),
            "!Stairs Down": () => this.handleSingleRoomCreation("Stairs Down"),
            "!Stairs Out": () => this.handleSingleRoomCreation("Stairs Out"),
            "!Place Small Room, Empty": () => console.log("Handling '!Place Small Room, Empty'"),
            "!1 Door": () => this.createMultipleRooms("Door", 1),
            "!2 Doors": () => this.createMultipleRooms("Door", 2),
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
    }

    handleBracketedText(text) {
        const handler = this.roomHandlers[text] || this.roomHandlers["default"];
        handler(text);
    }

    startExploration() {
        console.log("Handling '!Start Exploration'");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        rectangleLib.rectangles = [];
        let attempts = 0;
        while (attempts < 3) {
            const newRect = rectangleLib.createRoom("Stairs Down", 0, 305, this.scale, rectangleLib.currentDirection);
            if (newRect !== null) {
                rectangleLib.rectangles.push(newRect);
                rectangleLib.drawAllRectangles(this.ctx);
                break;
            } else {
                console.error("Failed to create a new Stairs Down room");
                attempts++;
            }
        }
    }

    handleSingleRoomCreation(roomType) {
        let attempts = 0;
        while (attempts < 3) {
            const newRect = rectangleLib.createRoom(roomType, -1, -1, this.scale, rectangleLib.currentDirection);
            if (newRect !== null) {
                rectangleLib.rectangles.push(newRect);
                rectangleLib.drawAllRectangles(this.ctx);
                if (roomType === "Right Turn") {
                    rectangleLib.currentDirection = rotateDirectionClockwise(rectangleLib.currentDirection);
                } else if (roomType === "Left Turn") {
                    rectangleLib.currentDirection = rotateDirectionAntiClockwise(rectangleLib.currentDirection);
                }
                console.log("Current Direction: " + rectangleLib.currentDirection);
                break;
            } else {
                console.error("Failed to create a new " + roomType);
                attempts++;
            }
        }
    }

    createMultipleRooms(roomType, count) {
        for (let i = 0; i < count; i++) {
            this.handleSingleRoomCreation(roomType);
        }
    }
}
