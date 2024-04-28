import * as Joi from 'joi';

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(category);
}

export { validateCategory };