import React from 'react'
import Crand from './Crand'

type Props = {}

class Home extends React.Component<Props> {

    public render (): JSX.Element {
        return (<div>
            <h1>Hello world test123</h1>
            <Crand />
        </div>)
    }
}

export default Home
