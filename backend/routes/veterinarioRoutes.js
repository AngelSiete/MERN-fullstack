import express from 'express';
import { registrar,perfil,confirmar,autenticar,resetPassword,comprobarToken, nuevoPassword,actualizarPerfil } from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();
// public
router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/reset-password', resetPassword)
router.route('/reset-password/:token').get(comprobarToken).post(nuevoPassword)
// logged in
router.get('/perfil', checkAuth, perfil)
router.put('/perfil/:id', checkAuth, actualizarPerfil)

export default router;