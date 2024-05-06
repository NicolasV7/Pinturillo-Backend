import * as Joi from "joi";

function validateGameRoom(gameRoom) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(3).max(30).required(),
    category_id: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(gameRoom);
}

export { validateGameRoom };