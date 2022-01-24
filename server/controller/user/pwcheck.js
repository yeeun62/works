const { handle_works_users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const handleToken = req.cookies.handleToken;
  const password = req.body.data;
  if (!handleToken)
    return res.status(400).json({ message: "로그인을 해주세요" });
  else {
    try {
      const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
      const findUser = await handle_works_users.findOne({
        where: { id: userInfo.id },
        attributes: ["password"],
      });
      let passwordCheck = await bcrypt.compare(password, findUser.password);
      if (!passwordCheck)
        return res
          .status(405)
          .json({ message: "비밀번호가 일치하지 않습니다 🥲" });
      else {
        res.status(200).json({ message: "비밀번호가 확인되었습니다 👌" });
      }
    } catch (err) {
      console.log("캐치에러", err);
      res.status(400).json({ message: "서버 에러입니다 🤖" });
    }
  }
};
