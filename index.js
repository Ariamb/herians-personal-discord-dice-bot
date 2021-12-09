require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client()

const random = require('./helpers/random')
const { diceparser } = require('./helpers/parser')
const Multi = require('./classes/Multi')
const docs = require('./docs/docs')
const regex = /^(\ )*(\d)*d(\d)+((\+|\-)(\d)+)?(\ )*(vg|dg)?((\ )*dc(\ )*(\d)+)?$/
//const regex = /(\ )*(\d)*d(\d)+((\+|\-)(\d)+)?(\ )*(advg|dsvg)?/


client.on('ready', () => {
    console.log('logged in as ' + client.user.tag)
})

client.on('message', msg => {
    
    if(msg.content.startsWith('/r')){
        
        const cmd = msg.content.replace('/r ', '')
        if(regex.test(cmd)){
            //TODO: simple rolls

        } else {
            msg.reply('bad formatting.')
        }
    }
    if(msg.content.startsWith('/mr')){
        let cmd = msg.content.replace('/mr ', '')
        if(regex.test(cmd)){
            const rollargs = diceparser(cmd) 
            const rollResult = new Multi(rollargs)
            if(rollResult.fitsReply()){
                while(rollargs.diceamount > 0){
                    if(rollargs.vg === 1){
                        rollResult.addLineVgDg(random.randomInt(rollargs.dicesize), random.randomInt(rollargs.dicesize), true)
                    } else if(rollargs.vg === 2) {
                        rollResult.addLineVgDg(random.randomInt(rollargs.dicesize), random.randomInt(rollargs.dicesize), false)
                    } else {
                        rollResult.addLine(random.randomInt(rollargs.dicesize))
                    }
                    rollargs.diceamount--
                }
                const final = rollResult.finalize()
                console.log(`real size: ${final.length}`)
                msg.reply(final)
            } else {
                msg.reply('The resulting roll is too big to be displayed.')
            }
            
            delete rollResult
        } else {
            msg.reply('bad formatting')
        }
    }
    if(msg.content === '/help'){
        msg.reply(docs)
    }
})


client.login(process.env.BOT_TOKEN)