const regexes = require('./regexes')
module.exports = {
    
    diceparser: function(roll){
        const rollargs = {}
        rollargs.cmd = roll

        if(roll.includes('vg')){
            rollargs.vg = 1
            //roll.replace('vg', '')
        }
        else if (roll.includes('dg')){
            rollargs.vg = 2
            //roll.replace('dg', '')
        } else rollargs.vg = 0
        
        const dc = rollargs.cmd.match(regexes.dcRegex)
        if(dc != null)
            rollargs.dc = parseInt(dc.groups.dc)
        
        rollargs.math = rollargs.cmd.match(regexes.mathRegex).groups.math
        const amount = rollargs.cmd.match(regexes.amountRegex)
        rollargs.amount = amount != null ? parseInt(amount.groups.amount) : 1
        rollargs.crit = -1
        //no crits... for now.
        //if(rollargs.dicesize === 20 || rollargs.dicesize === 100){
        //    rollargs.crit = 0   
        //}

        rollargs.failureCritRange = 0
        rollargs.successCritRange = 0
        return rollargs
    }
}