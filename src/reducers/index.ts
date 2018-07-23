import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import crand from './crand'
import version from './version'

export type State = ReturnType<typeof reducers>

const reducers = combineReducers({
    routing,
    version,
    crand
})

export default reducers
