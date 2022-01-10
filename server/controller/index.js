module.exports = {
	// user
	signup: require("./user/signup"),
	signin: require("./user/signin"),
	signout: require("./user/signout"),
	userList: require("./user/userList"),
	userDoc: require("./user/userDoc"),

	// purchase
	postPurchase: require("./purchase/postPurchase"),
	getDetailPurchase: require("./purchase/getDetailPurchase"),
};
