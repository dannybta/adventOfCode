async function readFile() {
    const input = await fetch('input.txt')
    const reader = input.body.getReader()
    const readUTF8 = await reader.read()
    return new TextDecoder("utf-8").decode(readUTF8.value).replaceAll('\r\n', '\n')
}
let answer1 = 0

function validateIfIsOpenDir(row) {
    return row.indexOf('$ cd ') === 0 && row.indexOf('$ cd ..') === -1
}
function validateIfIsCloseDir(row) {
    return row.indexOf('$ cd ..') === 0
}
function validateHasSize(row) {
    return row.match(/(^\d*)/)[0] !== '' ? row.match(/(^\d*)/)[0] : false
}
function getDirectoryNameAndLevel(row, directories, openDirectoriesLevel) {
    let rawName = row.slice(row.indexOf('cd ') + 3, row.length)
    let repeated = 0
    directories.forEach((size, dirName) => { if (dirName.split('-')[0] === rawName) { repeated++ } })
    let dirNameOfficial
    if (repeated > 0) {
        dirNameOfficial = rawName + '-' + repeated
    } else {
        dirNameOfficial = rawName
    }
    return {
        dirLevel: openDirectoriesLevel.size,
        dirName: dirNameOfficial
    }
}

function addSizeToAllOpenLevels(size, directories, openDirectoriesLevel) {
    openDirectoriesLevel.forEach((openDir) => { directories.set(openDir, directories.get(openDir) + size) })
}
function closeCurrentOpenDirectory(directories, openDirectoriesLevel) {

    let level = openDirectoriesLevel.size - 1
    let dirName = openDirectoriesLevel.get(level)
    let dirSize = directories.get(dirName)
    if (dirSize <= 100000) {
        answer1 += dirSize
    }
    openDirectoriesLevel.delete(level)

}
async function runChallenge() {
    const text = await readFile()
    const inputDirectories = text.split('\n')

    const directories = new Map()
    const openDirectoriesLevel = new Map()
    inputDirectories.forEach((row) => {
        let size = Number(validateHasSize(row))
        if (validateIfIsOpenDir(row)) {
            let { dirName, dirLevel } = getDirectoryNameAndLevel(row, directories, openDirectoriesLevel)
            openDirectoriesLevel.set(dirLevel, dirName)
            directories.set(dirName, 0)

        } else if (size) {
            addSizeToAllOpenLevels(size, directories, openDirectoriesLevel)
        } else if (validateIfIsCloseDir(row)) {
            closeCurrentOpenDirectory(directories, openDirectoriesLevel)
        }

    })


    document.getElementById("answer1").innerHTML = answer1
    const DISK_SPACE = 70000000
    const FREE_SPACE_REQUIRED = 30000000

    let currentFreeSpace = DISK_SPACE - directories.get('/')
    let spaceToBeFreed = Math.max(0, FREE_SPACE_REQUIRED - currentFreeSpace)
    let minSpace = directories.get('/')
    let minDir = '/'
    directories.forEach((size, dirName) => {
        if (minSpace > size && size >= spaceToBeFreed) {
            minSpace = size
            minDir = dirName
        }
    })


    document.getElementById("answer2").innerHTML = minSpace

}