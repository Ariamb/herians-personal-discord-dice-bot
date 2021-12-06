const random = require('./../helpers/random')
const parser = require('./../helpers/parser')
module.exports = {
    simpleroll: function(roll){
        const [diceamount, dicesize, dicemod, advg] = parser.diceparser(roll)
        let total = 0
        const dices = []
        for(i = 0; i < diceamount; i++){
            dices.push(random.randomInt(dicesize))
            total += dices[i]
        }
        total += dicemod
        return [total, dices]
    },
    multiroll: function(roll){
        const [diceamount, dicesize, dicemod] = parser.diceparser(roll)
        let total = 0
        const dices = []
        for(i = 0; i < diceamount; i++){
            dices.push(random.randomInt(dicesize))
            total += dices[i]
        }
        return [total, dices, dicemod]
    }

}
