router.post('/', async(req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    if (!name) return res.status(404).json({ error: "nome eh um campo obrigatório" })
})