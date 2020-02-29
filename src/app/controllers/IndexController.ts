class IndexController {
    async index(req,res) {
        const data = req.only(['name', 'email'], {forceError: true});
        return res.json(data);
    }
}

module.exports = new IndexController();