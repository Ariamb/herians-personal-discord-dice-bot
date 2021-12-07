module.exports = class stringfyMR {
    constructor(args){
        this.total = 0
        this.string = ``
        this.args = args
        console.log(args)
    
    this.dcFacade = function(roll, mod){
        console.log(this.args)
        if(this.args.hasOwnProperty(`dc`)){
            switch(this.args.crit){
                case 0:
                    this.string += ` ` + rawdc(roll, mod, this.args.dc)
                case 1:
                    this.string += ` ` + simpledc(roll, mod, this.args.dc)
                case 1:
                    this.string += ` ` + variantdc(roll, mod, this.args.dc)
            }
        } else {
            if(this.args.crit != 0)
                this.string += ` ` + simpledc(roll, mod)
        }
    }
    }

    addLine(roll, mod){
        this.total += roll + mod
        this.string += `**${roll + mod}** ← \`${roll}\` + \`${mod}\``
        this.dcFacade(roll, mod)
    }

    addLineAdvgDvdg(roll1, roll2, mod, advg){ //false == advg, true == advg
        this.string = `\`\n`
        let used
        let discarded
        if(advg){
            used = Math.max(roll1, roll2)
            discarded = Math.min(roll1, roll2)
        } else {
            used = Math.min(roll1, roll2)
            discarded = Math.max(roll1, roll2)
        }
        this.total += used + mod
        this.string += `**${used + mod}** ← \`${used}\`, ~~\`${discarded}\`~~`
        dcFacade(used, mod)
    }
    finalize(){
        console.log(this.args)
        console.log(this.total)
        return `total: \`${this.total}\`, ${this.args.cmd} \n` + this.string
        //might aswell delete the object after calling this function
    }

}
function rawdc(roll, mod, target){
    if((roll + mod) >= target)
        return `Success!`
    else 
        return `Failure!`
}


function simpledc(roll, mod, target){
    if(roll == 1)
        return `**Critical Failure!**`
    if(roll == 20)
        return `**Critical Success**`
    if(!target) //optional parameter
            return ``
    return rawdc(roll, mod, target)
}
    
function variantdc(roll, mod, target){
    let successDegree = 0 
    //-1 or less == crit fail, 0 == no crits (normal failure/success), 1 or more == crit success
    if(roll == 1) 
        successDegree += -1
    else if (roll == 20) 
        successDegree += 1
       
    if(roll + mod >= target + 10)
        successDegree += 1
    else if (roll + mod < target - 10)
        successDegree += -1
        
    
    if(roll + mod > target){
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
