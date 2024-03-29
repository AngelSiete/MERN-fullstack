const generarId = () => {
    const date = Date.now();
    const random = Math.random().toString(32).substring(2)
    const idRandom = date + random;
    return idRandom;
}

export default generarId;