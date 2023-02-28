import { Request, Response, Router } from 'express';
import { LeaderBoardController } from '../controllers';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.GetResultsHome(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.GetResultsAway(req, res),
);

export default leaderBoardRouter;
