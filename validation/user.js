const joi = require("joi");
const { handleReqBody } = require("../utils/helper");

exports.validateUser = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).required(),
    password: joi.string().min(6).required(),
  });

  handleReqBody(req, schema, next);
};
exports.validateLoginUser = (req, res, next) => {
  const schema = joi.object({
    phone: joi.string().min(10).required(),
    password: joi.string().min(6).required(),
  });

  handleReqBody(req, schema, next);
};
