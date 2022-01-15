const { users, purchaseAgreement } = require("../../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = async (req, res) => {
	const handleToken = req.cookies.handleToken;
	const {
		responser,
		productName,
		productInfo,
		quantity,
		price,
		totalPrice,
		reason,
	} = req.body;

	if (!handleToken) {
		return res.status(401).json({ mesage: "로그인을 해주세요" });
	}

	try {
		const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
		const requesterInfo = await users.findOne({ where: { id: responser } });
		if (
			responser &&
			productName &&
			productInfo &&
			quantity &&
			price &&
			totalPrice &&
			reason
		) {
			let newPurchase = await purchaseAgreement.create({
				requester: userInfo.id,
				responser,
				title: "비품 신청",
				productName,
				productInfo,
				quantity,
				price,
				totalPrice,
				reason,
				result: null,
			});
			res.status(200).json({ message: "비품동의서 저장에 성공하였습니다🥳" });

			try {
				await axios.post(`${process.env.HANDLE_API_URL}/msg/aligo`, {
					receiver: requesterInfo.phoneNumber,
					msg: `
          확인이 필요한 비품동의서가 있습니다.
				  https://works.handle.market/purchase/${newPurchase.id}
				  `,
				});
			} catch (err) {
				res.status(500).send("알리고 에러");
				console.log(err);
			}
		} else {
			res.status(400).json({ message: "parameter가 불충분합니다" });
		}
	} catch (err) {
		res.status(500).send("서버에러");
		console.log(err);
	}
};
