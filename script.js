const menuBotao = document.querySelector(".menu-botao");
const menu = document.querySelector(".menu");

document.body.classList.add("carregado");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  });
});

const botoesFiltro = document.querySelectorAll("[data-filtro]");
const livros = document.querySelectorAll(".card-livro");
const contador = document.querySelector("#contador");

function atualizarContador() {
  const visiveis = document.querySelectorAll(".card-livro:not(.escondido)").length;
  contador.textContent = visiveis;
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    const filtro = botao.dataset.filtro;

    botoesFiltro.forEach((item) => item.classList.remove("ativo"));
    botao.classList.add("ativo");

    livros.forEach((livro) => {
      const aparece = filtro === "todos" || livro.dataset.categoria === filtro;
      livro.classList.toggle("escondido", !aparece);
    });

    atualizarContador();
  });
});

const botaoReserva = document.querySelector("#reservar");
const campoLivro = document.querySelector("#livro");
const mensagem = document.querySelector(".mensagem");

botaoReserva.addEventListener("click", () => {
  mensagem.textContent = `Reserva de "${campoLivro.value}" registrada para retirada na biblioteca.`;
  mensagem.classList.remove("animar");
  void mensagem.offsetWidth;
  mensagem.classList.add("animar");
});

document.querySelectorAll(".favorito").forEach((botao) => {
  botao.addEventListener("click", () => {
    const ativo = botao.classList.toggle("ativo");
    botao.textContent = ativo ? "★" : "☆";
  });
});

const barraLeitura = document.querySelector(".barra-leitura");

function atualizarBarra() {
  const altura = document.documentElement.scrollHeight - window.innerHeight;
  const progresso = altura > 0 ? (window.scrollY / altura) * 100 : 0;
  barraLeitura.style.width = `${progresso}%`;
}

window.addEventListener("scroll", atualizarBarra);
atualizarBarra();

const elementosRevelar = document.querySelectorAll(".revelar");
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
    }
  });
}, { threshold: 0.18 });

elementosRevelar.forEach((elemento) => observador.observe(elemento));

const livros3d = document.querySelectorAll(".livro-3d");
const destaqueSelecionado = document.querySelector(".destaque-selecionado strong");
const tituloHero = document.querySelector(".livro-grande h2");
const capaHero = document.querySelector(".livro-grande .capa strong");
const generoHero = document.querySelector(".livro-grande .capa span");

livros3d.forEach((livro) => {
  livro.addEventListener("click", () => {
    livros3d.forEach((item) => item.classList.remove("ativo"));
    livro.classList.add("ativo");

    destaqueSelecionado.textContent = livro.dataset.destaque;
    tituloHero.textContent = livro.dataset.destaque;
    capaHero.textContent = livro.dataset.destaque;
    generoHero.textContent = livro.dataset.genero;
  });
});

atualizarContador();
