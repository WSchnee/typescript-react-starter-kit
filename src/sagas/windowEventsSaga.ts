import { put, takeEvery  } from 'redux-saga/effects'

import { Actions } from 'actions'

export default function * watchConnects () {
    yield takeEvery('WINDOW_KEY_DOWN', dispatchKeyDown)
    yield takeEvery('WINDOW_KEY_UP', dispatchKeyUp)
    yield takeEvery('WINDOW_KEY_PRESSED', dispatchKeyPressed)
}

function* dispatchKeyDown (action: typeof Actions.keyDown) {
    switch (action.payload.key) {
        case 'ArrowDown':
        case 'Down':
            yield put(Actions.translateObjectPosition({angle: 'y', new: -0.05}))
            break
        case 'ArrowUp':
        case 'Up':
            yield put(Actions.translateObjectPosition({angle: 'y', new: 0.05}))
            break
        case 'ArrowRight':
        case 'Right':
            yield put(Actions.translateObjectPosition({angle: 'x', new: 0.05}))
            break
        case 'ArrowLeft':
        case 'Left':
            yield put(Actions.translateObjectPosition({angle: 'x', new: -0.05}))
            break
    }
    yield put(Actions.DispatchKeyDown(action.payload))
}

function* dispatchKeyUp (action: typeof Actions.keyUp) {
    yield put(Actions.DispatchKeyUp(action.payload))
}

function* dispatchKeyPressed (action: typeof Actions.keyPressed) {
    yield put(Actions.DispatchKeyPressed(action.payload))
}
