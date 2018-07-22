const ValidationContract = require('../validators/fluent');
const repository = require('../repositories/customer');
const md5 = require('md5')

const emailService = require('../services/email')
const authService = require('../services/auth')

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
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        })

        emailService.send(req.body.email, 'Bem vindo ao Node Store', 'Esse é o Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name))

        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if(!customer) {
            res.status(404).send({ 
                message: 'Usuário ou senha inválidos' 
            })    
            return;
        }

        const token = await authService.generateToken({ 
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles 
        })

        res.status(201).send({ 
            token: token,
            data: {
                name: customer.name,
                email: customer.email
            } 
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};