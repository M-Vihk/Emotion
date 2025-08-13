import { SupabaseService } from "../../service/SupabaseService";

async function mostrarHistorico() {
  const historicoContainer = document.getElementById('historico-diarios');
  if (!historicoContainer) return;

  try {
    const diarios = await SupabaseService.listarDiarios();

    historicoContainer.innerHTML = '';

    if (diarios.length === 0) {
      historicoContainer.innerHTML = '<p>Nenhum diário registrado ainda.</p>';
      return;
    }

    diarios.forEach((diario) => {
      const entradaDiv = document.createElement('div');
      entradaDiv.className = 'entrada-item';

      const dataFormatada = new Date(diario.data).toLocaleDateString('pt-BR');

      entradaDiv.innerHTML = `
        <span><strong>${diario.titulo}</strong> - ${dataFormatada} <br>${diario.pensamentos}</span>
      `;

      historicoContainer.appendChild(entradaDiv);
    });
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    historicoContainer.innerHTML = '<p>Erro ao carregar histórico de diários.</p>';
  }
}

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

    // Atualiza o histórico logo após salvar
    await mostrarHistorico();

  } catch (error: any) {
    alert("Erro ao salvar diário: " + error.message);
  }
}

const btnSalvar : HTMLButtonElement = document.getElementById("salvar") as HTMLButtonElement;
btnSalvar.onclick = salvarDiario;

// Carrega o histórico ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
  mostrarHistorico();
});
