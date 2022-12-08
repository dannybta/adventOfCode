async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}

async function runChallenge() {
    const text = await readFile()
    let answer1
    let DISTINCT_CHARACTERS_NUM = 4
    for (let i = 0; i < text.length; i++) {
        let packet = text.slice(i, i + DISTINCT_CHARACTERS_NUM)
        let uniques = new Set(packet)
        if (uniques.size == DISTINCT_CHARACTERS_NUM) {
            answer1 = i + DISTINCT_CHARACTERS_NUM
            break
        }
    }
    document.getElementById("answer1").innerHTML = answer1
    let answer2
    DISTINCT_CHARACTERS_NUM = 14
    for (let i = 0; i < text.length; i++) {
        let packet = text.slice(i, i + DISTINCT_CHARACTERS_NUM)
        let uniques = new Set(packet)
        if (uniques.size == DISTINCT_CHARACTERS_NUM) {
            answer2 = i + DISTINCT_CHARACTERS_NUM
            break
        }
    }
    document.getElementById("answer2").innerHTML = answer2

}