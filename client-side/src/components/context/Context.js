import { createContext, useEffect, useReducer } from "react";
import SigninReducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    access_token: JSON.parse(localStorage.getItem("access_token")) || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SigninReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("access_token", JSON.stringify(state.access_token));
    }, [state.user, state.access_token]);

    return (
        <Context.Provider value={{ user: state.user, access_token:state.access_token, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </Context.Provider>
    );
};