import { Request, Response, Router } from 'express';
import { MatcheController } from '../controllers';

const matcheController = new MatcheController();

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response) => matcheController.getAllMatches(req, res));

export default matcheRouter;
