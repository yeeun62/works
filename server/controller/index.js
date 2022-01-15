module.exports = {
	// user
	signup: require("./user/signup"),
	signin: require("./user/signin"),
	signout: require("./user/signout"),
	userList: require("./user/userList"),
	userDoc: require("./user/userDoc"),
	userInfo: require("./user/userInfo"),

	// purchase
	postPurchase: require("./purchase/postPurchase"),
	getDetailPurchase: require("./purchase/getDetailPurchase"),
	purchaseRequest: require("./purchase/purchaseRequest"),
};
