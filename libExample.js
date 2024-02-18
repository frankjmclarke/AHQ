document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Create some rectangles
    rectangleLib.createRectangle(10, 10, 100, 50, 'blue', 'red');
    rectangleLib.createRectangle(150, 10, 100, 50, 'green', 'yellow');

    // Attempt to create a new rectangle that might overlap
    let newRect = new Rectangle(60, 30, 120, 60, 'purple', 'orange');

    // Check if the new rectangle overlaps with any existing rectangles
    if (!rectangleLib.checkOverlapWithExisting(newRect)) {
        // If no overlap, add it to the library and draw
        rectangleLib.rectangles.push(newRect);
    } else {
        console.log("New rectangle overlaps with existing rectangles.");
    }

    // Draw all rectangles
    rectangleLib.drawAllRectangles(ctx);




    // Create rectangles
    let rect1 = rectangleLib.createRectangle(10, 210, 100, 50, 'blue', 'red')
    let rect2 = rectangleLib.createRectangle(150, 210, 100, 50, 'green', 'black')

    // Draw rectangles
    rectangleLib.drawRectangle(ctx, rect1);
    rectangleLib.drawRectangle(ctx, rect2);

    // Check if rectangles overlap
    console.log('Do the rectangles overlap?', rectangleLib.checkOverlap(rect1, rect2));

    // Align rect2 to the right of rect1
    rectangleLib.alignRight(rect2, rect1);
    // Re-draw to see the alignment
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas to redraw
    //rectangleLib.drawRectangle(ctx, rect1);
    //rectangleLib.drawRectangle(ctx, rect2);
    rectangleLib.drawAllRectangles(ctx);

});