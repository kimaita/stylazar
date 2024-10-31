const SigninReducer = (state, action) => {
    switch (action.type) {
        case "SIGNIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "SIGNIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "SIGNIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "SIGNOUT_SUCCESS":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default SigninReducer;
