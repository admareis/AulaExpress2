const express = require ("express"); //trazer o arquivo de express //
const app = express();
const path = require("path"); //trazer o arquivo de path, atualizações //
app.use(express.json()); 
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

//criar array vazio para armazenar os pets cadastrados //
let pets = [{
    Id:1,
    nome: "Rex",
    especie: "SRD",
    idade: 5,
},{
    Id:2,
    nome: "Mia",
    especie: "Gato",
    idade: 3,
}]; 

//criar rota para listar os pets cadastrados //
app.get("/pets", (req, res) => { 
    res.json(pets);
});
app.post("/pets", (req, res) => {
    const novoPet = {
        id:Date.now(),
        nome: req.body.nome,
        especie: req.body.especie,
        idade: req.body.idade,
    };
    pets.push(novoPet);
    res.status(201).json(novoPet);              
});

app.listen(3000, () => { //criar porta de escuta //
    console.log("Servidor rodando na porta 3000");
});