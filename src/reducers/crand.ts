import { Action } from '../actions'

export interface CFunctions {
    initialized: boolean,
    getRandom: () => any
}

export interface State {
    cfuncs: CFunctions,
    number: number
}

const DEFAULT_STATE: State = {
    cfuncs: {
        initialized: false,
        getRandom: () => -1
    },
    number: 0
}

export default function crand (state: State = DEFAULT_STATE, action: Action) {
    switch (action.type) {
        case 'INIT_WASM':
            return {
                ...state,
                cfuncs: action.payload
            }
        case 'GET_RANDOM':
            return {
                ...state,
                number: state.cfuncs.getRandom()
            }
        default:
            return state
    }
}
