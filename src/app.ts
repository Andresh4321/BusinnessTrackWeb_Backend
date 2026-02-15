import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './database/db';
import { PORT } from './config';
import authRoutes from "./routes/auth.route";
import cors from 'cors';
import path from "path";
import adminUserRoutes from './routes/admin/user.route';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount admin user routes under /api/admin/users (router defines "/" and "/:id")
app.use('/api/admin/users', adminUserRoutes);
console.log('Admin user routes mounted at /api/admin/users');

// quick test endpoint for Postman to verify admin user routes are reachable
app.get('/api/admin/users/test', (req: Request, res: Response) => {
    return res.status(200).json({ success: true, message: 'Admin users test route OK' });
});

// serve uploads and public item photos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/items/photos', express.static(path.join(__dirname, '../public/item_photos')));
app.use('/public/items_photos',
  express.static(path.join(__dirname, '../public/item_photos'))
);



app.use('/api/auth', authRoutes);
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ success: "true", message: "Welcome to the API" });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Not Found' });
});

// basic error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // log server-side error
    console.error(err);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

export default app;