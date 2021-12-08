module.exports = {
    
    diceparser: function(roll){
        const rollargs = {}
        rollargs.cmd = roll
        
        if(roll.includes('vg')){
            rollargs.vg = 1
            roll.replace('vg', '')
        }
        else if (roll.includes('dg')){
            rollargs.vg = 2
            roll.replace('dg', '')
        } else rollargs.vg = 0
        if(roll.includes('dc')){
            let split = roll.split('dc')
            rollargs.dc = parseInt(split[1])
            roll = split[0]
        }
        let split = roll.split('d')
        rollargs.diceamount = parseInt(split[0])
        rollargs.dicemod = 0
        if(split[1].includes('-')){
            split = split[1].split('-')
            rollargs.dicemod = -1 * parseInt(split[1])
        } else if (split[1].includes('+')) {
            split = split[1].split('+')
            rollargs.dicemod = parseInt(split[1])
        }
        rollargs.dicesize = parseInt(split[1])
        rollargs.crit = -1
        if(rollargs.dicesize === 20 || rollargs.dicesize === 100){
            rollargs.crit = 0   
        }

        rollargs.failureCritRange = 1
        rollargs.successCritRange = rollargs.dicesize
        return rollargs
    }
}