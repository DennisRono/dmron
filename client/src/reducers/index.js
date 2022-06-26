import login from './isLogged'
import acchat from './activechat'
import {combineReducers} from 'redux'

const allreducers = combineReducers({
    logged: login,
    active: acchat
})

export default allreducers;