global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>';

module.exports = {
    connectionString: 'mongodb://localhost:27017/nodestore',
    // Para enviar email
    sendgridKey: 'NTS',
    // Para armazenas as imagens no azure
    containerConnectionString: 'NTS'
}