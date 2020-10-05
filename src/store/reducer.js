import * as actionType from './actions';

const initialState = {
    resError: ''
};

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionType.GET_ERROR_MESSAGE:
            const error = action.error;
            return {
                //...state,
                resError: error
            }
        default:
            return state;
    }
};

export default reducer;