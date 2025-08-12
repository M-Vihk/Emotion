import { SupabaseService } from "../../service/SupabaseService";
import { MensagemView } from "../components/MensagemView";

const form = document.querySelector("#formEmocoes") as HTMLFormElement;
const divMensagem = document.querySelector("#resultado") as HTMLDivElement;

const mensagem = new MensagemView(divMensagem);

let btnEnviar = document.getElementById("btn-enviar") as HTMLButtonElement;

btnEnviar.onclick = async (e: MouseEvent) => {
  e.preventDefault(); // evita submit automático do formulário

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
