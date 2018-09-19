import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import gl from './gl'
import version from './version'
import wasm from './wasm'
import windowEvents from './windowEvents'

export type State = ReturnType<typeof reducers>

const reducers = combineReducers({
    routing,
    version,
    wasm,
    gl,
    windowEvents
})

export default reducers
