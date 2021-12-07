module.exports = {
    StringBuild: function(args){
    this.total = 0
    this.string = ``
    this.args = args
    
    function addLine(roll, mod){
        this.total += roll + mod
        this.string += `**${roll + mod}** ← \`${roll}`
        dcFacade(roll, mod)
    }

    function addLineAdvgDvdg(roll1, roll2, mod, advg){ //false == advg, true == advg
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
    function finalize(){
        return `total: \`${this.total}\`, ${this.args.cmd} \n` + this.string
        //might aswell delete the object after calling this function
    }
    function dcFacade(roll, mod){
        if(this.args.hasOwnProperty(`dc`)){
            critFacade(roll, mod)
        } else {
            this.string += ` ` + simpledc(roll, mod)
        }
    }

    function critFacade(roll, mod){
            switch(this.args.crit){
                case 0:
                    this.string += ` ` + rawdc(roll, mod)
                case 1:
                    this.string += ` ` + simpledc(roll, mod)
                case 1:
                    this.string += ` ` + variantdc(roll, mod)
            }
        }
}

}

function rawdc(roll, mod){
    if((roll + mod) >= this.args.dc){
        return `Success!`
    } else {
        return `Failure!`
    }
}

function simpledc(roll, mod){
    if(roll == 1){
        return `**Critical Failure!**`
    }
    if(roll == 20){
        return `**Critical Success**`
    }
    if(!this.args.dc) //optional parameter
        return
    return rawdc(roll, mod)
}

function variantdc(roll, mod){
    let successDegree = 0 
    //-1 or less == crit fail, 0 == no crits (normal failure/success), 1 or more == crit success
    if(roll == 1) 
        successDegree += -1
    else if (roll == 20) 
        successDegree += 1
    
    if(roll + mod >= this.args.dc + 10)
        successDegree += 1
    else if (roll + mod < this.args.dc - 10)
        successDegree += -1
    

    if(roll + mod > this.args.dc){
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

