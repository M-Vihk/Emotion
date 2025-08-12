import { SupabaseService } from "../../service/SupabaseService";

const btnSair : HTMLButtonElement = document.getElementById("btn-sair") as HTMLButtonElement;

async function carregarDadosDoUsuario() {
    const user = await SupabaseService.getUsuarioAutenticado();

    if (!user) {
        alert("Usuário não logado!");
        window.location.href = "login.html";
        return;
    }
    try {
        const dados = await SupabaseService.buscarDadosUsuario(user.id);

        (document.getElementById("nomeCompleto") as HTMLInputElement).value = dados.nome || "";
        (document.getElementById("email") as HTMLInputElement).value = dados.email || "";
        (document.getElementById("dataNasc") as HTMLInputElement).value = dados.nascimento || "";
        (document.getElementById("genero") as HTMLInputElement).value = dados.genero || "";
    } catch (error: any) {
        console.error(error.message);
    }
}

async function sair(){
    try {
        await SupabaseService.sair();
        window.location.href = "login.html";
    } catch (error: any) {
        console.error("Erro ao sair:", error.message);
    }
}

btnSair.onclick = () => sair();

carregarDadosDoUsuario();