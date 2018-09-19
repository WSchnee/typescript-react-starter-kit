import { Action } from '../actions'

export interface CFunctions {
    roll_dice: () => number
    getC: (ptr: any) => number
}

export interface State {
    initialized: boolean,
    functions: CFunctions,
    number: number
    memoryManager: any
    memory: any
}

const DEFAULT_STATE: State = {
    initialized: false,
    functions: {
        roll_dice: () => -1,
        getC: (ptr: 0) => -1
    },
    number: 0,
    memoryManager: undefined,
    memory: undefined
}

export default function crand (state: State = DEFAULT_STATE, action: Action) {
    switch (action.type) {
        case 'INIT_WASM':
            // console.log(action.payload)
            const pseudoState: State = {
                ...state,
                initialized: true,
                memoryManager: action.payload.module.memoryManager,
                memory: action.payload.module.memoryManager.malloc(50),
                functions: {
                    ...(action.payload.module.exports)
                }
            }
            pseudoState.memoryManager.set(pseudoState.memory[0], 5000)
            console.log(pseudoState.memoryManager.get(pseudoState.memory[0]))
            console.log(pseudoState.functions.getC(pseudoState.memory[0]))
            return pseudoState
        case 'GET_RANDOM':
            return {
                ...state,
                number: state.functions.roll_dice()
            }
        case 'DROP_FILES':
            // console.log(action.payload)
            const file: File = action.payload
            console.log(file)
            const reader: FileReader = new FileReader()
            reader.addEventListener('load', () => {
                const buffer: ArrayBuffer = reader.result as ArrayBuffer || new Uint8Array()
                const arr = new Uint8Array(buffer)
                const startPos: Uint32Array = new Uint32Array(arr.buffer.slice(10, 14))
                console.log(startPos[0])

                console.log(arr)
                const widthBytes: Uint32Array = new Uint32Array(arr.buffer.slice(18, 22))
                console.log(widthBytes[0])
                const heightBytes: Uint32Array = new Uint32Array(arr.buffer.slice(22, 26))
                console.log(heightBytes[0])
                const bitsPerPixel: Uint16Array = new Uint16Array(arr.buffer.slice(28, 32))
                console.log(bitsPerPixel[0])
                const nPixels = widthBytes[0] * heightBytes[0]
                console.log(nPixels)
                const pixels: Uint16Array = new Uint16Array(arr.buffer.slice(startPos[0], startPos[0] + nPixels))
                console.log(pixels)
            })
            reader.readAsArrayBuffer(file)
            return {
                ...state
            }
        default:
            return state
    }
}
