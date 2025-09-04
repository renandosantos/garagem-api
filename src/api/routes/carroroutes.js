// 1. Importar o Router do Express. É ele que nos permite criar diferentes rotas em arquivos separados.
const { Router } = require('express');

// 2. Importar o nosso Controller de carros, que tem a lógica para responder à requisição.
const carroController = require('../controllers/carrocontroller.js');

// 3. Criar uma nova instância do Router. É como criar um "mini-aplicativo" só para as rotas de carros.
const router = Router();

// 4. A configuração da rota.
// router.get() diz que estamos criando uma rota para o método HTTP GET.
// O primeiro argumento, '/carros', é o "endereço" da rota.
// O segundo argumento, carroController.getAllCarros, é a função que será executada quando alguém acessar esse endereço.
router.get('/carros', carroController.getAllCarros);

// 5. Exportar o router com todas as suas rotas configuradas para ser usado no arquivo principal (index.js).
module.exports = router;