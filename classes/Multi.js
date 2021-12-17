const Stringfy = require("./Roll")
const { randomInt } = require('./../helpers/random')

module.exports = class Multi extends Stringfy {

    generateReply(){
        /*
        {
            const header = this.args.cmd.length + 34
            let lineSize = (this.args.dicesize.toString().length + 5 + this.args.dicemod.toString().length)
            
            if(this.args.hasOwnProperty('dc')){
                const critOdds = (this.args.dicesize - 2)/this.args.dicesize
                lineSize += 10 * critOdds + 23 * (1 - critOdds)
            }

            lineSize = lineSize * this.args.diceamount
            lineSize += header
            console.log(`Estimated size: ${lineSize}`)
            if(lineSize >= 2000) 
                return `The resulting roll is too big to be displayed.`
        }
        */
        switch(this.args.vg){
            case 0:
                while(this.args.diceamount > 0){
                    this.args.diceamount--
                    this.string += `\n`
                    const roll = randomInt(this.args.dicesize)
                    this.total += roll + this.args.dicemod
                    this.string += `**${roll + this.args.dicemod}** ← \`${roll}\``
                    if(this.args.dicemod < 0)
                        this.string += ` - \`${-1 * this.args.dicemod}\``
                    else if(this.args.dicemod > 0)
                        this.string += ` + \`${this.args.dicemod}\``
                    super.dcFacade(roll, this.args.dicemod)                    
                }
                break
            default:
                while(this.args.diceamount > 0){
                    this.args.diceamount--
                    this.string += `\n`
                    const roll1 = randomInt(this.args.dicesize)
                    const roll2 = randomInt(this.args.dicesize)
                    let used
                    let discarded
                    if(this.args.vg == 1){
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
        }
        const finalString = `total: \`${this.total}\`, ${this.args.cmd}` + this.string
        if(finalString.length >= 1600)  //leaving a big slack
            return `The resulting roll is too big to be displayed.`
        console.log('final roll length:', finalString.length)
        return finalString
        //delete object after the return   
    }
}