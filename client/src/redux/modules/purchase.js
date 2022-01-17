import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const PURCHASE_MODAL = "PURCHASE_MODAL";

// action
export const purchaseModal = () => {
	return {
		type: PURCHASE_MODAL,
	};
};

// initialState
const initialState = {
	userInfo: {},
	purchaseModal: false,
};

// reducer
export const purchase = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_MODAL:
			return { ...state, purchaseModal: !state.purchaseModal };

		default:
			return state;
	}
};

export default purchase;
