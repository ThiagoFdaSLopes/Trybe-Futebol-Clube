import Joi = require('joi');
import { IUser } from '../../interfaces/IUser';

const errorMessage = 'All fields must be filled';

const validateUserLogin = (body: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': errorMessage,
      'string.email': 'Invalid email or password',
      'string.required': errorMessage,
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': errorMessage,
      'string.min': 'Invalid email or password',
      'string.required': errorMessage,
    }),
  });
  const { error } = schema.validate(body);
  if (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default validateUserLogin;
