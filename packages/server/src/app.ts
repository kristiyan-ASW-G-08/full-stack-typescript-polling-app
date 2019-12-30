import express, { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import errorHandler from '@customMiddleware/errorHandler';
import userRoutes from '@users/routes';
import pollRoutes from '@polls/routes';
import voteRoutes from '@votes/routes';

const app: Application = express();

app.use(helmet());
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(userRoutes);
app.use(pollRoutes);
app.use(voteRoutes);

app.use(errorHandler);

export default app;
