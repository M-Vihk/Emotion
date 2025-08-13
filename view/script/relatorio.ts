import { SupabaseService } from "../../service/SupabaseService";
export async function gerarRelatorioEmocional(): Promise<any> {
  try {
    const user = await SupabaseService.getUsuarioAutenticado();
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const registros = await SupabaseService.getUltimosRegistrosEmocionais(
      user.id
    );

    if (registros.length == 0) {
      throw new Error(
        "Nenhum registro emocional encontrado para gerar relatório."
      );
    }

    const soma = { alegria: 0, tristeza: 0, medo: 0, ansiedade: 0, raiva: 0 };
    registros.forEach((r) => {
      soma.alegria += r.alegria || 0;
      soma.tristeza += r.tristeza || 0;
      soma.medo += r.medo || 0;
      soma.ansiedade += r.ansiedade || 0;
      soma.raiva += r.raiva || 0;
    });

    const total: number = registros.length;
    const medias = {
      alegria: soma.alegria / total,
      tristeza: soma.tristeza / total,
      medo: soma.medo / total,
      ansiedade: soma.ansiedade / total,
      raiva: soma.raiva / total,
    };

    await SupabaseService.salvarRelatorio(user.id, medias);

    console.log("Relatório emocional gerado com sucesso!");
    return medias;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

async function gerarRelatorioComSugestao() {
  try {
    const medias = await gerarRelatorioEmocional();

    let emocaoPrincipal: string = "";
    let maiorMedia: number = 0;

    for (const emocao in medias) {
      if (medias[emocao] > maiorMedia) {
        maiorMedia = medias[emocao];
        emocaoPrincipal = emocao;
      }
    }

    const sugestoes = await SupabaseService.getSugestaoPorEmocao(
      emocaoPrincipal
    );

    const sugestaoAleatoria =
      sugestoes.length > 0
        ? sugestoes[Math.floor(Math.random() * sugestoes.length)]
        : null;

    const listaMedias: HTMLUListElement = document.getElementById(
      "lista-medias"
    ) as HTMLUListElement;

    for (const emocao in medias) {
      const li = document.createElement("li");
      li.textContent = `${emocao}: ${medias[emocao].toFixed(2)}`;
      listaMedias.appendChild(li);
    }

    const sugestaoElement = document.getElementById(
      "sugestao"
    ) as HTMLParagraphElement;
    sugestaoElement.textContent = sugestaoAleatoria;
  } catch (err: any) {
    console.error("Erro ao gerar relatório:", err.message);
  }
}

const btnGerarRelatorio: HTMLButtonElement = document.getElementById(
  "gerar-relatorio"
) as HTMLButtonElement;
btnGerarRelatorio.onclick = gerarRelatorioComSugestao;
