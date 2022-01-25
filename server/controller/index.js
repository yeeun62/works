module.exports = {
	// user
	signup: require("./user/signup"),
	signin: require("./user/signin"),
	signout: require("./user/signout"),
	userList: require("./user/list"),
	userDoc: require("./user/doc"),
	userInfo: require("./user/info"),
	phoneAuthCode: require("./user/phoneAuthCode"),
	phoneAuthCheck: require("./user/phoneAuthCheck"),
	pwcheck: require("./user/pwcheck"),
	patchUser: require("./user/patchUser"),

  // purchase
  postPurchase: require("./purchase/postPurchase"),
  getDetailPurchase: require("./purchase/getDetailPurchase"),
  purchaseRequest: require("./purchase/request"),
  ogPurchase: require("./purchase/ogPurchase"),
};
