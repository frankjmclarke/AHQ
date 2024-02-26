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
        const createRooms = (type, count) => () => this.createMultipleRooms(type, count);
        const handleSingleRoom = (type) => () => this.handleSingleRoomCreation(type);

        return {
            "!Start Exploration": this.startExploration.bind(this),
            "!Place 1 Section Passage": createRooms("Corridor", 1),
            "!Place 2 Sections Passage": createRooms("Corridor", 2),
            "!Place 3 Sections Passage": createRooms("Corridor", 3),
            "!T-Junction": handleSingleRoom("T-Junction"),
            "!Dead End": handleSingleRoom("Dead End"),
            "!Right Turn": handleSingleRoom("Right Turn"),
            "!Left Turn": handleSingleRoom("Left Turn"),
            "!Stairs Down": handleSingleRoom("Stairs Down"),
            "!Stairs Out": handleSingleRoom("Stairs Out"),
            "!Place Small Room, Empty": () => console.log("Handling '!Place Small Room, Empty'"),
            "!1 Door": () => this.doors(1),
            "!2 Doors": () => this.doors(2),
            "!GM Consults Hazards Section": () => console.log("Handling '!GM Consults Hazards Section'"),
            "!Roll on Lairs Matrix, Place Treasure": () => console.log("Handling '!Roll on Lairs Matrix, Place Treasure'"),
            "!Roll on Quest Rooms Matrix, Place Treasure": () => console.log("Handling '!Roll on Quest Rooms Matrix, Place Treasure'"),
            "default": (text) => console.log("Unknown text: " + text),
        };
    }

    handleBracketedText(text) {
        const handler = this.roomHandlers[text] || this.roomHandlers["default"];
        handler();
        rectangleLib.drawAllRectangles(this.ctx);
    }

    startExploration() {
        console.log("Handling '!Start Exploration'");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        rectangleLib.rectangles = [];
        this.tryCreatingRoom("Stairs Down", 0, 305, 3);
    }

    handleSingleRoomCreation(roomType) {
        this.tryCreatingRoom(roomType, -1, -1);
    }

    tryCreatingRoom(roomType, x, y, attemptCount = 3) {
        let attempts = 0;
        while (attempts < attemptCount) {
            const direction = rectangleLib.currentDirection;
            const newRect = rectangleLib.createRoom(roomType, x, y, this.scale, direction);
            if (newRect) {
                rectangleLib.rectangles.push(newRect);
                if (["Right Turn", "Left Turn"].includes(roomType)) {
                    rectangleLib.currentDirection = this.adjustDirection(roomType, direction);
                }
                this.passages.push(rectangleLib.rectangles.length - 1);
                console.log(`Created ${roomType} at direction: ${rectangleLib.currentDirection}`);
                break;
            } else {
                console.error(`Failed to create a new ${roomType}`);
                attempts++;
            }
        }
    }

    adjustDirection(roomType, currentDirection) {
        if (roomType === "Right Turn") {
            return rotateDirectionClockwise(currentDirection);
        } else if (roomType === "Left Turn") {
            return rotateDirectionAntiClockwise(currentDirection);
        }
        return currentDirection;
    }

    createMultipleRooms(roomType, count) {
        this.passages = [];
        for (let i = 0; i < count; i++) {
            this.handleSingleRoomCreation(roomType);
        }
        console.log(`Passages Length: ${this.passages.length}`);
    }

    singleDoor() {
        // Assuming util.randomBetween and util.getD12 are defined and accessible
        if (this.passages.length === 0) {
            console.error("No  passage for door");
            return;
        }
        let attempts = 0;
        const attemptLimit = 3;
        while (attempts < attemptLimit) {
            const passageIndex = util.randomBetween(0, this.passages.length - 1);
            const selectedPassage = this.passages[passageIndex];
            const { x, y } = rectangleLib.rectangles[selectedPassage];
            let newY = y + (util.getD12() > 6 ? 5 * this.scale : -2 * this.scale);
            const newRect = rectangleLib.createRoom("Door", x + 5 * this.scale, newY, this.scale, rectangleLib.currentDirection);
            if (newRect !== null) {
                rectangleLib.rectangles.push(newRect);
                console.log(`singleDoor x: ${x}, y: ${newY}`);
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