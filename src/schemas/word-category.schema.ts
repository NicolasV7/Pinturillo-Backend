import * as Joi from "joi";

function validateWordCategory(data: any) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(data);
}

export { validateWordCategory };