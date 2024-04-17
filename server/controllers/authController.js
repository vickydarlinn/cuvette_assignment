exports.register = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "hello from test controller",
    });
  } catch (error) {}
};
exports.login = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "hello from test controller",
    });
  } catch (error) {}
};
