require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client()

const { diceparser } = require('./helpers/parser')
const Simple = require('./classes/Simple')
const docs = require('./docs/docs')
const Parser = require('expr-eval').Parser;


const regexes  = require('./helpers/regexes')
const parser = new Parser();


/*
let command = 'dg dc 15 1d20+1d4'
console.log('final regex:', regexes.source)
console.log(regexes.test(command))
const matches = command.match(regexes)
console.log(matches)
command = command.replace(matches)
console.log('cmd after rplc ' + command)
*/
//const regex = /(\ )*(\d)*d(\d)+((\+|\-)(\d)+)?(\ )*(advg|dsvg)?/


/*
let steele = '2d20 + 2d20 + 2 * 3'
steele = steele.replace('2d20', 'x1')
let dict = []
dict.push({
    varname: 'x1',
    varvalue: '2d20'    
})
steele = steele.replace('2d20', 'x2')
dict.push({
    varname: 'x2',
    varvalue: '2d20'
})
dict[0].varvalue = 10
dict[1].varvalue = 20
console.log(dict)
console.log(steele)
let expr = parser.parse(steele)
const evaluationValues = []
for(i = 0, l = dict.length; i < l; i++){
    evaluationValues[`${dict[i].varname}`] = dict[i].varvalue
}
console.log('evaluation values', evaluationValues)

  
console.log('evaluation:', expr.evaluate(evaluationValues)); // 7
*/


client.on('ready', () => {
    console.log('logged in as ' + client.user.tag)
})

client.on('message', msg => {
    
    if(msg.content.startsWith('/r')){
        const cmd = msg.content.replace('/r ', '')
        if(regexes.mathRegex.test(cmd)){
            const rollargs = diceparser(cmd) 
            const rollResult = new Simple(rollargs)
            rollResult.generateReply()
            //msg.reply(rollResult.generateReply())
            delete rollResult
        } else {
            msg.reply('bad formatting.')
        }
    }
    if(msg.content === '/help'){
        msg.reply(docs)
    }
})


client.login(process.env.BOT_TOKEN)