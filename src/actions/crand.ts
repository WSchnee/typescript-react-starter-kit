import { createAction } from './actionCreator'

const CrandActions = {
    initWasm: createAction<'INIT_WASM', any>('INIT_WASM'),
    getRandom: createAction<'GET_RANDOM'>('GET_RANDOM')
}

export default CrandActions
