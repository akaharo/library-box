# Library Box CRUD

Sistema CRUD da Library Box usando Node.js, MySQL e JavaScript.

## Tecnologias

- Node.js
- Express
- MySQL
- JavaScript
- HTML e CSS

## Banco de dados

Execute o arquivo `database.sql` no MySQL. Ele cria o banco `librarybox` com livros, usuarios, feed e reservas.

Estrutura principal:

- `books`: acervo da biblioteca.
- `users`: usuarios e administradores.
- `feed_posts`: avisos do mural/feed.
- `reservations`: solicitacoes de reserva.

## Como rodar

1. Entre na pasta do projeto:

```bash
cd parte2-crud
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie o arquivo `.env` com base em `.env.example` e ajuste usuario/senha do MySQL.

4. Inicie o servidor:

```bash
npm start
```

5. Abra no navegador:

```text
http://localhost:3000
```
