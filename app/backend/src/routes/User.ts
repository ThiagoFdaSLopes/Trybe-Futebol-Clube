import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';
import validateToken from '../middleware/validateToken';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', (req: Request, res: Response) => userController.UserLogin(req, res));
userRouter.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default userRouter;
