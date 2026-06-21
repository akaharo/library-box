const user = JSON.parse(localStorage.getItem("libraryboxUser") || "null");
const livroSelect = document.querySelector("#livro");
const lista = document.querySelector("#comentariosLista");
const mensagem = document.querySelector("#comentarioMensagem");
const loginLink = document.querySelector("#loginLink");

if (user) {
  loginLink.textContent = user.name;
  loginLink.href = "#";
}

function exigirLogin() {
  if (user) return true;
  window.location.href = "/";
  return false;
}

async function api(url, options = {}) {
  const resposta = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  const corpo = resposta.status === 204 ? null : await resposta.json();
  if (!resposta.ok) throw new Error(corpo?.message || "Erro na requisicao.");
  return corpo;
}

async function carregarLivros() {
  const livros = await api(`/api/books${user ? `?userId=${user.id}` : ""}`);
  livroSelect.innerHTML = "";
  livros.forEach((livro) => {
    const opt = document.createElement("option");
    opt.value = livro.id;
    opt.textContent = `${livro.title} (${livro.ratingAverage || 0} estrelas)`;
    livroSelect.appendChild(opt);
  });
  await carregarComentarios();
}

async function carregarComentarios() {
  const comments = await api(`/api/comments?bookId=${livroSelect.value}`);
  lista.innerHTML = comments.length ? "" : "<article><strong>Nenhum comentário ainda.</strong><span>Seja o primeiro.</span></article>";
  comments.forEach((comment) => {
    const article = document.createElement("article");
    article.innerHTML = `<strong>“${comment.message}”</strong><span>${comment.userName} · ${comment.createdAt}</span>`;
    lista.appendChild(article);
  });
}

document.querySelector("#comentarioForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!exigirLogin()) return;
  try {
    const rating = document.querySelector("#rating").value;
    if (rating) {
      await api(`/api/books/${livroSelect.value}/rating`, {
        method: "POST",
        body: JSON.stringify({ userId: user.id, rating: Number(rating) })
      });
    }
    const message = document.querySelector("#message").value.trim();
    if (message) {
      await api("/api/comments", {
        method: "POST",
        body: JSON.stringify({ userId: user.id, bookId: Number(livroSelect.value), message })
      });
    }
    document.querySelector("#message").value = "";
    mensagem.textContent = "Comentário/avaliação salvo.";
    await carregarComentarios();
  } catch (error) {
    mensagem.textContent = error.message;
  }
});

document.querySelector("#likeBtn").addEventListener("click", async () => {
  if (!exigirLogin()) return;
  await api(`/api/books/${livroSelect.value}/like`, { method: "POST", body: JSON.stringify({ userId: user.id }) });
  mensagem.textContent = "Like atualizado.";
});

document.querySelector("#favBtn").addEventListener("click", async () => {
  if (!exigirLogin()) return;
  await api(`/api/books/${livroSelect.value}/favorite`, { method: "POST", body: JSON.stringify({ userId: user.id }) });
  mensagem.textContent = "Favorito atualizado.";
});

livroSelect.addEventListener("change", carregarComentarios);
carregarLivros();
