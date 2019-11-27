import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import errorHandler from "@middleware/errorHandler";

const app: Application = express();

app.use(helmet());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  next();
});

app.use(errorHandler);

export default app;
