import { SET_TAB_SELECTED, SET_SESSION_LOGGED } from './actions';

const initialState = {
    tabSelected: "home",
    session_logged: true,
}

const useReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TAB_SELECTED:
            return { ...state, tabSelected: action.payload };
        case SET_SESSION_LOGGED:
            return { ...state, session_logged: action.payload };
        default:
            return state;
    }
}

export default useReducer;