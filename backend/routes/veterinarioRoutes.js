import express from 'express';
import { registrar,perfil,confirmar,autenticar,resetPassword,comprobarToken, nuevoPassword } from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();
// public
router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/reset-password', resetPassword)
router.route('/reset-password/:token').get(comprobarToken).post(nuevoPassword)
// loggen in
router.get('/perfil', checkAuth, perfil)

export default router;