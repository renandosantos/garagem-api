const express = require('express')
const app = express()
const { setupDatabase } = require('./config/database.js');
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "testando o get"})
})


// Função para controlar a inicialização
const startServer = async () => {
    try {
    // 1. Garante que o banco e a tabela estão prontos
    await setupDatabase();

    // 2. SÓ DEPOIS, inicia o servidor
    app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    });
}  catch (error) {
    // Se o setup do banco falhar, a aplicação vai parar aqui.
    console.error('Falha ao iniciar o servidor:', error);
    }
};

// Chama a função para iniciar tudo
startServer();