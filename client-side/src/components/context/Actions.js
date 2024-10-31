export const SigninStart = async (userCredentials, dispatch) => ({
    type: "SIGNIN_START",
});

export const SigninSuccess = async (user, dispatch) => ({
    type: "SIGNIN_SUCCESS",
    payload: user,
});

export const SigninFailure = async (dispatch) => ({
    type: "SIGNIN_FAILURE",
});

export const Signout = async (dispatch) => ({
    type: "SIGNOUT",
});