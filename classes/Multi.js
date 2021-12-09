const Stringfy = require("./Roll")

module.exports = class Multi extends Stringfy {

    fitsReply(){
        const header = this.args.cmd.length + 34
        /*
        why 25:
        string template: 13 (including `` and \n)
        this.total estimated as 2;
        estimated "reply" tax: 22
        */
        let lineSize = (this.args.dicesize.toString().length + 5 + this.args.dicemod.toString().length)

        /*
        why 5:
        template string: 8 (including `` and \n)
        */

        if(this.args.hasOwnProperty('dc')){
            const critOdds = (this.args.dicesize - 2)/this.args.dicesize
            lineSize += 10 * critOdds + 23 * (1 - critOdds)
        }
        /*
        why :
        10 for the template string (including \n)
        dicesize == 100%
        dicesize -2 == ?%
        2 == ?%
        23 extra characters to simulate a critical:
        crits happen only 2 out of this.args.dicesize times. 
        */
        lineSize = lineSize * this.args.diceamount
        lineSize += header
        console.log(`Estimated size: ${lineSize}`)
        return !(lineSize >= 2000)
        //or return (lineSize >= 2000) ? false : true
    }
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