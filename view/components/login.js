"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita envio do formulário
        if (email.value.trim() === '' || senha.value.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (email.value === 'admin@email.com' && senha.value === '123456') {
            alert('Login realizado com sucesso!');
            // Aqui você pode redirecionar se quiser
            window.location.href = '/view/HTMLs/PaginaInicial.html';
        }
        else {
            alert('Email ou senha incorretos.');
        }
    });
});
