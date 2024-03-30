import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { agregarPaciente, obtenerPacientes, obtenerPaciente,actualizarPaciente, eliminarPaciente } from '../controllers/pacienteControllers.js';
const router = express.Router();

router.route('/')
.get(checkAuth, obtenerPacientes)
.post(checkAuth, agregarPaciente)

router.route('/:id')
.get(checkAuth, obtenerPaciente)
.put(checkAuth, actualizarPaciente)
.delete(checkAuth, eliminarPaciente)

export default router;