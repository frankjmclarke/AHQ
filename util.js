const util = {

    randomBetween: function(min, max) {
        if(min > max) {
            [min, max] = [max, min];
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getD12: function() {
        return this.randomBetween(1,12);
    }

};