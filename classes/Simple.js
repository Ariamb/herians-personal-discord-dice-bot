const Roll = require("./Roll")
const { rollRegex } = require('./../helpers/regexes')
const { randomInt }  = require('./../helpers/random')
const Parser = require('expr-eval').Parser

module.exports = class Simple extends Roll{
    
    generateReply(){
        let varcount = 0
        console.log(this.args)
        
        const dict = []
        while(this.args.amount >= 1){
            this.args.amount--
            const matches = this.args.math.match(rollRegex)

            for(let i = 0, j = matches.length; i < j; i++){
                const diceArgs = matches[i].split('d')
                if(diceArgs[0] == '')
                    diceArgs[0] = 1
                
                const varname = 'x' + varcount
                varcount++ 
                this.args.math = this.args.math.replace(matches[i], varname)
                dict.push({
                    varname: varname,
                    varvalue: matches[i],
                    diceamount: parseInt(diceArgs[0]),
                    dicesize: parseInt(diceArgs[1])
                })
            }
            console.log(this.args.math)
        }
        console.log(dict)
        for(let i = 0, j = dict.length; i < j; i++){
            let subtotalString = `(`
            while(dict[i].diceamount >= 1){
                dict[i].diceamount--
                let roll = randomInt(dict[i].dicesize)
                subtotalString += `${roll}`
                //this.string += `${roll} `
                if(dict[i].diceamount >= 1){
                    subtotalString += `+`
                }
            }
            subtotalString += `)`
            this.args.math = this.args.math.replace(dict[i].varname, subtotalString)
        }


        const parser = new Parser()
        console.log(this.args.math)
        let expr = parser.parse(this.args.math)
        console.log(expr.evaluate({}))
        //console.log(this.string)
        
        

        /*
        { //simple roll math must be replaced
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




        /*
        switch(this.args.vg){
            case 0:
                let partialString = ``
                while(this.args.diceamount > 0){
                    this.args.diceamount--
                    const roll = randomInt(this.args.dicesize)
                    this.total += roll 
                    if(this.args.diceamount === 0)
                        partialString += `\`${roll}\``
                    else 
                        partialString += `\`${roll}\` ${this.args.diceop} `
                }
                if(this.args.operator !== ''){
                    this.total = this.constructor.operation(this.total, this.args.dicemod, this.args.diceop)
                }
                this.string += `**${this.total}** ← ${partialString}`
                if(this.args.diceop === '*')
                    this.string += `\\${this.args.diceop}` 
                else
                this.string += `${this.args.diceop}` 
                if(this.args.dicemod !== 0)
                        this.string += `\`${this.args.dicemod}\``
                super.dcFacade(this.total, this.args.dicemod)

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
        const finalString = `total: \`${this.total}\`, ${this.args.cmd} \n` + this.string
     
        if(finalString.length >= 1600)  //leaving a big slack
            return `The resulting roll is too big to be displayed.`
        console.log('final roll length:', finalString.length)
        return finalString
        //delete object after the return   
           */
        
    }

}