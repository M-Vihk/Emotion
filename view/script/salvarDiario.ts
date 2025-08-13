import { SupabaseService } from "../../service/SupabaseService";

let diarioAtualId: string | null = null;

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

      entradaDiv.addEventListener('click', () => {
        carregarDiarioNoFormulario(diario);
      });

      historicoContainer.appendChild(entradaDiv);
    });
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    historicoContainer.innerHTML = '<p>Erro ao carregar histórico de diários.</p>';
  }
}

function carregarDiarioNoFormulario(diario: any) {
  const tituloInput = document.getElementById("titulo-diario") as HTMLInputElement;
  const dataInput = document.getElementById("entry-date") as HTMLInputElement;
  const pensamentosInput = document.getElementById("diario") as HTMLTextAreaElement;

  tituloInput.value = diario.titulo;
  dataInput.value = diario.data;
  pensamentosInput.value = diario.pensamentos;

  diarioAtualId = diario.id;
}

function limparFormulario() {
  const tituloInput = document.getElementById("titulo-diario") as HTMLInputElement;
  const dataInput = document.getElementById("entry-date") as HTMLInputElement;
  const pensamentosInput = document.getElementById("diario") as HTMLTextAreaElement;

  tituloInput.value = "";
  dataInput.value = "";
  pensamentosInput.value = "";

  diarioAtualId = null;
}

async function salvarDiario() {
  const tituloInput = document.getElementById("titulo-diario") as HTMLInputElement;
  const dataInput = document.getElementById("entry-date") as HTMLInputElement;
  const pensamentosInput = document.getElementById("diario") as HTMLTextAreaElement;

  const titulo = tituloInput.value.trim();
  const data = dataInput.value;
  const pensamentos = pensamentosInput.value.trim();

  if (!titulo || !data || !pensamentos) {
    alert("Por favor, preencha todos os campos antes de salvar.");
    return;
  }

  try {
    await SupabaseService.salvarDiario(titulo, data, pensamentos);
    alert("Diário salvo com sucesso!");

    limparFormulario();
    await mostrarHistorico();

  } catch (error: any) {
    alert("Erro ao salvar diário: " + error.message);
  }
}

async function excluirDiarioAtual() {
  if (!diarioAtualId) {
    alert('Nenhum diário selecionado para exclusão.');
    return;
  }

  if (!confirm('Tem certeza que deseja excluir o diário atual?')) {
    return;
  }

  try {
    await SupabaseService.excluirDiario(diarioAtualId);
    alert('Diário excluído com sucesso!');
    limparFormulario();
    await mostrarHistorico();
  } catch (error: any) {
    alert('Erro ao excluir diário: ' + error.message);
  }
}

async function excluirTodosDiarios() {
  if (!confirm('Tem certeza que deseja excluir TODOS os diários? Esta ação não pode ser desfeita.')) {
    return;
  }

  try {
    const user = await SupabaseService.getUsuarioAtual();
    if (!user) {
      alert('Usuário não autenticado.');
      return;
    }

    await SupabaseService.excluirTodosDiarios(user.id);
    alert('Todos os diários foram excluídos!');
    limparFormulario();
    await mostrarHistorico();
  } catch (error: any) {
    alert('Erro ao excluir todos os diários: ' + error.message);
  }
}

const btnSalvar = document.getElementById("salvar") as HTMLButtonElement;
btnSalvar.onclick = salvarDiario;

const btnExcluir = document.getElementById("excluir") as HTMLButtonElement;
btnExcluir.onclick = excluirDiarioAtual;

const btnExcluirTodos = document.getElementById("excluir-todos") as HTMLButtonElement;
btnExcluirTodos.onclick = excluirTodosDiarios;

document.addEventListener('DOMContentLoaded', () => {
  mostrarHistorico();
});
