const user = JSON.parse(localStorage.getItem("libraryboxUser") || "null");
const grade = document.querySelector("#reservasGrade");
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

function capa(index) {
  return ["capa-terracota", "capa-verde", "capa-amarela", "capa-azul"][index % 4];
}

async function carregar() {
  const livros = await api(`/api/books${user ? `?userId=${user.id}` : ""}`);
  grade.innerHTML = "";
  livros.forEach((livro, index) => {
    const card = document.createElement("article");
    card.className = "card-livro revelar visivel";
    card.innerHTML = `
      <div class="capa ${capa(index)}"><span>${livro.category}</span><strong>${livro.title}</strong></div>
      <h3>${livro.title}</h3>
      <p>${livro.author}</p>
      <span class="status ${livro.status === "Disponivel" ? "disponivel" : "reservado"}">${livro.status}</span>
      <button class="botao primario reservar-card" type="button">Solicitar reserva</button>
      <p class="mensagem">Aguardando ação.</p>
    `;
    card.querySelector("button").addEventListener("click", async () => {
      if (!exigirLogin()) return;
      try {
        await api("/api/reservations", {
          method: "POST",
          body: JSON.stringify({ userId: user.id, bookId: livro.id })
        });
        card.querySelector(".mensagem").textContent = "Reserva salva com sucesso.";
        await carregar();
      } catch (error) {
        card.querySelector(".mensagem").textContent = error.message;
      }
    });
    grade.appendChild(card);
  });
}

carregar();
