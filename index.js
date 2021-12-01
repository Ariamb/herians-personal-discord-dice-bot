require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client()

const Regex = require('regex')
const rolls = require('./dice rolls/dice')
const parser = require('./helpers/parser')

const regex = /(\ )*(\d)*d(\d)+((\+|\-)(\d)+)?(\ )*/



client.on('ready', () => {
    console.log('logged in as ' + client.user.tag)
})


client.on('message', msg => {
    if(msg.content.startsWith('/r')){
        let cmd = msg.content.replace('/r ', '')
        if(regex.test(cmd)){
            const result = rolls.simpleroll(cmd)
            const finalstring = `**_${result[0]}_** ← \`[${result[1]}]\` ${cmd}`
            msg.reply(finalstring) 
        } else {
            msg.reply('bad formatting')
        }
    }
    if(msg.content.startsWith('/mr')){
        let cmd = msg.content.replace('/mr ', '')
        if(regex.test(cmd)){
            const[total, dices, dicemod] = rolls.multiroll(cmd)
            msg.reply(parser.multirollformatting(total, dices, dicemod, cmd))
        } else {
            msg.reply('bad formatting')
        }
    }
    if(msg.content === '/help'){
        const help = `To roll a dice, use: /r [amount]d[dice size]+[modifier], without the brackets. \n` +
        `In case it wasn't helpful enough, refer to the regular expression: \`\`\`/(\\ )*(\\d)*d(\\d)+((\\+|\\-)(\\d)+)?(\\ )*/\`\`\``
        msg.reply(help)
    }
})

//client.once('ready', () => {
//    console.log('Bot running')
//})

client.login(process.env.BOT_TOKEN)