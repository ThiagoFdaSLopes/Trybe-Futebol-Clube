import { Request, Response, Router } from 'express';
import { MatcheController } from '../controllers';
import validateToken from '../middleware/validateToken';

const matcheController = new MatcheController();

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response) => matcheController.getAllMatches(req, res));
matcheRouter.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matcheController.EditMatches(req, res),
);

matcheRouter.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matcheController.finishMatche(req, res),
);
export default matcheRouter;
