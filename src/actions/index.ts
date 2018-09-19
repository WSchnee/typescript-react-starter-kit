import CrandActions from './crand'
import GlActions from './gl'
import DemoActions from './version'
import WindowEventActions from './windowEvent'

export const Actions = {
    ...DemoActions,
    ...CrandActions,
    ...GlActions,
    ...WindowEventActions
}

export type Action = typeof Actions[keyof typeof Actions]
