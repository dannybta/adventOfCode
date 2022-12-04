async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}
async function runChallenge() {
    const text = await readFile()
    const arrayGames = text.split('\n')

    const gameCombinationScore = new Map()

    gameCombinationScore.set('B X', 1)
    gameCombinationScore.set('C Y', 2)
    gameCombinationScore.set('A Z', 3)

    gameCombinationScore.set('A X', 4)
    gameCombinationScore.set('B Y', 5)
    gameCombinationScore.set('C Z', 6)

    gameCombinationScore.set('C X', 7)
    gameCombinationScore.set('A Y', 8)
    gameCombinationScore.set('B Z', 9)

    const totalScore = arrayGames.map((game) => gameCombinationScore.get(game)).reduce((total, currentGame) => total + currentGame)

    document.getElementById("answer1").innerHTML = totalScore

    const combinationResultsScore = new Map()


    combinationResultsScore.set('X', { result: 'lose', maxScore: 3, combinations: ['B X', 'C Y', 'A Z'] })
    combinationResultsScore.set('Y', { result: 'draw', maxScore: 6, combinations: ['A X', 'B Y', 'C Z'] })
    combinationResultsScore.set('Z', { result: 'win', maxScore: 9, combinations: ['C X', 'A Y', 'B Z'] })
    const newGamesScores = arrayGames.map((game) => {
        let oponent = game[0]
        let expectedResult = game[2]

        let expectedCombination = combinationResultsScore.get(expectedResult).combinations.filter((combination) => combination[0] === oponent)[0]

        let score = gameCombinationScore.get(expectedCombination)
        return score
    })

    const newTotalScore = newGamesScores.reduce((total, currentGame) => total + currentGame)

    document.getElementById("answer2").innerHTML = newTotalScore


}