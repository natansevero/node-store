const repository = require('../repositories/order');
const guid = require('guid')
const authService = require('../services/auth')

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.post = async (req, res, next) => {   
    
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token)

        await repository.create({
            // O Id passado é o do token 
            customer: data._id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }

}