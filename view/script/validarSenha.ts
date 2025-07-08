const form = document.getElementById("formCadastro") as HTMLFormElement;
const senha = document.getElementById("senha") as HTMLInputElement;
const confirmar = document.getElementById("confirmarSenha") as HTMLInputElement;

form.addEventListener("submit", function (event) {
  if (senha.value !== confirmar.value) {
    alert("As senhas não são iguais.");
    event.preventDefault(); // impede o envio do formulário
  } else {
    alert("Cadastro realizado com sucesso!");
  }
});
