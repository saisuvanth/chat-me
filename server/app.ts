import dotenv from 'dotenv';
import path from 'path';
import express, { Express } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { checkAuth } from './middleware';
import router from './routes/auth';
import redisClient from './redisClient';
import socketHandler from './handlers';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app: Express = express();
const server = createServer(app);
const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/', (req, res) => {
	res.send('Welcome :)')
})

app.use('/api/auth', router);

checkAuth(io);
socketHandler(io);
// io.on('connection', socketController)

mongoose.connect(process.env.MONGO_URL).then(res => {
	console.log("Connected to MongoDB")
	redisClient.connect().then(() => {
		server.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`)
		})
	})
}).catch(err => {
	console.log(err)
})