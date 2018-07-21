const ValidationContract = require('../validators/fluent');
const repository = require('../repositories/customer');
const md5 = require('md5')

const emailService = require('../services/email')

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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        emailService.send(req.body.email, 'Bem vindo ao Node Store', 'Esse é o Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name))

        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }

}