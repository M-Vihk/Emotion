import { Usuario } from "../../model/Usuarios.js"; // certifique-se que o nome está certo!
const form = document.querySelector("#form-login");
const mensagem = document.querySelector("#mensagem");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmar-senha").value;
    const dataNasc = document.querySelector("#data-nascimento").value;
    const genero = document.querySelector("#genero").value;
    if (senha !== confirmarSenha) {
        mostrarErro("As senhas não coincidem.");
        return;
    }
    if (!nome || !dataNasc || !genero) {
        mostrarErro("Preencha todos os campos.");
        return;
    }
    const id = crypto.randomUUID();
    try {
        const usuario = new Usuario(id, nome, dataNasc, genero);
        // 🔽 Aqui você salva no localStorage
        const usuarioParaSalvar = {
            id,
            nome,
            email,
            senha,
            dataDeNascimento: dataNasc,
            genero,
        };
        localStorage.setItem("usuarioCadastrado", JSON.stringify(usuarioParaSalvar));
        console.log("Usuário salvo com sucesso:", usuarioParaSalvar);
        // Redirecionar para a página inicial
        window.location.href = "/view/html/PaginaInicial.html";
    }
    catch (erro) {
        mostrarErro(erro.message || "Erro ao criar usuário.");
    }
});
function mostrarErro(msg) {
    mensagem.textContent = msg;
    mensagem.style.display = "block";
    mensagem.style.color = "red";
}
