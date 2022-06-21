import login from './isLogged'
import {combineReducers} from 'redux'

const allreducers = combineReducers({
    isLogged: login
})

export default allreducers;