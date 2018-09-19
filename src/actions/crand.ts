import { createAction } from './actionCreator'

const CrandActions = {
    initWasm: createAction<'INIT_WASM', any>('INIT_WASM'),
    getRandom: createAction<'GET_RANDOM'>('GET_RANDOM'),
    bufferArray: createAction<'WASM_BUFFER_ARRAY', Uint8Array>('WASM_BUFFER_ARRAY'),
    dropFiles: createAction<'DROP_FILES', any>('DROP_FILES')
}

export default CrandActions
