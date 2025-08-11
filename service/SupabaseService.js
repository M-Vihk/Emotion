var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "./supabaseClient.js";
export class SupabaseService {
    static salvarNoBanco(nome, email, senha, dataNasc, genero) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { data, error } = yield supabase.auth.signUp({
                    email: email,
                    password: senha,
                });
                if (error) {
                    throw new Error("Erro ao cadastrar usuário: " + error.message);
                }
                const { error: insertError } = yield supabase.from("usuarios").insert([
                    {
                        id: (_a = data.user) === null || _a === void 0 ? void 0 : _a.id,
                        nome: nome,
                        nascimento: dataNasc,
                        genero: genero,
                    },
                ]);
                if (insertError) {
                    throw new Error("Erro ao salvar dados extra do usuario: " + insertError.message);
                }
                console.log("Usuário cadastrado com sucesso!", data.user);
            }
            catch (error) {
                throw new Error(error.message || "Erro inesperado ao criar usuário.");
            }
        });
    }
    static fazerLogin(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase.auth.signInWithPassword({
                    email: email,
                    password: senha,
                });
                if (error) {
                    throw new Error("Email ou senha inválidos.");
                }
                return data.user;
            }
            catch (err) {
                throw new Error(err.message || 'Erro inesperado ao fazer login.');
            }
        });
    }
}
