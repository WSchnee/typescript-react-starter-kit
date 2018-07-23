import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import { Actions } from '../actions'
import { State } from '../reducers'
import { CFunctions } from '../reducers/crand'
const wasm = require('../csource/test.c')

const mapStateToProps = (state: State): {
    cfuncs: CFunctions,
    number: number
} => ({
    cfuncs: state.crand.cfuncs,
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
        this.props.initWasm(wasm)
        wasm.initialize().then((module: any) => {
            this.props.initWasm({
                initialized: true,
                getRandom: module._roll_dice
            })
        })
    }

    render () {
        return (
            this.props.cfuncs ? (
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
