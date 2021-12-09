module.exports = class Rolls {
    constructor(args){
        this.total = 0
        this.string = ``
        this.args = args
        
        //return Rolls.resolve()
    }

    estimateLength(){

    }
    resolve(){

        return this.string
    }
    dcFacade(roll){
        if(this.args.hasOwnProperty(`dc`)){
            switch(this.args.crit){
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
    

    addLine(roll){ }

    addLineVgDg(roll1, roll2, advg){ }
    //false == advg, true == advg 
    finalize(){ }

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
        return Rolls.rawdc(roll, args)
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