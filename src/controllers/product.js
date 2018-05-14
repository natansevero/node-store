const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
    Product.find({ active: true }, 'title price slug')
        .then(data => {
            // 201 -> created
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
        .then(data => {
            // 201 -> created
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            // 201 -> created
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
        .then(data => {
            // 201 -> created
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product.save()
        .then(success => {
            // 201 -> created
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' })
        })
        .catch(error => {
            res.status(400).send({ message: 'Falha ao cadastrar produto', data: error })
        });
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    })
        .then(success => {
            res.status(201).send({ message: "Produto atualizado com sucesso!" })
        })
        .catch(error => {
            res.status(400).send({ message: "Falha ao atualizar produto", data: error })
        });
}

exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.params.id)
        .then(success => {
            res.status(201).send({ message: "Produto removido com sucesso!" })
        })
        .catch(error => {
            res.status(400).send({ message: "Falha ao remover produto", data: error })
        });
}