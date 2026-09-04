const form = document.getElementById("petForm");
form.addEventListener ("submit", async(event) => {
    event.preventDefault(); // impede o envio padrão do formulário //
    const nome = document.getElementById("nome").value;
    const especie = document.getElementById("especie").value;
    const idade = document.getElementById("idade").value;

    const resposta = await fetch("/pets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nome: nome, especie: especie, idade: idade }),
    });

const pet = await resposta.json();

console.log(pet);
form.reset(); // limpa os campos do formulário //
carregarPets(); // atualiza a lista de pets cadastrados //
});

async function carregarPets() {
    const resposta = await fetch("/pets");
    const pets = await resposta.json();

    const listaPets = document.getElementById("listaPets");
    listaPets.innerHTML = ""; // limpa a lista antes de adicionar os pets //

    pets.forEach((pet) => {
        const item = document.createElement("p");
        item.innerHTML = `
            ${pet.nome} - ${pet.especie} - ${pet.idade} anos
            <button onclick="excluirPet(${pet.id})">
                Excluir
            </button>
        `;
        listaPets.appendChild(item);
    });
};
carregarPets(); // carrega a lista de pets cadastrados ao carregar a página //

async function excluirPet(id) {
    const resposta = await fetch(`/pets/${id}`, {
        method: "DELETE"
    });
    const resultado = await resposta.json();
    console.log(resultado);
    carregarPets();
};

