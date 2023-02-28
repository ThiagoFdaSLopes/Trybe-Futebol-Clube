import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', (req: Request, res: Response) => userController.UserLogin(req, res));

export default userRouter;
