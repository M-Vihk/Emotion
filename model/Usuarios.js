export class Usuario {
    constructor(id, nome, dataDeNascimento, genero) {
        this.id = id;
        this.nome = nome;
        this.dataDeNascimento = dataDeNascimento;
        this.genero = genero;
        if (this.dadosValidos() != true) {
            throw new Error("dados invalidos");
        }
    }
    dadosValidos() {
        if (this.nome == "" || this.nome.length < 2)
            return false;
        if (this.dataDeNascimento == '')
            return false;
        if (this.genero != 'masculino' && this.genero != 'feminino' && this.genero != 'outro')
            return false;
        return true;
    }
}
