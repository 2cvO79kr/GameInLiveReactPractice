import React, { useReducer } from 'react'
import panelReducer, { disableBtnAC, inputParamCountAC, inputParamMAC, inputParamNAC, startGameAC } from '../../redux/panelReducer'
import style from './Panel.module.css'

const Panel = () => {

    let defaultState = {
        world: [],
        n: '',
        m: '',
        count: ''
    }
    const createArea = (n, m) => {
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

    const slibingTorCheck = (i, j, arr) => {
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

    const slibingTorCheckTwo = (i, j, arr, m, n) => {
        let count = 0
        for (let x = i - 1; x < i + 2; x++) {
            for (let y = j - 1; y < j + 2; y++) {
                if ((x > 0 && x < m) && (y > 0 && y < n) && !(x == i && y == j)) {
                    count += 1
                }
            }
        }
        return count
    }

    const gameInLiveOneCicle = (world) => {
        let m = world.length
        let n = world[0].length
        let newWorld = []
        for (let i = 0; i < m; i++) {
            let piece = []
            for (let j = 0; j < n; j++) {
                let resCount = n > 2 && m > 2 ? slibingTorCheck(i, j, world, m, n) : slibingTorCheckTwo(i, j, world)
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

    const gameInLive = (n, m, count) => {

        let array = createArea(n, m)
        let mapCheck = setInterval(() => {

            dispatch(startGameAC(array))
            array = gameInLiveOneCicle(array)
            if (count == 1) {
                clearInterval(mapCheck);
            }
            count--;
        }, 1000);

        console.log(state)
    }


    const [state, dispatch] = useReducer(panelReducer, defaultState)

    const inputParamM = (event) => {
        let text = event.currentTarget.value
        dispatch(inputParamMAC(text))
    }
    const inputParamN = (event) => {
        let text = event.currentTarget.value
        dispatch(inputParamNAC(text))
    }
    const inputParamCount = (event) => {
        let text = event.currentTarget.value
        dispatch(inputParamCountAC(text))
    }

    const startGame = () => {
        gameInLive(+state.n, +state.m, +state.count)
    }
    let size = document.documentElement.clientHeight
    let cellHeight = size / state.n


    return (
        <div className={style.panelContainer}>
            <div className={style.param}>
                Width <input type='text' onChange={inputParamM} value={state.m} />
                Height <input type='text' onChange={inputParamN} value={state.n} />
                Generation <input type='text' onChange={inputParamCount} value={state.count} />
                {state.n != '' && state.m != '' && state.count != '' ? <button onClick={startGame}>Start</button> : <button disabled>Enter parametrs</button>}
            </div>
            <div>
                <table>
                    {
                        state.world.map(row => {
                            return <tr>{row.map(item => {
                                return <td className={item ? style.live : style.dead}
                                    style={{
                                        width: cellHeight,
                                        height: cellHeight,
                                    }} > </td>
                            })}</tr>
                        })
                    }
                </table>


            </div>
        </div>
    )
}


export default Panel