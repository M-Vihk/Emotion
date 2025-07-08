export let usuarioFake = {
    nome: "Vitória",
    email: "vitoria@email.com",
    nascimento: "1995-08-12",
    sexo: "Feminino",
    biografia: "Desenvolvedora Front-End com ênfase em acessibilidade e usabilidade. Apaixonada por design centrado no usuário e interfaces responsivas. 5 anos de experiência em tecnologia.",
};
// Função simulada para editar o usuário
export function atualizarUsuario(dados) {
    usuarioFake = Object.assign({}, dados);
    console.log("Usuário atualizado:", usuarioFake);
}
