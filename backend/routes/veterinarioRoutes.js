import express from 'express';
const router = express.Router();

router.get('/', (req,res) => {
    res.send('desde api/veterinario')
})

router.get('/login', (req,res) => {
    res.send('desde api/veterinario/login')
})


export default router;