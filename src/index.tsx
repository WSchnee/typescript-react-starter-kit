import React from 'react'
import ReactDOM from 'react-dom'

import 'styles/main.scss'

import Root from 'components/App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'

library.add(faExpand)
ReactDOM.render(
    <Root />,
    document.getElementById('root')
)
