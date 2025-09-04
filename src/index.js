const express = require('express')
const app = express()
const { setupDatabase } = require('./config/database.js');
const port = 3000

// --- NOVA LINHA: Importar o arquivo de rotas que você criou ---
const carroroutes = require('./api/routes/carroroutes.js');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// A sua rota de teste pode continuar aqui sem problemas
app.get('/', (req, res) => {
    res.json({message: "testando o get"})
})


// Função para controlar a inicialização (você já tem essa parte)
const startServer = async () => {
    try {
    await setupDatabase();

    // --- NOVA LINHA: Diga ao app para usar as rotas importadas ---
    // Todas as rotas em 'carroRoutes' agora começarão com o prefixo '/api'
    app.use('/api', carroroutes);

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
    } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    }
};

// Chama a função para iniciar tudo
startServer();
