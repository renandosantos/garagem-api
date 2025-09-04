// 1. Importar o 'pool' de conexões com o caminho CORRETO
const { pool } = require('../../config/database');

/**
 * Função para buscar todos os carros do banco de dados.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de carros.
 */
async function listarTodos() {
    try {
    // 2. Executa a query SQL para selecionar tudo da tabela 'carros'
    const [rows] = await pool.query('SELECT * FROM carros;');
    
    // 3. Retorna as linhas (os carros) que foram encontradas
    return rows;

    } catch (error) {
    // 4. Se der algum erro na consulta, ele será exibido no console
    console.error('Erro ao listar todos os carros:', error);
    // E o erro é "relançado" para que o Controller saiba que algo deu errado.
    throw error;
    }
}

// 5. Exportar a função para que o 'carroController.js' possa importá-la e usá-la.
module.exports = {
    listarTodos
};