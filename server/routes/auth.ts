import { Router } from "express";
import { fetch } from '../controllers/auth'

const router = Router();

router.post('/fetch', fetch);




export default router;