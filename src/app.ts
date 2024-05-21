import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import httpStatus from 'http-status';

const app: Application = express();

//parsers
app.use(express.json());

app.use(
  cors({
    origin: ['https://lenshub.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
);

//application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Lenshub server is running...',
  });
});

//handle global error
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
