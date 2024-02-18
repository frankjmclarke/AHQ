const printOut = (...args) => {
    console.log(...args);
    if (args.length > 0) {
        handleBracketedText(args[0]);
    }
};