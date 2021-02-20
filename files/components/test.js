function createArea(m, n) {
    let result = []
    for (let i = 0; i < n; i++) {
        let temp = []
        for (let j = 0; j < m; j++) {
            let item = Math.floor(Math.random() * 2)
            temp.push(item)
        }
        result.push(temp)
    }
    return result
}

function slibingTorCheck(i, j, arr) {
    let count = 0
    let iTempM = i - 1
    let iTempP = i + 1
    let jTempM = j - 1
    let jTempP = j + 1
    if (iTempM < 0) { iTempM = arr.length - 1 }
    if (jTempM < 0) { jTempM = arr.length - 1 }
    if (iTempP == arr.length) { iTempP = 0 }
    if (jTempP == arr.length) { jTempP = 0 }

    if (arr[i][jTempP] == 1) { count += 1 }
    if (arr[i][jTempM] == 1) { count += 1 }
    if (arr[iTempP][j] == 1) { count += 1 }
    if (arr[iTempM][j] == 1) { count += 1 }
    if (arr[iTempP][jTempM] == 1) { count += 1 }
    if (arr[iTempP][jTempP] == 1) { count += 1 }
    if (arr[iTempM][jTempP] == 1) { count += 1 }
    if (arr[iTempM][jTempM] == 1) { count += 1 }

    return count
}

function gameInLiveOneCicle(world) {
    let m = world.length
    let n = world[0].length
    let newWorld = []
    for (let i = 0; i < m; i++) {
        let piece = []
        for (let j = 0; j < n; j++) {
            let resCount = slibingTorCheck(i, j, world)
            if (world[i][j]) {
                if (resCount > 1 && resCount < 4) {
                    piece.push(1)
                } else {
                    piece.push(0)
                }
            } else {
                if (resCount == 3) {
                    piece.push(1)
                } else {
                    piece.push(0)
                }
            }
        }
        newWorld.push(piece)
    }
    return newWorld
}



function gameInLive(n, m, count) {
    let arr = createArea(n, m)
    let mapCheck = setInterval(() => {
        let nextArr = gameInLiveOneCicle(arr, count)
        arr = [...nextArr]
        console.log(arr, count)
        if (count > 0) {
            clearInterval(mapCheck);
        }
        count--;
    }, 1000);
}
