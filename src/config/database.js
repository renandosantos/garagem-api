// 1. Importar a biblioteca mysql2 na versão com suporte a Promises
const mysql = require('mysql2/promise')
const { senha } = require('../config')

// 2. Criar e configurar o "pool" de conexões
const pool = mysql.createPool({
  host: 'localhost',         // O endereço do seu servidor MySQL (geralmente localhost)
  user: 'root',       // O seu nome de usuário do MySQL
  password: senha,     // A sua senha do MySQL
  database: 'garagemdb',       // O nome do schema que você criou
    waitForConnections: true,
  connectionLimit: 10,       // Número máximo de conexões no pool
    queueLimit: 0
});

// 3. Definir a string com o comando SQL para criar a tabela
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS carros (
        id INT PRIMARY KEY AUTO_INCREMENT,
        marca VARCHAR(50) NOT NULL,
        modelo VARCHAR(50) NOT NULL,
        ano INT
    );
`;

// 4. Criar a função assíncrona que configura o banco de dados
async function setupDatabase() {
  let connection; // Declara a variável de conexão fora do try para ser acessível no finally

    try {
    // Pega uma conexão do pool
    connection = await pool.getConnection();
    console.log('Conexão com o banco de dados bem-sucedida.');

    // Executa a query para criar a tabela (se ela não existir)
    await connection.execute(createTableQuery);
    console.log('Tabela "carros" verificada/criada com sucesso.');

    } catch (error) {
    // Se der algum erro, exibe no console e "relança" o erro para parar a aplicação
    console.error('Erro ao configurar o banco de dados:', error);
    throw error;
    } finally {
    // Garante que a conexão seja liberada de volta para o pool, aconteça o que acontecer
    if (connection) {
        connection.release();
        console.log('Conexão com o banco de dados liberada.');
    }
    }
}

// 5. Exportar o pool e a função setupDatabase
module.exports = {
    pool,
    setupDatabase
};