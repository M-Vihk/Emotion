import { SupabaseService } from "../../service/SupabaseService";
import { MensagemView } from "../components/MensagemView";

const form = document.querySelector("#form-login") as HTMLFormElement;
const divMensagem = document.querySelector("#mensagem") as HTMLDivElement;

const mensagem = new MensagemView(divMensagem);

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
  const senha = (document.querySelector("#senha") as HTMLInputElement).value;

  if (!email || !senha) {
    mensagem.mostrarErro("Preencha todos os campos.");
    return;
  }

  try{
    await SupabaseService.fazerLogin(email, senha);
    console.log("Usuário logado com sucesso!");
  } 
  catch (err: any) {
    mensagem.mostrarErro(err.message || 'Erro inesperado ao fazer login.');
    console.log(err);
  }

});
