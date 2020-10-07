import * as actionType from './actions';

const initialState = {
    responseMessage: ''
};

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionType.POST_RESPONSE_MESSAGE:
            const error = action.error;
            return {
                responseMessage: error
            }
        case actionType.CLEAR_REDUX_STATE:
            return {
                responseMessage: null
            }
        default:
            return state;
    }
};

export default reducer;