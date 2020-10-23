export const POST_RESPONSE_MESSAGE = 'POST_RESPONSE_MESSAGE';
export const GET_RESPONSE_MESSAGE = 'GET_RESPONSE_MESSAGE';
export const CLEAR_REDUX_STATE = 'CLEAR_REDUX_STATE';

export const getErrorMessage = (msg) =>{
    return {
        type: POST_RESPONSE_MESSAGE,
        error: msg
    };
};

export const clearState = () => {
    return {
        type: CLEAR_REDUX_STATE,
    };
};

export const asyncClearState = () => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(clearState());
        }, 3000);
    }
};
