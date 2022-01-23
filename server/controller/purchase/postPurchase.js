const {
  handle_works_purchase_agreements,
  handle_works_users,
} = require("../../models");
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
    file,
  } = req.body;

  console.log(req.body);

  if (!handleToken) {
    return res.status(401).json({ mesage: "로그인을 해주세요" });
  }

  try {
    const userInfo = await jwt.verify(handleToken, process.env.TOKEN);

    const uuid = await axios.get(process.env.UUID, {
      headers: { "HANDLE-API-KEY": process.env.UUID_KEY },
    });

    const requesterInfo = await handle_works_users.findOne({
      where: { id: responser },
    });

    if (
      responser &&
      productName &&
      productInfo &&
      quantity &&
      price &&
      totalPrice &&
      reason &&
      file
    ) {
      let newPurchase = await handle_works_purchase_agreements.create({
        purchaseId: uuid.data.code,
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
        file,
      });
      res.status(200).json({ message: "비품동의서 저장에 성공하였습니다🥳" });

      try {
        await axios.post(`${process.env.HANDLE_API_URL}/msg/aligo`, {
          receiver: requesterInfo.phoneNumber,
          msg: `확인이 필요한 비품동의서가 있습니다.
					https://works.handle.market/purchase/${newPurchase.purchaseId}`,
        });
      } catch (err) {
        res.status(500).send("알리고 에러");
        console.log(err);
      }

      // const resName = await handle_works_users.findOne({
      // 	where: { id: req.body.responser },
      // 	attributes: ["name"],
      // });

      // try {
      // 	await axios.post(
      // 		process.env.SLACK_URL,
      // 		{
      // 			text: `${resName.name}님에게 확인이 필요한 비품동의서가 있습니다.
      //   https://works.handle.market/purchase/${newPurchase.purchaseId}`,
      // 		},
      // 		{ headers: { "Content-type": "application/json" } }
      // 	);
      // } catch (err) {
      // 	console.log("슬랙캐치에러", err);
      // }

      // const getUser = app.client.conversations.members({});
    } else {
      res.status(400).json({ message: "parameter가 불충분합니다" });
    }
  } catch (err) {
    res.status(500).send("서버에러");
    console.log(err);
  }
};
