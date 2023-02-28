import { Request, Response } from 'express';
import createToken from '../utils/jwtToken';
import { UserService } from '../services';

const errorMessage = 'Invalid email or password';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async UserLogin(req: Request, res: Response): Promise<Response | void> {
    try {
      const result = await this.userService.UserLogin(req.body);
      if (result === null) return res.status(401).json({ message: errorMessage });
      const token = createToken(result);
      res.status(200).json({ token });
    } catch (error) {
      const err = error as Error;
      if (err.message === errorMessage) {
        return res.status(401).json({ message: errorMessage });
      }
      res.status(400).json({ message: err.message });
    }
  }
}
