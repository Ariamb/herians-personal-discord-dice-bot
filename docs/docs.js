
const docs = `` +
`to roll a dice, use: /r [amount]d[dice size]+[modifier], without the brackets. This roll will sum all the dice and add the modifier in the end. \n` +
`To roll multiple dice, use /mr [amound]d[dice size]+[modifier], without the brackets. This roll will individually roll and add the modifier to each dice. \n` +
`After the command, you can type "vg" to roll with advantage, or "dg" to roll with disadvantage. "vg" will reroll the dice and pick the bigger result, while dg will reroll the dice and pick the smaller result. \n` +
`After setting advantage/disavantage, you can also set a target value that the roll must overcome for a success, by adding dc [target], without the brackets, to the command. \n` +
`Roll examples: \n`+
`/mr 1d20+2 vg dc 14\n` +
`/mr 2d6`


module.exports = docs