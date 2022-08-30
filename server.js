// Importa o módulo do Express Framework
const express = require ('express')
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializa um objeto de aplicação Express
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
};

app.use ((req, res, next)=> {
    console.log (`Requisição: ${new Date().toLocaleString()} ${req.method} - ${req.path} - `)
    next ()
});

// Cria um manipulador da rota padrão
app.get ('/', function (req, res) {
  res.send (`
    <h1>Sejam bem-vindos ao Supermercado Nodes</h1>
    <p style="color: gray;">API V1</p>
    <hr>
    <h2>Recurso: Produtos</h2>
    <h3>Métodos:</h3>
    <ul>
        <li>POST: Incluir um produto</li>
        <span>
            &ensp;https://plataforma-nodejs-exercicio-1.herokuapp.com/api/produtos<br>
            &ensp;Corpo da requisição:<br>
            &ensp;{<br>
                &emsp;"id": Identificador do produto,<br>
                &emsp;"descricao": "Descrição do produto",<br>
                &emsp;"valor" : Valor do produto,<br>
                &emsp;"marca": "Marca do produto"<br>
            &ensp;}<br>
        </span>
        <li>GET: Obter a lista de produtos</li>
        <span>
            &ensp;https://plataforma-nodejs-exercicio-1.herokuapp.com/api/produtos<br>
        </span>
        <li>GET by Id: Obter um produto específico</li>
        <span>
            &ensp;https://plataforma-nodejs-exercicio-1.herokuapp.com/api/produtos/id<br>
        </span>
        <li>PUT: Alterar um produto</li>
        <span>
            &ensp;https://plataforma-nodejs-exercicio-1.herokuapp.com/api/produtos/id<br>
            &ensp;Corpo da requisição:<br>
            &ensp;{<br>
                &emsp;"descricao": "Nova descrição do produto",<br>
                &emsp;"valor" : Novo valor do produto,<br>
                &emsp;"marca": "Nova marca do produto"<br>
            &ensp;}<br>
        </span>
        <li>DELETE: Excluir um produto</li>
        <span>
            &ensp;https://plataforma-nodejs-exercicio-1.herokuapp.com/api/produtos/id<br>
        </span>
    </ul>
    `)
});

/*
    Ação: Incluir um produto
    Operação (CRUD): CREATE
    Mapeamento da URL: POST / produtos /
*/
app.post('/api/produtos', function (req, res) {
    var produto = req.body;

    lista_produtos.produtos.push(produto);

    return res.status(201).send('Produto adicionado com sucesso!');
});

/*
    Ação: Obter a lista de produtos
    Operação (CRUD): RETRIEVE
    Mapeamento da URL: GET / produtos
*/
app.get('/api/produtos', function (req, res) {
    res.status(200).json(lista_produtos)
});

/*
    Ação: Obter um produto específico
    Operação (CRUD): RETRIEVE
    Mapeamento da URL: GET / produtos /:id
*/
app.get('/api/produtos/:id', (req, res) => {
    const produto = lista_produtos.produtos.find(produto => produto.id === parseInt(req.params.id));

    const indice = lista_produtos.produtos.indexOf(produto);

    if (indice > -1) {
        res.status(200).json(produto);
    }

    res.status(404).send('Produto não encontrado!');
});

/*
    Ação: Alterar um produto
    Operação (CRUD): UPDATE
    Mapeamento da URL: PUT / produtos /:id
*/
app.put('/api/produtos/:id', function (req, res) {
    const produto = lista_produtos.produtos.find(produto => produto.id === parseInt(req.params.id));

    const indice = lista_produtos.produtos.indexOf(produto);

    if (indice > -1) {
        const novoProduto = {
            "id": parseInt(req.params.id),
            "descricao": req.body.descricao,
            "valor" : req.body.valor,
            "marca": req.body.marca
        };

        lista_produtos.produtos.splice(lista_produtos.produtos.indexOf(produto), 1, novoProduto);

        res.status(200).send('Produto atualizado com sucesso!');
    }

    res.status(404).send('Produto não encontrado!');
});

/*
    Ação: Excluir um produto
    Operação (CRUD): DELETE
    Mapeamento da URL: DELETE /produtos/:id
*/
app.delete('/api/produtos/:id', (req, res) => {
    const produto = lista_produtos.produtos.find(produto => produto.id === parseInt(req.params.id));

    const indice = lista_produtos.produtos.indexOf(produto);

    if (indice > -1) {
        lista_produtos.produtos.splice(lista_produtos.produtos.indexOf(produto), 1);

        res.status(200).send('Produto removido com sucesso!');
    }

    res.status(404).send('Produto não encontrado!');
});

// Inicializa o servidor HTTP na porta 3000
const port = process.env.PORT || 3000;

app.listen (port, function () {
    console.log('Servidor rodando.');
});