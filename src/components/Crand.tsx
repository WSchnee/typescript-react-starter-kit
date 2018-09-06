import React from 'react'
import { connect } from 'react-redux'
import { Actions } from '../actions'
import { State } from '../reducers'
const wasm = require('../csource/test.cpp')

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

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class Crand extends React.Component<Props> {

    public componentWillMount () {
        wasm.init().then((module: any) => {
            this.props.initWasm({
                initialized: true,
                ...module.exports
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
