const { handle_works_phone_auth } = require("../../models");

module.exports = async (req, res) => {
	const { authNumber, phoneNumber, time } = req.body;

	try {
		const findPhone = await handle_works_phone_auth.findOne({
			where: { phoneNumber, result: null },
		});

		let timeCheck = time - Number(findPhone.time) <= 180;

		if (findPhone.authNumber === authNumber && timeCheck) {
			handle_works_phone_auth.update(
				{ result: true },
				{ where: { phoneNumber } }
			);
			res.status(200).json({ message: "인증이 완료 되었습니다!" });
		} else if (findPhone.authNumber !== authNumber) {
			res.status(400).json({ message: "인증번호가 일치하지 않습니다.." });
		} else if (!timeCheck) {
			res.status(408).json({ message: "시간이 초과되었습니다..." });
		} else {
			res.status(500).json({ message: "서버에러입니다.." });
		}
	} catch (err) {
		console.log(err);
	}
};
