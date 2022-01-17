const { handle_works_purchase_agreements } = require("../../models");
const users = require("../../models/handle_works_users");

module.exports = async (req, res) => {
	const purchasetId = req.params.id;

	try {
		let findPurchase = await handle_works_purchase_agreements.findOne({
			where: { id: purchasetId },
		});

		let requestUser = await users.findOne({
			where: { id: findPurchase.requester },
		});

		const {
			title,
			responser,
			productName,
			productInfo,
			quantity,
			price,
			totalPrice,
			reason,
			result,
		} = findPurchase;

		const { id, name, createdAt } = requestUser;

		let data = {
			purchaseId: findPurchase.id,
			userId: id,
			responser,
			name,
			createdAt,
			title,
			productName,
			productInfo,
			quantity,
			price,
			totalPrice,
			reason,
			result,
		};

		res.status(200).json({ data });
	} catch (err) {
		console.log("캐티에어러러러렁", err);
		res.status(500).json({ messsage: "서버에러입니다" });
	}
};
