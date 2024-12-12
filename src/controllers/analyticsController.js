const { getAnalytics } = require("../services/analyticsServices");

const getQRCodeAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { from, to } = req.query;
    // console.log(id)

    if (!from || !to) {
      return res.status(400).json({ message: "Missing 'from' or 'to' query parameters." });
    }

    const analytics = await getAnalytics(id, req.user.id, from, to);
    res.status(200).json(analytics);
  } catch (err) {
    next(err);
  }
};

module.exports = { getQRCodeAnalytics };
