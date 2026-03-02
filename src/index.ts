import('apminsight')
  .then(({ default: AgentAPI }) => AgentAPI.config())
  .catch(() => console.log('APM not available in this environment'));

import express from 'express';
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import subjectsRouter from './routes/subjects';
import securityMiddleware from './middleware/security';
import { auth } from './lib/auth';

const app = express();
const PORT = 8000;

app.use(cors({
   origin: process.env.FRONTEND_URL,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(securityMiddleware)

app.use('/api/subjects', subjectsRouter)

app.get('/', (req, res) => {
   res.send('Hallo Mars')   
});

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`)   
});