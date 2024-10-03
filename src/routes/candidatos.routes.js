import { Router } from "express";

const candidatosRoutes = Router()

let candidatos = [
   {
    id: Math.random() * 1000000,
    nome: "Capitã Lucimara",
    partido: "PSD",
    idade: 42,
    segundo: true, //concorrente ao segundo turno
    propostas: [
        "Aumento do salário mínimo",
        "Redução de imposto",
        "Mais investimentos em educação",
    ]
   },
]

//Rota para buscar todas as emoções 
candidatosRoutes.get("/", (req, res) => {
    return res.status(200).send(candidatos)
})

//Rota para criar uma nova emoção
candidatosRoutes.post("/", (req, res) => {
    const { nome, cor } = req.body
    const novaEmocao = {
        id: candidatos.length + 1,
        nome: nome,
        cor: cor,
    }
    candidatos.push(novaEmocao)
    return res.status(201).send(candidatos)
})

//Rota para buscar uma emoção pelo id
candidatosRoutes.get("/:id", (req, res) => {
    const {id} = req.params;

//console.log(id);
const emocao = candidatos.find((emotion) => emotion.id == id )

    if (!emocao){
        return res.status(404).send({
            message: "Emoção não encontrando",
        });
    }

    return res.status(200).send({
        message: "Emoção encontrada",
        emocao,
    })
})

candidatosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const emocao = candidatos.find((emotion) => emotion.id == id);
    if (!emocao){
        return res.status(404).send({
            message: "Emoção não encontrando",
        });
    }
    const { nome, cor } = req.body
    emocao.nome = nome;
    emocao.cor = cor;

    return res.status(200).send({
        message: "Emoção atualizada!",
        emocao,
    })
});


candidatosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    const emocao = candidatos.find((emotion) => emotion.id == id);
    if (!emocao){
        return res.status(404).send({
            message: "Emoção não encontrando",
        });
    }

    candidatos = candidatos.filter((emotion) => emotion.id != id);

    return res.status(200).send({
        message: "Emoção deletada",
        emocao,
    });
});

export default candidatosRoutes