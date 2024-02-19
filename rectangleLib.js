
const Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
};

class Rectangle {
    constructor(x, y, width, height, fillColor = 'black', lineColor = 'black', scale = 1, direction = Direction.RIGHT, roomString = "") {
        this.x = x;
        this.y = y;
        this.width = width * scale; // Apply scale to width
        this.height = height * scale; // Apply scale to height
        this.fillColor = fillColor; // Fill color for the rectangle
        this.lineColor = lineColor; // Line (stroke) color for the rectangle
        this.direction = direction; // Direction of the rectangle
        this.roomString = roomString; // Room type of the rectangle
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.lineColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    overlaps(other) {
        return !(this.x + this.width < other.x ||
            this.x > other.x + other.width ||
            this.y + this.height < other.y ||
            this.y > other.y + other.height);
    }
}

const sizes = [
    [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2],
    [5, 2], [5, 5], [5, 5], [5, 10], [5, 10]
];

const roomStrings = [
    "T-Junction", "Dead End", "Right Turn", "Left Turn",
    "Stairs Down", "Stairs Out", "Corridor", "Normal",
    "Hazard", "Lair", "Quest"
];

const fillColors = [
    "red", "blue", "green", "yellow", "black",
    "red", "blue", "green", "yellow", "black",
    "red"
];

const lineColors = [
    "blue", "green", "yellow", "black", "red",
    "blue", "green", "yellow", "black", "red",
    "green"
];

const rotateDirectionClockwise = (direction) => {
    switch (direction) {
        case Direction.UP:
            return Direction.RIGHT;
        case Direction.RIGHT:
            return Direction.DOWN;
        case Direction.DOWN:
            return Direction.LEFT;
        case Direction.LEFT:
            return Direction.UP;
        default:
            return direction;
    }
};

const rotateDirectionAntiClockwise = (direction) => {
    switch (direction) {
        case Direction.UP:
            return Direction.LEFT;
        case Direction.LEFT:
            return Direction.DOWN;
        case Direction.DOWN:
            return Direction.RIGHT;
        case Direction.RIGHT:
            return Direction.UP;
        default:
            return direction;
    }
};

const rectangleLib = {
    rectangles: [], // Array to store rectangles
    createRectangle: function (x, y, width, height, fillColor = 'black', lineColor = 'black', scale = 1, direction = Direction.RIGHT, roomString = "") {
        const newRect = new Rectangle(x, y, width, height, fillColor, lineColor, scale, direction, roomString);
        this.rectangles.push(newRect); // Add the new rectangle to the array
        return newRect;
    },
    currentDirection: Direction.RIGHT,

    createRoom: function (roomString, x, y, scale, direction) {
        const index = roomStrings.indexOf(roomString);
        let prevRect = null; // Declare prevRect outside of the conditional
        if (index !== -1) {
            const size = sizes[index];
            const fillColor = fillColors[index];
            const lineColor = lineColors[index];
            const [width, height] = size.map(val => val * scale);
            let newX = x;
            let newY = y;
            let newRect = null;
            if (x < 0 && y < 0 ) {
                prevRect = this.rectangles[this.rectangles.length - 1];
                switch (direction) {
                    case Direction.DOWN:
                        newY = prevRect.y + prevRect.height;//reversed
                        newX = prevRect.x;
                        newRect = this.createRectangle(newX, newY, height, width, fillColor, lineColor, scale, direction, roomString);
                        break;
                    case Direction.UP:
                        newY = prevRect.y - prevRect.height;//reversed
                        newX = prevRect.x;
                        newRect = this.createRectangle(newX, newY, height, width, fillColor, lineColor, scale, direction, roomString);
                        break;
                    case Direction.LEFT:
                        newX = prevRect.x + prevRect.width;
                        newY = prevRect.y;
                        newRect = this.createRectangle(newX, newY, width, height, fillColor, lineColor, scale, direction, roomString);
                        break;
                    case Direction.RIGHT:
                        newX = prevRect.x - prevRect.width;
                        newY = prevRect.y;
                        newRect = this.createRectangle(newX, newY, width, height, fillColor, lineColor, scale, direction, roomString);
                        break;
                    default:
                        break;
                }
            } else{
                newRect = this.createRectangle(newX, newY, width, height, fillColor, lineColor, scale, direction, roomString);
            }
            console.log("height " + height + " width " + width + " direction " + direction + "x " + x + "y " + y + " roomString " + roomString);

            return newRect;
        } else {
            console.error("Room string not found in the mapping.");
            return null;
        }
    },



    drawRectangle: function (ctx, rectangle) {
        rectangle.draw(ctx);
    },

    checkOverlap: function (rect1, rect2) {
        return rect1.overlaps(rect2);
    },

    checkOverlapWithExisting: function (newRectangle) {
        // Check if the newRectangle overlaps with any rectangle in the array
        return this.rectangles.some(existingRect => newRectangle.overlaps(existingRect));
    },

    drawAllRectangles: function (ctx) {
        // Check if rectangles array is not null
        if (this.rectangles) {
            // Draw all rectangles stored in the array
            this.rectangles.forEach(rectangle => rectangle.draw(ctx));
        } else {
            console.error("Rectangles array is null.");
        }
    },
    

    alignLeft: function (rectangle, target) {
        rectangle.x = target.x - rectangle.width; // Place to the left of the target
    },

    alignRight: function (rectangle, target) {
        rectangle.x = target.x + target.width; // Place to the right of the target
    },

    alignUp: function (rectangle, target) {
        rectangle.y = target.y - rectangle.height; // Place above the target
    },

    alignDown: function (rectangle, target) {
        rectangle.y = target.y + target.height; // Place below the target
    }
};
