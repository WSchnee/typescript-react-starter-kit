import CrandActions from './crand'
import GlActions from './gl'
import DemoActions from './version'

export const Actions = {
    ...DemoActions,
    ...CrandActions,
    ...GlActions
}

export type Action = typeof Actions[keyof typeof Actions]
