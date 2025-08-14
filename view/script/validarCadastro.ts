import { SupabaseService } from "../../service/SupabaseService";
import { MensagemView } from "../components/MensagemView";

const form = document.querySelector("#form-login") as HTMLFormElement;
const divMensagem = document.querySelector("#mensagem") as HTMLDivElement;

const mensagem = new MensagemView(divMensagem);

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const nome : string = (document.querySelector("#nome") as HTMLInputElement).value.trim();
  const email : string = (document.querySelector("#email") as HTMLInputElement).value.trim();
  const senha : string = (document.querySelector("#senha") as HTMLInputElement).value;
  const confirmarSenha : string = (document.querySelector("#confirmar-senha") as HTMLInputElement).value;
  const dataNasc : string = (document.querySelector("#data-nascimento") as HTMLInputElement).value;
  const genero : string = (document.querySelector("#genero") as HTMLSelectElement).value;

  // === Validação do Nome ===
  if (!nome) {
    mensagem.mostrarErro("O nome de usuário não pode estar vazio.");
    return;
  }
  if (nome.length > 15) {
    mensagem.mostrarErro("O nome de usuário deve ter no máximo 15 caracteres.");
    return;
  }

  // === Validação de Senha ===
  if (!senha) {
    mensagem.mostrarErro("A senha não pode estar vazia.");
    return;
  }

  // Critérios da senha:
  const regexSenha : RegExp = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

  if (!regexSenha.test(senha)) {
    mensagem.mostrarErro(
      "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 2 números, 1 caractere especial (!@#$%^&*), 1 letra maiúscula e 1 letra minúscula."
    );
    return;
  }

  // === Confirmar Senha ===
  if (senha != confirmarSenha) {
    mensagem.mostrarErro("As senhas não coincidem.");
    return;
  }

  // === Campos obrigatórios ===
  if (!dataNasc || !genero) {
    mensagem.mostrarErro("Preencha todos os campos.");
    return;
  }

  try {
    await SupabaseService.salvarNoBanco(nome, email, senha, dataNasc, genero);
    window.location.href = "./PaginaInicial.html";
  } catch (error: any) {
    mensagem.mostrarErro(error.message || "Erro inesperado ao criar usuário.");
  }
});
