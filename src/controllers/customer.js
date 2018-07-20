const ValidationContract = require('../validators/fluent');
const repository = require('../repositories/customer');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 3, 'E-mail inválido')
    contract.hasMinLen(req.body.password, 6, 'O senha deve conter pelo menos 6 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }

}