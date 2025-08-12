import { SupabaseService } from "../../service/SupabaseService";

async function salvarDiario() {
  const tituloInput : HTMLInputElement = document.getElementById("titulo-diario") as HTMLInputElement;
  const dataInput : HTMLInputElement = document.getElementById("entry-date") as HTMLInputElement;
  const pensamentosInput : HTMLTextAreaElement = document.getElementById("diario") as HTMLTextAreaElement;

  const titulo : string = tituloInput.value.trim();
  const data : string = dataInput.value;
  const pensamentos : string = pensamentosInput.value.trim();

  if (!titulo || !data || !pensamentos) {
    alert("Por favor, preencha todos os campos antes de salvar.");
    return;
  }

  try {
    await SupabaseService.salvarDiario(titulo, data, pensamentos);
    alert("Diário salvo com sucesso!");

    tituloInput.value = "";
    dataInput.value = "";
    pensamentosInput.value = "";

  } catch (error: any) {
    alert("Erro ao salvar diário: " + error.message);
  }
}

const btnSalvar : HTMLButtonElement = document.getElementById("salvar") as HTMLButtonElement;
btnSalvar.onclick = salvarDiario;
