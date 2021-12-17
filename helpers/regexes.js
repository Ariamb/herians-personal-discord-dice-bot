//Lets start with the DC.
//the DC will be separated, in it's own regex. If the DC is found, then it's removed from the string.
const dcRegex = /(dc(\ )*(?<dc>(\d)+))/
//This is meant to avoid confusion with the DC value 
const lookbehindDC = /(?<!(dc(\ )*(\d)*))/


//there's no need to use a regex for vg/dg. A simple "seek and destroy" in the string is more than enough.


//This regex accepts a roll or a integer. I've tried optimizing it to reduce backtracking...
const rollOrNumberRegex = /((d(\d)+)|(\d)+(d(\d)+)?)(\ )*/

//this regex accepts ONLY rolls.
const rollRegex = /(\d)*d(\d+)/g

//now, the subsequent rolls/modifiers. The subsequents have an operator before then.
const operatorsRegex = /(\+|\-|\*|\/)(\ )*/

const modifiersRegex = new RegExp(operatorsRegex.source + rollOrNumberRegex.source)


//using "2x" anywhere in the string will execute the command 2 times. When this is not present, will execute once
const amountRegex = /(?<amount>(\d)+)x/

const lookaheadAmount = /(?!(\d)*(\ )*x)/

const mathRegex = new RegExp(lookbehindDC.source + lookaheadAmount.source + '(\\ )*(?<math>' + rollOrNumberRegex.source + '(' + modifiersRegex.source+')*)(\\ )*')


module.exports = {mathRegex, dcRegex, amountRegex, rollRegex}


