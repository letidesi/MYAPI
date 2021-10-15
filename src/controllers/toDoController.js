const tarefasJson = require("../models/tarefas.json");
const fs = require("fs");

const getAll = (request, response) => {
  response.status(200).send(tarefasJson);
};

const createTask = (request, response) => {
  const bodyRequest = request.body;

  const novaTarefa = {
    id: Math.random().toString(32).substr(2, 9),
    dataInclusao: new Date(),
    descricao: bodyRequest.descricao,
    concluido: false,
    nome: bodyRequest.nome,
  };
  console.log(novaTarefa);

  tarefasJson.push(novaTarefa);

  fs.writeFile(
    "./src/models/tarefas.json",
    JSON.stringify(tarefasJson),
    "utf8",
    function (err) {
      if (err) {
        return response.status(500).send({ message: err });
      }
    }
  );
};
const deletarTask = (request, response) => {
  const idReq = request.params.id;
  const indiceTarefa = tarefasJson.findIndex((tarefa) => tarefa.id == idReq);
  tarefasJson.splice(indiceTarefa, 1);

  fs.writeFile(
    "./src/models/tarefas.json",
    JSON.stringify(tarefasJson),
    "utf8",
    function (err) {
      if (err) {
        return response.status(500).send({ message: err });
      }
    }
  );

  response.status(200).json([
    {
      mensagem: "tarefa foi excluida com sucesso",
      deletada: idReq,
      tarefasJson,
    },
  ]);
  response.status(201).send(tarefasJson);
};

const updateAll = (request, response) => {
  const idReq = request.params.id;
  const bodyRequest = request.body;
  const TarefaFound = tarefasJson.find((tarefa) => tarefa.id == idReq);

  bodyRequest.id = idReq;
  bodyRequest.dataInclusao = TarefaFound.dataInclusao;

  Object.keys(TarefaFound).forEach((chave) => {
    TarefaFound[chave] = bodyRequest[chave];
  });

  response.status(200).json([
    {
      mensagem: "Tarefas atualizadas com sucesso",
      TarefaFound,
    },
  ]);
};

const updateTudo = (request, response) => {
  const idReq = request.params.id;
  const bodyRequest = request.body;
  const TarefaFound = tarefasJson.find((tarefa) => tarefa.id == idReq);

  bodyRequest.id = idReq;
  bodyRequest.dataInclusao = TarefaFound.dataInclusao;

  Object.keys(TarefaFound).forEach((chave) => {
    if (bodyRequest[chave] == undefined) {
      TarefaFound[chave] = TarefaFound[chave];
    } else {
      TarefaFound[chave] = bodyRequest[chave];
    }
  });

  response.status(200).json([
    {
      mensagem: "Tarefas atualizadas com sucesso",
      TarefaFound,
    },
  ]);
};

module.exports = {
  getAll,
  createTask,
  deletarTask,
  updateAll,
  updateTudo,
};
