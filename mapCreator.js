class MapCreator {
    constructor(canvasId) {
        this.passages = [];
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scale = 3;
        this.roomHandlers = this.initializeRoomHandlers();
        console.log("MapCreator constructor");
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
            "!1 Door": () => this.doors(1),
            "!2 Doors": () => this.doors(2),
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
        rectangleLib.drawAllRectangles(this.ctx);
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
                if (roomType === "Right Turn") {
                    rectangleLib.currentDirection = rotateDirectionClockwise(rectangleLib.currentDirection);
                } else if (roomType === "Left Turn") {
                    rectangleLib.currentDirection = rotateDirectionAntiClockwise(rectangleLib.currentDirection);
                }
                this.passages.push(rectangleLib.rectangles.length - 1); // Add the top index integer to passages
                console.log("Current Direction: " + rectangleLib.currentDirection);
                break;
            } else {
                console.error("Failed to create a new " + roomType);
                attempts++;
            }
        }
    }

    createMultipleRooms(roomType, count) {
        this.passages = [];
        for (let i = 0; i < count; i++) {
            this.handleSingleRoomCreation(roomType);
        }
        console.log("passages Length " + this.passages.length);
    }

    singleDoor() {
        let attempts = 0;
        while (attempts < 3) {

            if (this.passages.length === 0) {
                console.error("No passage for door " + this.passages.length);
                return;
            }
            let ind = util.randomBetween(0, this.passages.length - 1);
            ind = this.passages[ind];
            const x = rectangleLib.rectangles[ind].x;
            let y = rectangleLib.rectangles[ind].y;
            if (util.getD12() > 6) {
                y += (5 * this.scale);
            } else {
                y -= (2 * this.scale);
            }
            const newRect = rectangleLib.createRoom("Door", x + (5 * this.scale), y, this.scale, rectangleLib.currentDirection);


            if (newRect !== null) {
                rectangleLib.rectangles.push(newRect);
                console.log("singleDoor x " + x + " y " + y);
                break;
            } else {
                console.error("Failed to create a new door");
                attempts++;
            }
        }
    }

    doors(count) {
        for (let i = 0; i < count; i++) {
            this.singleDoor();
        }
    }


}
