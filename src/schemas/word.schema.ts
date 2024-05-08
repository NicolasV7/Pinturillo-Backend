import * as Joi from 'joi';

function validateWord(word) {
  const schema = Joi.object({
    text: Joi.string().min(3).max(50).required(),
    categories: Joi.array().items(Joi.string()),
  });

  return schema.validate(word);
}

export { validateWord };