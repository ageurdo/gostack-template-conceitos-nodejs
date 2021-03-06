const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };
  repositories.push(repository);
  return response.status(200).json(repository);
});

app.get("/repositories", (request, response) => {
  console.log(repositories);
  if (repositories < 1) {
    return response.status(204).json("No content found!")
  } else
    return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const indexfound = repositories.findIndex((item) => item.id === id);

  if (indexfound < 0 || request.params === undefined || request.params === null || request.params === '') {
    return response.status(400).send();
  } else {
    likes = repositories[indexfound].likes;
    const updatedRepository = { id, title, url, techs, likes };
    repositories[indexfound] = updatedRepository;
    response.json(updatedRepository);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexfound = repositories.findIndex((item) => item.id === id);

  if (indexfound < 0) {
    return response.status(400).json("Object not found!")
  } else {
    repositories.splice(indexfound, 1);
    return response.status(204).json();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexfound = repositories.findIndex((item) => item.id === id);

  if (indexfound < 0) {
    return response.status(400).json("Object not found!")
  } else {
    likeSum = repositories[indexfound].likes + 1;
    repositories[indexfound].likes = likeSum;
    return response.status(202).json(repositories[indexfound]);
  }
});

module.exports = app;
