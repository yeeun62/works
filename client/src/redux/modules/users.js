import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const LOGIN = "LOGIN";
const SIGNIN_MODAL_HANDLER = "LOGIN_MODAL_HANDLER";
const SIGNUP_MODAL_HANDLER = "SIGNUP_MODAL_HANDLER";

// action
export const getUserInfo = () => (dispatch) => {
	axios
		.get(`${process.env.REACT_APP_TEMPLATE_API_URL}/user/userInfo`, {
			withCredentials: true,
		})
		.then((el) => {
			if (el.data.userInfo) {
				dispatch(login(el.data.userInfo));
			}
		});
};

export const login = (data) => {
	return {
		type: LOGIN,
		payload: data,
	};
};

export const signinModal = () => {
	return {
		type: SIGNIN_MODAL_HANDLER,
	};
};

export const signupModal = () => {
	return {
		type: SIGNUP_MODAL_HANDLER,
	};
};

// initialState
const initialState = {
	userInfo: {},
	isLogin: false,
	signinModal: false,
	signupModal: false,
};

// reducer
export const users = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, userInfo: action.payload, isLogin: true };

		case SIGNIN_MODAL_HANDLER:
			return { ...state, signinModal: !state.signinModal };

		case SIGNUP_MODAL_HANDLER:
			return { ...state, signupModal: !state.signupModal };

		default:
			return state;
	}
};

export default users;
