const { handle_works_purchase_agreements } = require("../../models");
const users = require("../../models/handle_works_users");
const axios = require("axios");

module.exports = async (req, res) => {
	const { requestResult, requesterId, purchaseId } = req.body;

	const findRequestUser = await users.findOne({ where: { id: requesterId } });
	const findPurchase = await handle_works_purchase_agreements.update(
		{ result: requestResult },
		{
			where: { id: purchaseId },
		}
	);

	let result;
	if (requestResult) {
		result = "승인";
	} else {
		result = "거절";
	}

	try {
		await axios.post(`${process.env.HANDLE_API_URL}/msg/aligo`, {
			receiver: findRequestUser.phoneNumber,
			msg: `요청하신 비품동의서가 ${result}되었습니다!`,
		});
		res.status(200).json({ message: `요청이 ${result}되었습니다` });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "서버에러입니다" });
	}
};
