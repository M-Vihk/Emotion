var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SupabaseService } from "../../service/SupabaseService.js";
import { MensagemView } from "../components/MensagemView.js";
const form = document.querySelector("#form-login");
const divMensagem = document.querySelector("#mensagem");
const mensagem = new MensagemView(divMensagem);
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmar-senha").value;
    const dataNasc = document.querySelector("#data-nascimento").value;
    const genero = document.querySelector("#genero").value;
    if (senha != confirmarSenha) {
        mensagem.mostrarErro("As senhas não coincidem.");
        return;
    }
    if (!nome || !dataNasc || !genero) {
        mensagem.mostrarErro("Preencha todos os campos.");
        return;
    }
    try {
        SupabaseService.salvarNoBanco(nome, email, senha, dataNasc, genero);
    }
    catch (error) {
        mensagem.mostrarErro(error.message || 'Erro inesperado ao criar usuário.');
    }
}));
