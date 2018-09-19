import { Action } from '../actions'

export interface State {
    width: number
    height: number
    isFullScreen: boolean
    fullscreenElement: HTMLElement
}

const getDimensions = (): {width: number, height: number} => {
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight) + 1
    }
}

const DEFAULT_STATE: State = {
    ...getDimensions(),
    isFullScreen: false,
    fullscreenElement: document.createElement('div')
}

const onKeyDown = (state: State, payload: KeyboardEvent): State => {
    console.log(payload)
    return {
        ...state
    }
}

const onWindowResize = (state: State): State => {
    return {
        ...state,
        ...getDimensions()
    }
}

const onWindowFullscreen = (state: State, payload: HTMLElement) => {
    const isFullScreen: boolean =
        document.fullscreenElement ? true : false ||
        document.webkitFullscreenElement ? true : false ||
        (document as any).mozFullScreenElement ? true : false ||
        (document as any).msFullscreenElement ? true : false

    const doc: {
        mozCancelFullScreen: () => void,
        msExitFullscreen: () => void
    } = document as any

    const element: {
        mozRequestFullScreen: () => void,
        msRequestFullscreen: () => void
    } = payload as any

    if (!isFullScreen) {
        if (payload.requestFullscreen) {
            payload.requestFullscreen()
        } else if (payload.webkitRequestFullscreen) {
            payload.webkitRequestFullscreen()
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        }
    }
    if (isFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen()
        }
    }
    return {
        ...state,
        isFullScreen: !isFullScreen
    }
}

const onWindowRegisterFullscreenElement = (state: State, payload: HTMLElement) => {
    return {
        ...state,
        fullscreenElement: payload
    }
}

export default function windowEvents (state: State = DEFAULT_STATE, action: Action): State {
    switch (action.type) {
        case 'WINDOW_KEY_DOWN_DISPATCH':
        case 'WINDOW_KEY_UP_DISPATCH':
        case 'WINDOW_KEY_PRESSED_DISPATCH':
            return onKeyDown(state, action.payload)
        case 'WINDOW_RESIZE':
            return onWindowResize(state)
        case 'WINDOW_FULLSCREEN':
            return onWindowFullscreen(state, action.payload)
        case 'WINDOW_REGISTER_FS_ELEMENT':
            return onWindowRegisterFullscreenElement(state, action.payload)
        default:
            return state

    }
}
