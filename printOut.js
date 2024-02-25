const printOut = (text, mapCreator) => {

    console.log(text);
    if (text!="") {
        mapCreator.handleBracketedText(text);
    }
};