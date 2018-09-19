// import Footer from 'components/Footer'
import ComponentWindow from 'components/ComponentWindow'
// import Navbar from 'components/Navbar'
import NotFound from 'components/NotFound'
import WindowEventListener from 'components/WindowEventListener'
import React from 'react'
import { Route, Switch } from 'react-router'

// import Version from 'components/Version'

import './App.scss'

const App: React.StatelessComponent = () => (
    <>
        <WindowEventListener />
        {/* <Navbar/> */}
        <main>
            <Switch>
                <Route exact path="/" component={ComponentWindow} />
                {/* <Route exact path="/version" component={Version} /> */}
                <Route component={NotFound}/>
            </Switch>
        </main>
        {/* <Footer /> */}
    </>
)

export default App
