const form = document.querySelector("#form-login") as HTMLFormElement;
const mensagem = document.querySelector("#mensagem") as HTMLDivElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
  const senha = (document.querySelector("#senha") as HTMLInputElement).value;

  const dadosSalvos = localStorage.getItem("usuarioCadastrado");

  if (!dadosSalvos) {
    mostrarErro("Nenhum usuário cadastrado.");
    return;
  }

  const usuario = JSON.parse(dadosSalvos);

  if (email === usuario.email && senha === usuario.senha) {
    console.log("Login bem-sucedido!");
    window.location.href = "/view/html/PaginaInicial.html"; // ou outra página inicial
  } else {
    mostrarErro("Email ou senha incorretos.");
  }
});

function mostrarErro(msg: string): void {
  mensagem.textContent = msg;
  mensagem.style.display = "block";
  mensagem.style.color = "red";
}
