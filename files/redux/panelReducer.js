let INPUT_VALUE_M = 'INPUT_VALUE_M'
let INPUT_VALUE_N = 'INPUT_VALUE_N'
let INPUT_VALUE_COUNT = 'INPUT_VALUE_COUNT'
let START_GAME = 'START_GAME'


const panelReducer = (state, action) => {
    switch (action.type) {
        case INPUT_VALUE_N: {
            return {
                ...state,
                n: /\D/.test(action.value) ? '' : action.value
            }
        }
        case INPUT_VALUE_M: {
            return {
                ...state,
                m: /\D/.test(action.value) ? '' : action.value
            }
        }
        case INPUT_VALUE_COUNT: {
            return {
                ...state,
                count: /\D/.test(action.value) ? '' : action.value
            }
        }
        case START_GAME: {
            return {
                ...state,
                world: action.arr
            }
        }
        default:
            return state
    }
}

export const inputParamMAC = (value) => {
    return {
        type: INPUT_VALUE_M,
        value
    }
}
export const inputParamNAC = (value) => {
    return {
        type: INPUT_VALUE_N,
        value
    }
}
export const inputParamCountAC = (value) => {
    return {
        type: INPUT_VALUE_COUNT,
        value
    }
}
export const startGameAC = (arr) => {
    return {
        type: START_GAME,
        arr
    }
}

export default panelReducer