import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { agregarPaciente, obtenerPaciente } from '../controllers/pacienteControllers.js';
const router = express.Router();

router.route('/')
.get(checkAuth, obtenerPaciente)
.post(checkAuth, agregarPaciente)

export default router;