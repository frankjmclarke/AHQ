const printOut = (...args) => {
    const mapCreator = new MapCreator('canvas');
    console.log(...args);
    if (args.length > 0) {
        mapCreator.handleBracketedText(args[0]);
    }
};