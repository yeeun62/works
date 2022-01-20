const ogs = require("open-graph-scraper");

module.exports = (req, res) => {
	function ogsinfo(url, fn) {
		return ogs({ url: url }, (err, ret) => {
			fn(err, ret);
		});
	}
	ogsinfo(req.body.url, (err, ret) => {
		try {
			if (!err) {
				let data = {
					url: ret.ogUrl,
					title: ret.ogTitle,
					desc: ret.ogDescription,
					imgUrl: ret.ogImage.url,
				};
				res.status(200).json({ data });
			} else if (err) {
				res.status(404).json({ message: "og 정보가 없습니다!" });
			}
		} catch (err) {
			console.log("og 에러");
		}
	});
};
