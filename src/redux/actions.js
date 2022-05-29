export const SET_TAB_SELECTED = "SET_TAB_SELECTED";
export const SET_SESSION_LOGGED = "SET_SESSION_LOGGED";
export const SET_LOADING = "SET_LOADING";

export const setTabSelected = tabSelected => dispatch => {
    dispatch({
        type: SET_TAB_SELECTED,
        payload: tabSelected
    })
};

export const setSessionLogged = session_logged => dispatch => {
    dispatch({
        type: SET_SESSION_LOGGED,
        payload: session_logged
    })
}

export const setLoading = loading => dispatch => {
    dispatch({
        type: SET_LOADING,
        payload: loading
    })
}