import * as Joi from "joi";

function validateWordCategory(data: any) {
  const schema = Joi.object({
    id_category: Joi.string().required(),
    id_word: Joi.string().required(),
  });

  return schema.validate(data);
}

export { validateWordCategory };