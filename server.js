import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

console.log("porta de sevidor aberta: 4000\n");

const posts = [
    {
        id: 0,
        title: 'Hello World',
        coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 2
  },
  {
      id: 1,
      title: 'Jack Swallows',
      coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
      contentPreview: 'Esta é a miduiu de um kakarot esperado pelo forte-kokoyo',
      content: 'Esta é a miduiu de um kakarot esperado pelo forte-kokoyo',
      commentCount: 1
    }
];

const comments = [
    {
        id: 0,
        postId: 0,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
    },
    {
        id: 1,
        postId: 0,
        author: 'Maria',
        content: 'Como faz pra dar palmas?'
    },
    {
        id: 0,
        postId: 1,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
    }
]


server.get("/posts" , (req, res) => {
    console.log("enviando posts");
    res.send(posts);
});

server.get("/posts/:id" , (req, res) => {
    
    console.log("enviando o post");
    const id = req.params.id;
    const answer=posts[id];
    res.send(answer);
});

server.get("/posts/:id/comments" , (req, res) => {

    console.log("enviando os comentários do post!");
    const postId = parseInt(req.params.id); 
    const postComments = comments.filter((c)=>c.postId === postId);
    res.send(postComments);

});

server.post("/posts" , (req, res) => {

    console.log("gravando um novo post ao banco de dados\n");
    const newPost = req.body;
    newPost.id = posts.length;
    posts.push(newPost);
    console.log(posts)
    res.send("Post adicionado com sucesso!");
});

server.post("/posts/:id/comments" , (req, res) => {

    console.log("gravando um novo comentário na postagem\n");
    const newComment = req.body;
    newComment.id = comments.length;
    const postId = parseInt(req.params.id);
    posts[postId].commentCount++;
    comments.push(newComment);
    console.log(comments)
    res.send("Comentário adicionado com sucesso!");
});

server.listen(4000);