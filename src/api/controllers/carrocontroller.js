// 1. Importar o nosso Model para que o Controller possa "conversar" com ele.
// O caminho '../models/carromodels.js' significa "volte uma pasta e entre na pasta models".
const carroModel = require('../models/carromodels.js');

/**
 * Função do Controller para lidar com a requisição de buscar todos os carros.
 * @param {object} req - O objeto de requisição do Express (não vamos usar aqui, mas ele está sempre disponível).
 * @param {object} res - O objeto de resposta do Express, que usamos para enviar dados de volta ao cliente.
 */
async function getAllCarros(req, res) {
    try {
    // 2. Chama a função do Model que busca os carros no banco de dados.
    // O 'await' espera a 'promessa' do Model ser resolvida.
    const carros = await carroModel.listarTodos();

    // 3. Se tudo deu certo, envia a lista de carros de volta como uma resposta JSON.
    // O status 200 significa que a requisição foi um sucesso (OK).
    return res.status(200).json(carros);

    } catch (error) {
    // 4. Se o Model "lançou" um erro (ex: o banco caiu), o catch vai pegar.
    console.error('Erro no controller ao buscar carros:', error);

    // Envia uma resposta de erro genérica para o cliente com o status 500 (Erro Interno do Servidor).
    return res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
}

// 5. Exportar a função para que o arquivo de rotas ('carroroutes.js') possa usá-la.
module.exports = {
    getAllCarros
};
