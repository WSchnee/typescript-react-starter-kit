import { Action } from '../actions'

export interface State {
    initialized: boolean
}

const DEFAULT_STATE: State = {
    initialized: false
}

const onInitCanvas = (state: State): State => {
    return {
        ...state,
        initialized: !state.initialized
    }
}

export default function crand (state: State = DEFAULT_STATE, action: Action): State {
    switch (action.type) {
        case 'INIT_GL_CANVAS': return onInitCanvas(state)
        default:
            return state
    }
}
