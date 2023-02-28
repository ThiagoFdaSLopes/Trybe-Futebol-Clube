import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser';
import User from '../database/models/User';
import validateUserLogin from './validations/schema';

export default class UserService {
  protected model: ModelStatic<User> = User;

  async UserLogin(user: IUser): Promise<User | null> {
    try {
      validateUserLogin(user);
      const result = await this.model.findOne(
        { where: { email: user.email } },
      );
      const validateUser = bcrypt.compareSync(user.password, result?.password || '-');

      return validateUser ? result?.dataValues : null;
    } catch (error) {
      const err = error as Error;
      throw new Error(`${err.message}`);
    }
  }
}
