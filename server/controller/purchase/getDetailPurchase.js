const { purchaseAgreement, users } = require("../../models");

module.exports = async (req, res) => {
  const purchasetId = req.params.id;

  try {
    let findPurchase = await purchaseAgreement.findOne({
      where: { id: purchasetId },
    });

    findPurchase.requester = await users.findOne({
      where: { id: findPurchase.requester },
      attributes: ["name"],
    });

    findPurchase.responser = await users.findOne({
      where: { id: findPurchase.responser },
      attributes: ["name", "email"],
    });

    if (findPurchase) {
      res.status(200).json({ data: findPurchase });
    } else if (!findPurchase) {
      res.status(404).json({ message: "존재하는 비품신청이 없습니다" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "서버에러입니다" });
  }
};
