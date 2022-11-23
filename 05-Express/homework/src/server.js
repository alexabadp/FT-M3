// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
//const posts = [];
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json()); // NO OLVIDAR QUE ESTO NOS PERMITE TRABAJAR CON JSON

// TODO: your code to handle requests
const PATH = "/posts";
let id = 1;

server.post(PATH, (req, res) => {
  const { author, title, contents } = req.body;

  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  const post = {
    author,
    title,
    contents,
    id: id++,
  };

  posts.push(post);
  res.status(200).json(post);
});

const PATH1 = "/posts/author/:author";

server.post(PATH1, (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (!title || !contents || !author) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  const post = {
    author,
    title,
    contents,
    id: id++,
  };

  posts.push(post);
  res.status(200).json(post);
});

server.get(PATH, (req, res) => {
  const { term } = req.query;

  if (term) {
    const newPosts = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    return res.json(newPosts);
  }

  res.json(posts);
});

const PATHprueba = "/posts/:author";

server.get(`${PATH}/:author`, (req, res) => {
  const { author } = req.params;

  //if (author) {
  let newPost = posts.filter((p) => p.author === author);

  if (newPost.length > 0) {
    res.json(newPost);
  } else {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }
  //}
});

server.get(`${PATH}/:author/:title`, (req, res) => {
  const { author, title } = req.params;

  let newPost = posts.filter((p) => p.author === author && p.title === title);

  if (newPost.length > 0) {
    res.json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});

server.put(PATH, (req, res) => {
  const { id, title, contents } = req.body;

  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parametros necesarios para modificar el post",
    });
  }

  let newPost = posts.find((p) => p.id === parseInt(id));
  if (newPost) {
    newPost.title = title;
    newPost.contents = contents;

    return res.json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No se encontró un post que conincida con el id ingresado",
    });
  }
});

server.delete(PATH, (req, res) => {
  const { id } = req.body;

  if (id) {
    // let newId = posts.filter((p) => p.id === parseInt(id));
    let newId2 = posts.find((p) => p.id === parseInt(id));

    if (newId2) {
      posts = posts.filter((p) => p.id !== parseInt(id));

      return res.json({ success: true });
    }
  }
  res.status(STATUS_USER_ERROR).json({ error: "Mensaje de error" });
});

server.delete(`/author`, (req, res) => {
  const { author } = req.body;

  const post = posts.find((p) => p.author == author);

  console.log(post);
  if (!author || !post) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  }

  posts = posts.filter((p) => p.author === author);
  return res.json(posts);
});
module.exports = { posts, server };
