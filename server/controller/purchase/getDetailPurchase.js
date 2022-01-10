const { purchaseAgreement } = require("../../models");

module.exports = async (req, res) => {
	const purchasetId = req.params.id;

	try {
		const findPurchase = await purchaseAgreement.findOne({
			where: { id: purchasetId },
		});

		if (findPurchase) {
			res.status(200).json({ data: findPurchase.dataValues });
		} else if (!findPurchase) {
			res.status(404).json({ message: "존재하는 비품신청이 없습니다" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ messsage: "서버에러입니다" });
	}
};
