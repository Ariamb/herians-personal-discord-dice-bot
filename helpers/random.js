module.exports = {
    randomInt: function(max) { //1 to max, max included
        return Math.floor(Math.random() * (max) + 1)
    },
    randomIntFromInterval: function(min, max) { // min to max, min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}