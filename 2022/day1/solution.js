async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}
async function runChallenge() {

    const text = await readFile()
    const arrayTotalCalories = text.replaceAll('\n\n', ",").split(",")
        .map(food => food.split('\n')
            .reduce((a, b) => parseInt(a) + parseInt(b)))

    document.getElementById("answer1").innerHTML = Math.max(0, ...arrayTotalCalories)
    document.getElementById("answer2").innerHTML = arrayTotalCalories.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => parseInt(a) + parseInt(b))

}