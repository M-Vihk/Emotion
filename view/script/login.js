"use strict";
const form = document.querySelector("#form-login");
const mensagem = document.querySelector("#mensagem");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;
    const dadosSalvos = localStorage.getItem("usuarioCadastrado");
    if (!dadosSalvos) {
        mostrarErro("Nenhum usuário cadastrado.");
        return;
    }
    const usuario = JSON.parse(dadosSalvos);
    if (email === usuario.email && senha === usuario.senha) {
        console.log("Login bem-sucedido!");
        window.location.href = "/view/html/PaginaInicial.html"; // ou outra página inicial
    }
    else {
        mostrarErro("Email ou senha incorretos.");
    }
});
function mostrarErro(msg) {
    mensagem.textContent = msg;
    mensagem.style.display = "block";
    mensagem.style.color = "red";
}
