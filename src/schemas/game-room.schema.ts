import * as Joi from "joi";

function validateGameRoom(gameRoom) {
  const schema = Joi.object({
    room_name: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(3).max(30).required(),
    id_category: Joi.string().required()
  });

  return schema.validate(gameRoom);
}

export { validateGameRoom };