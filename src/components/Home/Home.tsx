import React from 'react'
// import Crand from '../Crand'
import GlCanvas from '../GlCanvas'

type Props = {}

class Home extends React.Component<Props> {

    public render (): JSX.Element {
        return (<div>
            <GlCanvas width={640} height={480}/>
            {/* <Crand /> */}
        </div>)
    }
}

export default Home
