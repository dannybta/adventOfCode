async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}
function calculatePriority(letter) {
    let priority = letter.toLowerCase() === letter ? letter.charCodeAt(0) - 96 : (letter.toLowerCase().charCodeAt(0) - 96) + 26
    return priority
}
async function runChallenge() {
    const text = await readFile()
    const ruckSacks = text.split('\n')
    const priorities = ruckSacks.map((ruckSack) => {
        const arrayRucksack = Array.from(ruckSack)
        let compartment1 = ruckSack.substring(0, ruckSack.length / 2)
        let compartment2 = ruckSack.substring(arrayRucksack.length / 2, arrayRucksack.length)
        let repeated = Array.from(compartment2).find((letter) => compartment1.includes(letter))
        return calculatePriority(repeated)
    })

    document.getElementById("answer1").innerHTML = priorities.reduce((cummulative, currentPriority) => cummulative + currentPriority)
    const badgeTypes = []
    for (let i = 0; i < ruckSacks.length - 2; i += 3) {
        let repeated1vs2vs3 = Array.from(ruckSacks[i]).find((letter) => ruckSacks[i + 1].includes(letter) && ruckSacks[i + 2].includes(letter))
        badgeTypes.push(repeated1vs2vs3)
    }
    const newPriorities = badgeTypes.map((type) => calculatePriority(type))
    document.getElementById("answer2").innerHTML = newPriorities.reduce((cummulative, currentPriority) => cummulative + currentPriority)


}