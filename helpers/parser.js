module.exports = {
    
    diceparser: function(roll){
        let advg = 0
        if(roll.includes('advg')){
            advg = 1
            roll.replace('advg', '')
        }
        else if (roll.includes('dsvg')){
            advg = 2
            roll.replace('dsvg', '')
        }
        let split = roll.split('d')
        const diceamount = parseInt(split[0])
        split = split[1].split('+')
        let dicemod = parseInt(split[1])
        if(isNaN(dicemod)) //ask forgiveness, not permission
            dicemod = 0
        dicesize = parseInt(split[0])
        return [diceamount, dicesize, dicemod, advg]
    },

    multirollformatting: function(total, dices, dicemod, cmd){
        let string = ``
        let subtotal = 0
        dices.forEach((element, index, array) => {
            let modsubstring = `\`\n`
            subtotal = element + dicemod + subtotal
            string += `**${element + dicemod}** ← \`${element}`
            if(dicemod != 0)
                modsubstring =` + ${dicemod}\`\n`
            string += modsubstring
        })
        return `total: \`${subtotal}\`, ${cmd} \n` + string
    }
}