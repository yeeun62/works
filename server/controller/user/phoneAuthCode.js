const { handle_works_phone_auth, handle_works_users } = require("../../models");
const axios = require("axios");

module.exports = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const findUser = await handle_works_users.findOne({
      where: { phoneNumber },
    });

    const authNumHandler = () => {
      const chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      let randomstring = "";
      for (let i = 0; i < 6; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
      return randomstring;
    };

    let authNum = authNumHandler();

    let time =
      Date.parse(new Date().toLocaleString("en", { timeZone: "Asia/Seoul" })) /
      1000;
    console.log("타임", time);

    if (findUser) {
      return res.status(409).json({
        message:
          "해당 휴대폰번호로 가입된 계정이 있습니다. 한 휴대폰번호로 한 번만 가입이 가능합니다🥲",
      });
    } else {
      let sendAuthNum = await axios.post(
        `${process.env.HANDLE_API_URL}/msg/aligo`,
        {
          receiver: phoneNumber,
          msg: `본인 인증확인 문자입니다. 숫자 ${authNum} 4자리를 입력해주세요`,
        }
      );

      let createPhoneAuth = await handle_works_phone_auth.create({
        phoneNumber,
        authNumber: authNum,
        time,
        result: null,
      });

      res
        .status(200)
        .json({ message: "해당번호로 인증문자가 발송되었습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};
