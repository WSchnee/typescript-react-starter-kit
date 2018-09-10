import { Action } from '../actions'

export interface CFunctions {
    roll_dice: () => number
}

export interface State {
    initialized: boolean,
    functions: CFunctions,
    number: number
}

const DEFAULT_STATE: State = {
    initialized: false,
    functions: {
        roll_dice: () => -1
    },
    number: 0
}

export default function crand (state: State = DEFAULT_STATE, action: Action) {
    switch (action.type) {
        case 'INIT_WASM':
            return {
                ...state,
                initialized: true,
                functions: {
                    ...action.payload
                }
            }
        case 'GET_RANDOM':
            return {
                ...state,
                number: state.functions.roll_dice()
            }
        default:
            return state
    }
}
