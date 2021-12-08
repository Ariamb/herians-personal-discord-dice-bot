const stringfy = require("./stringfy")

module.exports = class MultiRoll extends stringfy {

    addLine(roll){
        this.string += `\n`
        this.total += roll + this.args.dicemod
        this.string += `**${roll + this.args.dicemod}** ← \`${roll}\``
        if(this.args.dicemod < 0)
            this.string += ` - \`${-1 * this.args.dicemod}\``
        else if(this.args.dicemod > 0)
            this.string += ` + \`${this.args.dicemod}\``
        super.dcFacade(roll, this.args.dicemod)
    }

    addLineVgDg(roll1, roll2, advg){ //false == advg, true == advg
        this.string += `\n`
        let used
        let discarded
        if(advg){
            used = Math.max(roll1, roll2)
            discarded = Math.min(roll1, roll2)
        } else {
            used = Math.min(roll1, roll2)
            discarded = Math.max(roll1, roll2)
        }
        this.total += used + this.args.dicemod
        this.string += `**${used + this.args.dicemod}** ← \`${used}\``
        
        if(this.args.dicemod < 0)
            this.string += ` - \`${-1 * this.args.dicemod}\``
        else if(this.args.dicemod > 0)
            this.string += ` + \`${this.args.dicemod}\``

        this.string += `, ~~\`${discarded}\`~~`
        super.dcFacade(used, this.args.dicemod)
    }
    finalize(){
        return `total: \`${this.total}\`, ${this.args.cmd}` + this.string
        //might aswell delete the object after calling this function
    }
}