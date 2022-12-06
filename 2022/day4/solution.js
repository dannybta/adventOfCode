async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}

function isSubsetOfSet(A, B) {
    return A.lowerLimit >= B.lowerLimit && A.upperLimit <= B.upperLimit
}
function validateIntersectionBetweenSets(A, B) {
    let overlaps = false
    for (let i = A.lowerLimit; i <= A.upperLimit; i++) {
        if (i >= B.lowerLimit && i <= B.upperLimit) {
            overlaps = true
            break
        }
    }
    return overlaps
}
async function runChallenge() {
    const text = await readFile()
    const pairs = text.split('\n')

    document.getElementById("answer1").innerHTML = pairs.reduce((cummulative, pair) => {
        let [first, second] = pair.split(',')
        let A = {
            lowerLimit: Number(first.split('-')[0]),
            upperLimit: Number(first.split('-')[1])
        }
        let B = {
            lowerLimit: Number(second.split('-')[0]),
            upperLimit: Number(second.split('-')[1])
        }
        return cummulative += isSubsetOfSet(A, B) || isSubsetOfSet(B, A) ? 1 : 0
    }, 0)
    document.getElementById("answer2").innerHTML = pairs.reduce((cummulative, pair) => {
        let [first, second] = pair.split(',')
        let A = {
            lowerLimit: Number(first.split('-')[0]),
            upperLimit: Number(first.split('-')[1])
        }
        let B = {
            lowerLimit: Number(second.split('-')[0]),
            upperLimit: Number(second.split('-')[1])
        }
        let AintersectsB = validateIntersectionBetweenSets(A, B)
        let BintersectsA = false
        if (!AintersectsB) {
            BintersectsA = validateIntersectionBetweenSets(B, A)
        }
        return cummulative += AintersectsB || BintersectsA ? 1 : 0
    }, 0)


}