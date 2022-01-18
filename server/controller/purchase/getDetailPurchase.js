const {
	handle_works_purchase_agreements,
	handle_works_users,
} = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const purchaseId = req.params.purchaseId;
	const handleToken = req.cookies.handleToken;

	try {
		const userInfo = await jwt.verify(handleToken, process.env.TOKEN);

		let findPurchase = await handle_works_purchase_agreements.findOne({
			where: { purchaseId },
		});

		let requestUser = await handle_works_users.findOne({
			where: { id: findPurchase.requester },
		});

		if (
			findPurchase.requester === userInfo.id ||
			findPurchase.responser === userInfo.id
		) {
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
		} else {
			res.status(401).json({ message: "접근권한이 없습니다😅" });
		}
	} catch (err) {
		console.log("캐티에어러러러렁", err);
		res.status(500).json({ messsage: "서버에러입니다" });
	}
};
handle_works_purchase_agreements;
