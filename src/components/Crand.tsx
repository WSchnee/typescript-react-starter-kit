import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import { Actions } from '../actions'
import { State } from '../reducers'
const wasm = require('../csource/test.c')

const mapStateToProps = (state: State): {
    initialized: boolean,
    number: number
} => ({
    initialized: state.crand.initialized,
    number: state.crand.number
})

const dispatchToProps = {
    initWasm: Actions.initWasm,
    getRandom: Actions.getRandom
}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps

class Crand extends React.Component<Props> {

    public componentWillMount () {
        wasm.initialize().then((module: any) => {
            const funcs = Object.keys(module).filter(name => name.startsWith('_') && name !== '_main')
            const actualFuncs: any = {}
            funcs.forEach(funcName => actualFuncs[funcName.slice(1, funcName.length)] = module[funcName])
            this.props.initWasm({
                initialized: true,
                ...actualFuncs
            })
        })
    }

    render () {
        return (
            this.props.initialized ? (
            <div>
                <h1>
                    Dice output: {this.props.number}
                </h1>
                <button
                    type="button"
                    onClick={() => this.props.getRandom()}>Throw die!
                </button>
            </div>
            ) :
            <h1>
                WASM not loaded
            </h1>
        )
    }
}

export default connect(
    mapStateToProps,
    dispatchToProps
)(Crand)
