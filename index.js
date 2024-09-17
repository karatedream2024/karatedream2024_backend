import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './dbConnection/connect_db.js';
import { userRouter } from './routes/userRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { attendenceRouter } from './routes/attendenceRouter.js';
import { feeRouter } from './routes/feeRouter.js';
import blogrouter from './routes/blogRouter.js';
import contactrouter from './routes/contactRouter.js';
import dojorouter from './routes/dojoRouter.js';
import eventrouter from './routes/eventRouter.js';
import studentRouter from './routes/studentRouter.js';
import registerRouter from './routes/registerRouter.js';
import tourRouter from './routes/upcomingRouter.js';


const app = express();
app.use(cors());

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

connectToDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/getimage", (req, res) => {
  const imagePath = path.join(__dirname, "./photo/img/image1.jpg");
  res.sendFile(imagePath);
});

app.use('/api/user', userRouter)
app.use('/api/atten', attendenceRouter)
app.use('/api/fee', feeRouter)
app.use('/api/blog', blogrouter)
app.use('/api/contact', contactrouter)
app.use('/api/dojo', dojorouter)
app.use('/api/event', eventrouter)
app.use('/api/student', studentRouter)
app.use('/api/register', registerRouter)
app.use('/api/tour', tourRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
