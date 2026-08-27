import express, { request, response } from 'express'; // Importa o framework
const app = express(); // Inicializa a aplicação

// Habilita o servidor a entender dados em formato JSON
app.use(express.json());

// Define uma rota do tipo GET no endereço /home
app.get('/home', (request, response) => {
    return response.send("Bem-vindo à nossa API!");
});

// Faz o servidor "escutar" requisições na porta 3333
app.listen(3333, () => console.log("Servidor rodando na porta 3333"));


// Atividade 1
let filmes = [{
    id : 0,
    titulo: "Titanic",
    genero: "Terror"
},{
    id : 1,
    titulo: "La La Land",
    genero: "Tristeza"
}];

app.get('/filmes', (request, response) => {
    response.json(filmes)
})

// Atividade 2
app.get('/filmes/genero', (request, response) => {
    
    const userRequest = (request.query.userRequest)

    const final = filmes.find(u => u.genero === (userRequest));
    
    if(!final){
        return response.status(404).json({ error: "Genero não encontrado"})
    }
    
    response.json(final)

})

const clientes = [
    {
        id: 0,
        nome: 'Kauan',
        email: 'Kauan@email.com'
    },
    {
        id: 1,
        nome: 'Jackson',
        email: 'Jackson@email.com'
    }
]


// Atividade 3 e 4

app.post('/cliente', (request, response) => {
    const {nome , email} = request.body
    let proximoId = 1
    const novoCliente = {
        id: proximoId++ ,
        nome: nome ,
        email: email ,
    }
    
    console.log(novoCliente)

    let checkCliente = clientes.find(u => u.nome === (novoCliente.nome))

    if(checkCliente){
        return response.status(400).json("Este nome já está cadastrado")
    }
    
    clientes.push(novoCliente)
    
    return response.status(201).json(novoCliente);
})


// Atividade 5
app.get('/cliente/:id', (request, response) => {
    const userRequest = Number(request.query.userRequest)
    console.log(userRequest)
    const final = clientes.find(u => u.id === (userRequest));
    console.log(final)
    
    if(isNaN(userRequest)){
        return response.status(404).json({ error: "ID não é número"})
    }
    
    response.json(final)
})

