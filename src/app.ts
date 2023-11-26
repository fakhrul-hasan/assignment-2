import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the assignment-2 of Level-2');
});

export default app;
