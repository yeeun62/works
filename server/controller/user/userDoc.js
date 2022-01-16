const { users, purchaseAgreement } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const handleToken = req.cookies.handleToken;

  try {
    const userInfo = await jwt.verify(handleToken, process.env.TOKEN);

    let myRequest = await purchaseAgreement.findAll({
      where: { requester: userInfo.id },
      attributes: ["id", "responser", "title", "result", "createdAt"],
    });

    let myRequestList = await Promise.all(
      myRequest.map(async (res) => {
        let list = await users
          .findOne({
            where: { id: res.responser },
            attributes: ["name"],
          })
          .then((el) => {
            return {
              id: res.id,
              requester: el.name,
              title: res.title,
              result: res.result,
              createdAt: res.createdAt,
            };
          });
        return list;
      })
    );

    let myResponser = await purchaseAgreement.findAll({
      where: {
        responser: userInfo.id,
      },
      attributes: ["id", "requester", "title", "result", "createdAt"],
    });

    let myResponserList = await Promise.all(
      myResponser.map(async (res) => {
        let list = await users
          .findOne({ where: { id: res.requester }, attributes: ["name"] })
          .then((el) => {
            return {
              id: res.id,
              requester: el.name,
              title: res.title,
              result: res.result,
              createdAt: res.createdAt,
            };
          });
        return list;
      })
    );

    res.status(200).json({ myRequestList, myResponserList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "서버에러입니다." });
  }
};
