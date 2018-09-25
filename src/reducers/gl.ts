import RenderPipeline from 'classes/RenderPipeline'
import { Action } from '../actions'

export interface State {
    initialized: boolean
    pipeline: RenderPipeline | undefined
    objectScale: number | ''
}

const DEFAULT_STATE: State = {
    initialized: false,
    objectScale: '',
    pipeline: undefined
}

const onInitCanvas = (state: State): State => {
    return {
        ...state,
        initialized: !state.initialized
    }
}

const onRegisterPipeline = (state: State, payload: RenderPipeline): State => {
    return {
        ...state,
        objectScale: payload.getScale(),
        pipeline: payload
    }
}

const onChangeObjectScale = (state: State, payload: number | ''): State => {
    if (payload) state.pipeline!.setScale(payload)
    return {
        ...state,
        objectScale: payload
    }
}

export default function gl (state: State = DEFAULT_STATE, action: Action): State {
    switch (action.type) {
        case 'INIT_GL_CANVAS': return onInitCanvas(state)
        case 'GL_REGISTER_PIPELINE': return onRegisterPipeline(state, action.payload)
        case 'GL_CHANGE_OBJECT_SCALE': return onChangeObjectScale(state, action.payload)
        default:
            return state
    }
}
