// Pega o elemento que contém todos os slides
const slidesContainer = document.querySelector('.slides');

// Pega todos os slides
const slides = document.querySelectorAll('.slide');

// Pega o botão "anterior"
const prevBtn = document.querySelector('.prev');

// Pega o botão "próximo"
const nextBtn = document.querySelector('.next');

// Guarda qual slide está sendo mostrado no momento
let indice = 0;

// Guarda o intervalo de tempo para o modo automático
let autoPlay;

// Função que mostra um slide específico
function mostrarSlide(index) {
    // Se o índice for menor que 0, volta para o último slide
    if (index < 0) indice = slides.length - 1;
    // Se o índice for maior ou igual ao número de slides, volta para o primeiro
    else if (index >= slides.length) indice = 0;
    // Caso contrário, usa o índice enviado
    else indice = index;

    // Move o container na horizontal
    slidesContainer.style.transform = `translateX(${-indice * 100}%)`;
}

// Função que inicia o modo automático de troca de slides
function iniciarAutoPlay() {
    // Para qualquer troca automática que já esteja rodando
    clearInterval(autoPlay);

    // Cria um novo intervalo que troca de slide a cada 5 segundos
    autoPlay = setInterval(() => {
        mostrarSlide(indice + 1); // Vai para o próximo slide
    }, 5000);
}

// Quando o botão "anterior" é clicado
prevBtn.addEventListener('click', () => {
    mostrarSlide(indice - 1); // Mostra o slide anterior
    iniciarAutoPlay(); // Reinicia o modo automático
});

// Quando o botão "próximo" é clicado
nextBtn.addEventListener('click', () => {
    mostrarSlide(indice + 1); // Mostra o próximo slide
    iniciarAutoPlay(); // Reinicia o modo automático
});

// Inicia o modo automático assim que a página abre
iniciarAutoPlay();

// Mostra o primeiro slide ao carregar a página
mostrarSlide(indice);
