CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    data_nascimento DATE,
    genero VARCHAR(20)
);

CREATE TABLE emocoes (
    id_emocao SERIAL PRIMARY KEY,
    id_usuario SERIAL,
    data_registro DATE,
    alegria INT,
    tristeza INT,
    raiva INT,
    medo INT,
    ansiedade INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);