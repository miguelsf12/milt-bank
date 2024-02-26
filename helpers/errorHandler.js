const badRequest = (req, res, message, flashKey, template, options) => {
  req.flash(flashKey, message);
  res.render(template, options);
};

const serverError = (res) => {
  res.render(res);
};

module.exports = { badRequest, serverError };
