import { put, takeEvery  } from 'redux-saga/effects'

import { Actions } from 'actions'

export default function * watchConnects () {
    yield takeEvery('WINDOW_KEY_DOWN', dispatchKeyDown)
    yield takeEvery('WINDOW_KEY_UP', dispatchKeyUp)
    yield takeEvery('WINDOW_KEY_PRESSED', dispatchKeyPressed)
}

function* dispatchKeyDown (action: typeof Actions.keyDown) {
    yield put(Actions.DispatchKeyDown(action.payload))
}

function* dispatchKeyUp (action: typeof Actions.keyUp) {
    yield put(Actions.DispatchKeyUp(action.payload))
}

function* dispatchKeyPressed (action: typeof Actions.keyPressed) {
    yield put(Actions.DispatchKeyPressed(action.payload))
}
