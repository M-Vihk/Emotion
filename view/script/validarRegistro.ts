import { SupabaseService } from "../../service/SupabaseService";
import { MensagemView } from "../components/MensagemView";

async function verificarUsuarioLogado() {
  const user = await SupabaseService.getUsuarioAutenticado();

  if (!user) {
    alert("Usuário não logado!");
    window.location.href = "login.html";
    return false;
  }
  return true;
}

verificarUsuarioLogado();

const divMensagem : HTMLDivElement = document.querySelector("#resultado") as HTMLDivElement;

const mensagem : MensagemView = new MensagemView(divMensagem);

let btnEnviar : HTMLButtonElement = document.getElementById("btn-enviar") as HTMLButtonElement;

btnEnviar.onclick = async (e: MouseEvent) => {
  e.preventDefault();

  console.log("Botão Enviar clicado");

  const alegria: number = Number((document.querySelector('input[name="alegria"]:checked') as HTMLInputElement)?.value);
  const tristeza: number = Number((document.querySelector('input[name="tristeza"]:checked') as HTMLInputElement)?.value);
  const ansiedade: number = Number((document.querySelector('input[name="ansiedade"]:checked') as HTMLInputElement)?.value);
  const raiva: number = Number((document.querySelector('input[name="raiva"]:checked') as HTMLInputElement)?.value);
  const medo: number = Number((document.querySelector('input[name="medo"]:checked') as HTMLInputElement)?.value);

  if (!alegria || !tristeza || !ansiedade || !raiva || !medo) {
    mensagem.mostrarErro("Por favor, selecione uma nota para todas as emoções.");
    return;
  }

  try {
    await SupabaseService.salvarEmocoes(alegria, tristeza, ansiedade, raiva, medo);
    mensagem.mostrarSucesso("Emoções salvas com sucesso!");
  } catch (error) {
    mensagem.mostrarErro("Erro ao salvar emoções. Tente novamente.");
  }
};
