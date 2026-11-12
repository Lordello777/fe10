
// ============================================
// PROJETO LGPD - CLÍNICA VIDA
// ============================================

const UM_ANO = 60 * 60 * 24 * 365;

// Gravar cookie
function gravarCookie(nome, valor) {
  document.cookie =
    nome + "=" + encodeURIComponent(valor) +
    "; max-age=" + UM_ANO +
    "; path=/; SameSite=Lax";
}

// Ler cookie
function getCookie(nome) {
  const cookies = document.cookie.split("; ");

  for (let item of cookies) {
    const partes = item.split("=");
    const chave = partes.shift();

    if (chave === nome) {
      return decodeURIComponent(partes.join("="));
    }
  }

  return null;
}

// Salvar todas as preferências
function salvarCookies(analise, marketing, tipo) {
  gravarCookie("consentimento_lgpd", tipo);
  gravarCookie("cat_essenciais", "sim");
  gravarCookie("cat_analise", analise);
  gravarCookie("cat_marketing", marketing);

  fecharBanner();
  atualizarPainel();
}

// Aceitar todos
function aceitarTodos() {
  salvarCookies("sim", "sim", "todos");
}

// Aceitar apenas essenciais
function aceitarApenasEssenciais() {
  salvarCookies("nao", "nao", "essenciais");
}

// Salvar seleção personalizada
function salvarSelecao() {
  const analise =
    document.getElementById("chk-analise").checked
      ? "sim" : "nao";

  const marketing =
    document.getElementById("chk-marketing").checked
      ? "sim" : "nao";

  salvarCookies(analise, marketing, "personalizado");
}

// Fechar banner
function fecharBanner() {
  document.getElementById("banner").classList.add("oculto");
  document.getElementById("fundo-banner").classList.add("oculto");
}

// Abrir banner novamente
function reabrirPreferencias() {
  document.getElementById("chk-analise").checked =
    getCookie("cat_analise") === "sim";

  document.getElementById("chk-marketing").checked =
    getCookie("cat_marketing") === "sim";

  document.getElementById("banner").classList.remove("oculto");
  document.getElementById("fundo-banner").classList.remove("oculto");
}

// Atualizar painel de status
function atualizarPainel() {
  const consentimento = getCookie("consentimento_lgpd");

  const analise =
    getCookie("cat_analise") === "sim"
      ? "Ativo" : "Bloqueado";

  const marketing =
    getCookie("cat_marketing") === "sim"
      ? "Ativo" : "Bloqueado";

  document.getElementById("painel-status").innerHTML = `
    <h2>Status do consentimento</h2>
    <p><strong>Consentimento:</strong> ${consentimento || "Pendente"}</p>
    <p><strong>Essenciais:</strong> Sempre ativos</p>
    <p><strong>Análise:</strong> ${analise}</p>
    <p><strong>Marketing:</strong> ${marketing}</p>
  `;
}

// Verificar consentimento quando a página carregar
window.addEventListener("DOMContentLoaded", function() {
  const consentimento = getCookie("consentimento_lgpd");

  if (consentimento) {
    fecharBanner();
  }

  atualizarPainel();
});
