import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/IUser';

dotenv.config();

function createToken(payload: IUser): string {
  return sign(payload, process.env.JWT_SECRET as string);
}

export default createToken;
