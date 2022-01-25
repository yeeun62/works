const { handle_works_users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const userInfo = await jwt.verify(req.cookies.handleToken, process.env.TOKEN);
  if (!userInfo)
    return res.status(400).json({ message: "로그인을 먼저 해주세요" });
  else {
    try {
      let newPw = bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.data, salt, async (err, hash) => {
          if (err) {
            console.log("bcrypt 에러!");
            throw err;
          } else {
            let update = handle_works_users.update(
              { password: hash },
              { where: { id: userInfo.id } }
            );
            console.log(update);
            if (!update) res.status(400).json({ message: "업데이트 에러" });
            else
              res.status(200).json({ message: "비밀번호가 수정되었습니다 🙌" });
          }
        });
        if (err) console.log(err);
      });
    } catch (err) {
      console.log("캐치에러", err);
      res.status(400).json({ message: "서버 에러입니다 🤖" });
    }
  }
};
