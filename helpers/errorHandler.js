const badRequest = (req, res, message, flashKey, template, options) => {
  req.flash(flashKey, message);
  res.render(template, options);
};

const serverError = (res, message = 'Erro interno do servidor.', flashKey, template) => {
  req.flash(flashKey, message);
  res.render(template);
};

module.exports = { badRequest, serverError };
