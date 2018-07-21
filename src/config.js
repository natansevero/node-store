global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = '<div>Olá <strong>{0}</strong>. Bem-vindo ao Node Store</div>';

module.exports = {
    connectionString: 'mongodb://localhost:27017/nodestore',
    // Para enviar email
    sendgridKey: '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',
    // Para armazenas as imagens no azure
    containerConnectionString: 'NTS'
}