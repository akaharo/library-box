# Library Box

Projeto de biblioteca escolar com pagina publica, login e painel administrativo.

O sistema tem uma pagina principal para os leitores e um painel CRUD para o administrador controlar livros, usuarios, mural/feed e reservas.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- XAMPP/phpMyAdmin

## Estrutura

```text
.
├── index.html              # pagina principal da biblioteca
├── styles.css              # estilos do frontend principal
├── script.js               # consumo da API na pagina principal
├── cadastro.html           # cadastro de usuario leitor
├── reservas.html           # reserva de livros
├── comentarios.html        # comentarios, curtidas e avaliacoes
├── rankings.html           # rankings da biblioteca
└── parte2-crud/
    ├── server.js           # backend Node.js + Express
    ├── database.sql        # criacao do banco
    ├── package.json
    └── public/             # tela de login e painel administrativo
```

## Como rodar

1. Ligue o Apache/MySQL no XAMPP.

2. Crie o banco pelo phpMyAdmin usando o arquivo:

```text
parte2-crud/database.sql
```

3. Entre na pasta do backend:

```bash
cd parte2-crud
```

4. Instale as dependencias:

```bash
npm install
```

5. Crie o arquivo `.env` baseado no `.env.example`.

Exemplo para XAMPP:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=librarybox
DB_PORT=3306
PORT=3000
```

6. Inicie o servidor:

```bash
npm start
```

7. Abra no navegador:

```text
http://localhost:3000/parte1/
```

## Acessos de teste

Administrador:

```text
admin@librarybox.com
admin123
```

Usuario:

```text
aluno@librarybox.com
aluno123
```

## Funcionalidades

- CRUD de livros: inserir, listar, alterar e deletar.
- CRUD de usuarios: cadastrar, listar, editar e remover usuarios.
- CRUD de avisos/feed: publicar, listar, editar e remover avisos.
- Cadastro e login de leitores.
- Reservas de livros.
- Comentarios, curtidas, favoritos e avaliacoes.
- Rankings de livros e usuarios.

## Rotas principais da API

- `GET /api/books`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/feed`
- `POST /api/feed`
- `PUT /api/feed/:id`
- `DELETE /api/feed/:id`
- `GET /api/reservations`
- `POST /api/reservations`

## Notas

A pasta `node_modules` e o arquivo `.env` nao devem ser enviados para o GitHub. Quem baixar o projeto deve rodar `npm install` dentro de `parte2-crud`.
