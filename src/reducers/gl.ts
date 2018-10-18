import RenderPipeline from 'classes/RenderPipeline'
import SimpleVec3, {Default as SimpleVec3Default, DefaultableSimpleVec3 } from 'types/SimpleVec3'
import { Action } from '../actions'

export interface State {
    initialized: boolean
    pipeline: RenderPipeline | undefined
    objectScale: number | ''
    maxObjectScale: number
    minObjectScale: number
    objectPosition: DefaultableSimpleVec3
}

const DEFAULT_STATE: State = {
    initialized: false,
    objectScale: '',
    maxObjectScale: 100,
    minObjectScale: 0,
    pipeline: undefined,
    objectPosition: SimpleVec3Default
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

const onChangeObjectScale = (state: State, scale: number | ''): State => {
    if (scale) {
        let fixedScale: number = scale
        if (fixedScale > state.maxObjectScale) { fixedScale = state.maxObjectScale }
        if (fixedScale < state.minObjectScale) { fixedScale = state.minObjectScale }
        state.pipeline!.setScale(fixedScale)
        return {
            ...state,
            objectScale: fixedScale
        }

    }
    return {
        ...state,
        objectScale: scale
    }
}

const onObjectChangePosition = (state: State, change: {angle: 'x' | 'y' | 'z', new: number | ''}): State => {
    const newPosition = {...state.objectPosition}
    newPosition[change.angle] = change.new
    if (change.new !== '') {
        // state.pipeline!.setPosition(newPosition as SimpleVec3)
    }
    return {
        ...state,
        objectPosition: newPosition
    }
}

const onObjectTranslatePosition = (state: State, change: {angle: 'x' | 'y' | 'z', new: number}): State => {
    const newPosition = {...state.objectPosition} as SimpleVec3
    newPosition[change.angle] = newPosition[change.angle] + change.new
    // state.pipeline!.setPosition(newPosition as SimpleVec3)
    return {
        ...state,
        objectPosition: newPosition
    }
}

export default function gl (state: State = DEFAULT_STATE, action: Action): State {
    switch (action.type) {
        case 'INIT_GL_CANVAS': return onInitCanvas(state)
        case 'GL_REGISTER_PIPELINE': return onRegisterPipeline(state, action.payload)
        case 'GL_CHANGE_OBJECT_SCALE': return onChangeObjectScale(state, action.payload)
        case 'GL_CHANGE_OBJECT_POSITION': return onObjectChangePosition(state, action.payload)
        case 'GL_TRANSLATE_OBJECT_POSITION': return onObjectTranslatePosition(state, action.payload)
        default:
            return state
    }
}
