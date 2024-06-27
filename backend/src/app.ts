import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import fileRoutes from './routes/fileRouter';
import userRoutes from './routes/usersRouter';

const app = express();

app.use(cors());

app.use(express.json());
app.use(fileUpload());

app.use('/api', fileRoutes);
app.use('/api', userRoutes);

export default app;
