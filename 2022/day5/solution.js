async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}

async function runChallenge() {
    const text = await readFile()
    const [rawStacks, rawInstructions] = text.split('\n\n')
    const horizontalStacks = rawStacks.split('\n')

    const stacks = []
    let stackIndex = 0
    for (let col = 1; col <= horizontalStacks[0].length - 1; col += 4) {
        stacks[stackIndex] = []
        for (let stackItem = 0; stackItem < horizontalStacks.length - 1; stackItem++) {
            const item = horizontalStacks[stackItem][col]
            if (item !== ' ') { stacks[stackIndex].push(item) }
        }
        stackIndex++
    }
    const stacksAnswer2 = [...JSON.parse(JSON.stringify(stacks))]
    const instructions = rawInstructions.split('\n')
    instructions.forEach((instruction) => {
        let moveqty = parseInt(instruction.match('(?<=move )(.*)(?= from)'))
        let originStack = parseInt(instruction.match('(?<=from )(.*)(?= to)'))
        let destinationStack = parseInt(instruction.match('(?<=to )(.*)$'))
        for (let i = 0; i < moveqty; i++) {
            stacks[destinationStack - 1].unshift(stacks[originStack - 1].shift())
        }

    })
    const answer1 = []
    stacks.forEach(stack => answer1.push(stack[0]))
    document.getElementById("answer1").innerHTML = answer1.join('')

    instructions.forEach((instruction) => {
        let moveqty = parseInt(instruction.match('(?<=move )(.*)(?= from)'))
        let originStack = parseInt(instruction.match('(?<=from )(.*)(?= to)'))
        let destinationStack = parseInt(instruction.match('(?<=to )(.*)$'))
        let moved = []
        for (let i = 0; i < moveqty; i++) {
            moved.push(stacksAnswer2[originStack - 1].shift())
        }
        let newdest = [...moved, ...stacksAnswer2[destinationStack - 1]]
        stacksAnswer2[destinationStack - 1] = newdest
    })
    const answer2 = []
    stacksAnswer2.forEach(stack => answer2.push(stack[0]))

    document.getElementById("answer2").innerHTML = answer2.join('')

}