const login = (state = false, action) => {
    switch(action.type){
        case 'LOGIN':
            return true;
        default:
            return state;
    }
}

const logout = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return false;
        default:
            return state;
    }
}