
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
        if (index === -1) {
            console.error("Room string not found in the mapping.");
            return null;
        }
    
        const fillColor = fillColors[index];
        const lineColor = lineColors[index];
        const size = sizes[index];
        [width, height] = size.map(val => val * scale);
        let newX = x;
        let newY = y;
        let temp = width;
    
        if (x < 0 && y < 0 ) {
            const prevRect = this.rectangles[this.rectangles.length - 1];
            switch (direction) {
                case Direction.DOWN:
                     temp = width;
                     width = height;
                     height = temp;
                    newY = prevRect.y + prevRect.height;
                    newX = prevRect.x;
                    break;
                case Direction.UP:
                     temp = width;
                    width = height;
                    height = temp;
                    newY = prevRect.y - height * scale;
                    newX = prevRect.x;
                    break;
                case Direction.LEFT:
                    newX = prevRect.x + prevRect.width;
                    newY = prevRect.y;
                    break;
                case Direction.RIGHT:
                    newX = prevRect.x + prevRect.width;
                    newY = prevRect.y;
                    break;
            }
        }
    
        const newRect = new Rectangle(newX, newY, width, height, fillColor, lineColor, scale, direction, roomString);
    
        // Check if the new rectangle would go off the canvas or overlap an existing rectangle
        let testy = this.isOutOfBounds(newRect) ;
        let testy2 = this.checkOverlapWithExisting(newRect) ;        
        if (this.checkOverlapWithExisting(newRect) ) {
            console.error("The new rectangle would go off the canvas or overlap an existing rectangle.");
            //return null; // Return null to indicate failure
        }
    
        // Add the new rectangle to the array
        this.rectangles.push(newRect);
        console.log("height " + height + " width " + width + " direction " + direction + " x " + x + " y " + y + " roomString " + roomString);
    
        return newRect;
    },
    
    isOutOfBounds: function (rectangle) {
        // Check if the rectangle is outside the canvas boundaries
        return (
            rectangle.x < 0 || rectangle.y < 0 ||
            rectangle.x + rectangle.width > canvas.width ||
            rectangle.y + rectangle.height > canvas.height
        );
    },
    

    drawRectangle: function (ctx, rectangle) {
        rectangle.draw(ctx);
    },

    checkOverlap: function (rect1, rect2) {
        return rect1.overlaps(rect2);
    },

    checkOverlapWithExisting: function (newRectangle) {
        // Adjusted tolerance to account for minor overlaps
        const tolerance = 1;
        
        // Check if the newRectangle overlaps with any rectangle in the array
        return this.rectangles.some(existingRect => {
            // Calculate adjusted boundaries for more accurate overlap detection
            const newX = newRectangle.x - tolerance;
            const newY = newRectangle.y - tolerance;
            const newWidth = newRectangle.width + 2 * tolerance;
            const newHeight = newRectangle.height + 2 * tolerance;
    
            const existingX = existingRect.x;
            const existingY = existingRect.y;
            const existingWidth = existingRect.width;
            const existingHeight = existingRect.height;
    
            // Check for overlap considering the adjusted boundaries
            return !(newX + newWidth < existingX ||
                     existingX + existingWidth < newX ||
                     newY + newHeight < existingY ||
                     existingY + existingHeight < newY);
        });
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

    clearAllRectangles: function () {
        this.rectangles = [];
    }
};