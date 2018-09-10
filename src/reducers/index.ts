import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import gl from './gl'
import version from './version'
import wasm from './wasm'

export type State = ReturnType<typeof reducers>

const reducers = combineReducers({
    routing,
    version,
    wasm,
    gl
})

export default reducers
