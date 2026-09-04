const express = require ("express"); //trazer o arquivo de express //
const app = express(); //cria a aplicação express //
const path = require("path"); //trazer o arquivo de path, atualizações //
app.use(express.json()); 
app.use(express.static("public"));

// cria uma rota GET para o endereço raiz ("/") do servidor, que envia o arquivo index.html localizado na pasta "public" como resposta. //
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(3000, () => { //criar porta de escuta //
    console.log("Servidor rodando na porta 3000");
});

//criar array vazio para armazenar os pets cadastrados //
let pets = []; 

//criar rota para listar os pets cadastrados //
app.get("/pets", (req, res) => { 
    res.json(pets);
});

// criar rota para cadastrar novos pets //
app.post("/pets", (req, res) => {
    const novoPet = {
        id:Date.now(),
        nome: req.body.nome,
        especie: req.body.especie,
        idade: req.body.idade,
    };
    pets.push(novoPet); // adiciona o novo pet ao array de pets //
    res.status(201).json(novoPet); // envia uma resposta de sucesso com o novo pet cadastrado //              
});
app.delete("/pets/:id", (req, res) => {
    const petId = parseInt(req.params.id); // obtém o ID do pet a ser removido a partir dos parâmetros da rota //
    const index = pets.findIndex((pet) => pet.id === petId); // encontra o índice do pet no array de pets //

    if (index === -1) { // verifica se o pet foi encontrado //
        return res.status(404).json({ message: "Pet não encontrado" }); // envia uma resposta de erro caso o pet não seja encontrado //
    }   // envia uma resposta de erro caso o pet não seja encontrado //
    
    const petRemovido = pets.splice(index, 1); // remove o pet do array de pets //
    res.json({ message: "Pet removido com sucesso", pet: petRemovido[0] }); // envia uma resposta de sucesso com o pet removido //  
});

// O servidor localiza o pet pelo id e substitui os dados recebidos no body.//
app.put("/pets/:id", (req, res) => {
    const id = Number(req.params.id);
    const pet = pets.find((pet) => pet.id === id);
    if (!pet) {
        return res.status(404).json({
            mensagem: "Pet não encontrado."
        });
    }
    pet.nome = req.body.nome;
    pet.especie = req.body.especie;
    pet.idade = req.body.idade;
    res.json(pet);
});

