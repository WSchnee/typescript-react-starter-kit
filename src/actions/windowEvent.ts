import { createAction } from './actionCreator'

const WindowEventActions = {
    keyDown:                    createAction<'WINDOW_KEY_DOWN', KeyboardEvent>('WINDOW_KEY_DOWN'),
    keyUp:                      createAction<'WINDOW_KEY_UP', KeyboardEvent>('WINDOW_KEY_UP'),
    keyPressed:                 createAction<'WINDOW_KEY_PRESSED', KeyboardEvent>('WINDOW_KEY_PRESSED'),
    DispatchKeyDown:            createAction<'WINDOW_KEY_DOWN_DISPATCH', KeyboardEvent>('WINDOW_KEY_DOWN_DISPATCH'),
    DispatchKeyUp:              createAction<'WINDOW_KEY_UP_DISPATCH', KeyboardEvent>('WINDOW_KEY_UP_DISPATCH'),
    DispatchKeyPressed:         createAction<'WINDOW_KEY_PRESSED_DISPATCH', KeyboardEvent>('WINDOW_KEY_PRESSED_DISPATCH'),
    RegisterFullscreenElement:  createAction<'WINDOW_REGISTER_FS_ELEMENT', HTMLElement>('WINDOW_REGISTER_FS_ELEMENT'),
    WindowResized:              createAction<'WINDOW_RESIZE'>('WINDOW_RESIZE'),
    WindowFullscreen:           createAction<'WINDOW_FULLSCREEN', HTMLElement>('WINDOW_FULLSCREEN')
}

export default WindowEventActions
