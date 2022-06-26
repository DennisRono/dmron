const acchat = (state = {}, action) => {
    switch(action.type){
        case 'ACTIVE':
            return action.payload;
        default:
            return state;
    }
}

export default acchat