module.exports = class stringfyMR {
    constructor(args){
        this.total = 0
        this.string = ``
        this.args = args
    
    this.dcFacade = function(roll){
        if(this.args.hasOwnProperty(`dc`)){
            switch(this.args.crit){
                case -1:
                    break;
                case 0:
                    this.string += ` ` + this.constructor.rawdc(roll, this.args)
                    break
                case 1:
                    this.string += ` ` + this.constructor.simpledc(roll, this.args)
                    break
                case 2:
                    this.string += ` ` + this.constructor.variantdc(roll, this.args)
                    break
                default:
                    this.string += ` ` + this.constructor.simpledc(roll, this.args)
                    break
            }
        } else if(this.args.crit === 0) this.string += ` ` + this.constructor.simpledc(roll, this.args)
        
    }
    }

    addLine(roll){
        this.string += `\n`
        this.total += roll + this.args.dicemod
        this.string += `**${roll + this.args.dicemod}** ← \`${roll}\``
        if(this.args.dicemod < 0)
            this.string += ` - \`${-1 * this.args.dicemod}\``
        else if(this.args.dicemod > 0)
            this.string += ` + \`${this.args.dicemod}\``
        this.dcFacade(roll, this.args.dicemod)
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
        this.dcFacade(used, this.args.dicemod)
    }
    finalize(){
        return `total: \`${this.total}\`, ${this.args.cmd}` + this.string
        //might aswell delete the object after calling this function
    }
        
    static rawdc(roll, args){
        if((roll + args.dicemod) >= args.dc)
            return `Success!`
        else 
            return `Failure!`
    }

    static simpledc(roll, args){
        if(roll >= 1 && roll <= args.failureCritRange)
            return `**Critical Failure!**`
        if(roll <= args.dicesize && roll >= args.successCritRange)
            return `**Critical Success!**`
        if(!args.dc) //optional parameter
                return ``
        return stringfyMR.rawdc(roll, args)
    }
        
    static variantdc(roll, args){
        let successDegree = 0 
        //-1 or less == crit fail, 0 == no crits (normal failure/success), 1 or more == crit success
        if(roll >= 1 && roll <= args.failureCritRange) 
            successDegree += -1
        else if (roll >= args.successCritRange && roll <= args.dicesize) 
            successDegree += 1
        
        if(roll + args.dicemod >= args.dc + 10)
            successDegree += 1
        else if (roll + args.dicemod < args.dc - 10)
            successDegree += -1
            
        if(roll + args.dicemod > args.dc){
            switch (successDegree){
                case -1:
                    return `Failure`
                case 0:
                    return `Success!`
                case 1:
                    return `Critical Success!`
            }
        } else {
            switch (successDegree){
                case -1:
                    return `Critical Failure:`
                case 0:
                    return `Failure!`
                case 1:
                    return `Success!`
            }
        }
    }
}