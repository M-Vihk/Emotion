import { SupabaseService } from "../../service/SupabaseService.js";

const form = document.querySelector("#form-login") as HTMLFormElement;
const mensagem = document.querySelector("#mensagem") as HTMLDivElement;

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const nome = (document.querySelector("#nome") as HTMLInputElement).value.trim();
  const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
  const senha = (document.querySelector("#senha") as HTMLInputElement).value;
  const confirmarSenha = (document.querySelector("#confirmar-senha") as HTMLInputElement).value;
  const dataNasc = (document.querySelector("#data-nascimento") as HTMLInputElement).value;
  const genero = (document.querySelector("#genero") as HTMLSelectElement).value;

  if (senha != confirmarSenha) {
    mostrarErro("As senhas não coincidem.");
    return;
  }

  if (!nome || !dataNasc || !genero) {
    mostrarErro("Preencha todos os campos.");
    return;
  }
  try {
    SupabaseService.salvarNoBanco(nome,email,senha, dataNasc, genero);
    window.location.href = "/view/html/PaginaInicial.html";
  } catch (error: any) {
    mostrarErro(error.message || 'Erro inesperado ao criar usuário.');
  }

});

function mostrarErro(msg: string): void {
  mensagem.textContent = msg;
  mensagem.style.display = "block";
  mensagem.style.color = "red";
}
