"use strict";
const form = document.getElementById("formCadastro");
const senha = document.getElementById("senha");
const confirmar = document.getElementById("confirmarSenha");
form.addEventListener("submit", function (event) {
    if (senha.value !== confirmar.value) {
        alert("As senhas não são iguais.");
        event.preventDefault(); // impede o envio do formulário
    }
    else {
        alert("Cadastro realizado com sucesso!");
    }
});
