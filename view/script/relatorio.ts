import { SupabaseService } from "../../service/SupabaseService";

export async function gerarRelatorioEmocional() {
  try {
    const user = await SupabaseService.getUsuarioAutenticado();
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const registros = await SupabaseService.getUltimosRegistrosEmocionais(user.id);

    if (registros.length == 0) {
      throw new Error("Nenhum registro emocional encontrado para gerar relatório.");
    }

    const soma = { alegria: 0, tristeza: 0, medo: 0, ansiedade: 0, raiva: 0 };
    registros.forEach(r => {
      soma.alegria += r.alegria || 0;
      soma.tristeza += r.tristeza || 0;
      soma.medo += r.medo || 0;
      soma.ansiedade += r.ansiedade || 0;
      soma.raiva += r.raiva || 0;
    });

    const total : number = registros.length;
    const medias = {
      alegria: soma.alegria / total,
      tristeza: soma.tristeza / total,
      medo: soma.medo / total,
      ansiedade: soma.ansiedade / total,
      raiva: soma.raiva / total
    };

    await SupabaseService.salvarRelatorio(user.id, medias);

    console.log("Relatório emocional gerado com sucesso!");
    return medias;

  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

const btnGerarRelatorio : HTMLButtonElement= document.getElementById("gerar-relatorio") as HTMLButtonElement;
btnGerarRelatorio.onclick = gerarRelatorioEmocional