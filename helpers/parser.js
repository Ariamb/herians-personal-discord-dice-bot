module.exports = {
    
    diceparser: function(roll){
        let split = roll.split('d')
        const diceamount = parseInt(split[0])
        split = split[1].split('+')
        let dicemod = parseInt(split[1])
        if(isNaN(dicemod)) //ask forgiveness, not permission
            dicemod = 0
        dicesize = parseInt(split[0])
        return [diceamount, dicesize, dicemod]
    },

    multirollformatting: function(total, dices, dicemod, cmd){
        let string = `total: \`${total}\`, ${cmd} \n`
        dices.forEach((element, index, array) => {
            modsubstring = `\`\n`
            string += `**${element + dicemod}** ← \`${element}`
            if(dicemod != 0)
                modsubstring =` + ${dicemod}\`\n`
            string += modsubstring
        })
        return string

    }
}