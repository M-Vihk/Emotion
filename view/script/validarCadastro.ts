import { SupabaseService } from "../../service/SupabaseService.js";
import { MensagemView } from "../components/MensagemView.js";

const form = document.querySelector("#form-login") as HTMLFormElement;
const divMensagem = document.querySelector("#mensagem") as HTMLDivElement;

const mensagem = new MensagemView(divMensagem);

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const nome = (document.querySelector("#nome") as HTMLInputElement).value.trim();
  const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
  const senha = (document.querySelector("#senha") as HTMLInputElement).value;
  const confirmarSenha = (document.querySelector("#confirmar-senha") as HTMLInputElement).value;
  const dataNasc = (document.querySelector("#data-nascimento") as HTMLInputElement).value;
  const genero = (document.querySelector("#genero") as HTMLSelectElement).value;

  if (senha != confirmarSenha) {
    mensagem.mostrarErro("As senhas não coincidem.");
    return;
  }

  if (!nome || !dataNasc || !genero) {
    mensagem.mostrarErro("Preencha todos os campos.");
    return;
  }
  try {
    await SupabaseService.salvarNoBanco(nome,email,senha, dataNasc, genero);
    window.location.href = "./PaginaInicial.html";

  } catch (error: any) {
    mensagem.mostrarErro(error.message || 'Erro inesperado ao criar usuário.');
  }

});
