require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client()

const random = require('./helpers/random')
const { diceparser } = require('./helpers/parser')
const stringfyMR = require('./classes/stringfyMR')

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
            const reply = new stringfyMR(rollargs)

            while(rollargs.diceamount > 0){
                if(rollargs.vg === 1){
                    reply.addLineVgDg(random.randomInt(rollargs.dicesize), random.randomInt(rollargs.dicesize), true)
                } else if(rollargs.vg === 2) {
                    reply.addLineVgDg(random.randomInt(rollargs.dicesize), random.randomInt(rollargs.dicesize), false)
                } else {
                    reply.addLine(random.randomInt(rollargs.dicesize))
                }
                rollargs.diceamount--
            }
            msg.reply(reply.finalize())
            delete reply     
        } else {
            msg.reply('bad formatting')
        }
    }
    if(msg.content === '/help'){
        const help = `To roll a dice, use: /r [amount]d[dice size]+[modifier], without the brackets. \n` +
        msg.reply(help)
    }
})


client.login(process.env.BOT_TOKEN)