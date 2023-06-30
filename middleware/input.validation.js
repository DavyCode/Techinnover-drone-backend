const Joi = require('joi');

const regDroneValidator = async (req, res, next) => {
  const schema = Joi.object()
  .keys({
    serialNumber: Joi.string().max(100).required(),
    model: Joi.string().valid("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight").required(),
    state: Joi.string().valid("IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING").required(),
  })

  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return res.status(400).json({
      errors: [`${err.details[0].message}`],
    });
  }
}

module.exports = {
  regDroneValidator,
}