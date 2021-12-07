module.exports = {
    
    diceparser: function(roll){
        const rollargs = {}
        rollargs.cmd = roll
        if(roll.includes('advg')){
            rollargs.advg = 1
            roll.replace('advg', '')
        }
        else if (roll.includes('dsvg')){
            rollargs.advg = 2
            roll.replace('dsvg', '')
        }
        if(roll.includes('dc')){
            let split = roll.split('dc')
            rollargs.dc = parseInt(split[1])
            roll = split[0]
        }
        let split = roll.split('d')
        rollargs.diceamount = parseInt(split[0])
        split = split[1].split('+')
        rollargs.dicemod = parseInt(split[1])
        if(isNaN(rollargs.dicemod)) //ask forgiveness, not permission
            rollargs.dicemod = 0
        rollargs.dicesize = parseInt(split[0])
        return rollargs
    }
}