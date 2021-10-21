const Ciudad = require('../utils/database').models.ciudad

module.exports = {
    post: (req, res) => {
        Ciudad.find({ where: { name: req.body.name } })
            .then(
                data => {
                    req.body = data;
                    req.body.popularidad = req.body.popularidad + 1
                    this.put(req, res);
                }
            ).catch(err => {
                Ciudad.create(req.body)
                    .then(data => {
                        return res.status(200).json({ items: data, status: 200 });
                    })
                    .catch(err => {
                        console.log(error);
                        return res.status(500).json({ error: err })
                    })
            })
    },

    get: (req, res) => {
        Ciudad.find({ where: { id: req.body.id } })
            .then(
                data => {
                    return res.status(200).json({ items: data, status: 200 });
                }
            )
            .catch(
                err => {
                    console.log(error);
                    return res.status(500).json({ error: err })
                }
            )
    },

    getAll: (req, res) => {
        Ciudad.findAll()
            .then(
                data => {
                    return res.status(200).json({ items: data, status: 200 });
                }
            )
            .catch(
                err => {
                    console.log(error);
                    return res.status(500).json({ error: err })
                }
            )
    },

    del: (req, res) => {
        Ciudad.destroy({ where: { id: req.body.id } })
            .then(data => {
                return res.status(200).json({ items: data, status: 200 });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({ error: err })
            })
    },


    put: (req, res) => {
        Ciudad.update(
            { nombre: req.body.nombre },
            { where: { id: req.body.id } }
        )
            .then(data => {
                return res.status(200).json({ items: data, status: 200 });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({ error: err })
            })
    }
}
