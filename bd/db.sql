CREATE TABLE Categoria (
    IdCategoria INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Palabra (
    IdPalabra INT AUTO_INCREMENT PRIMARY KEY,
    Texto VARCHAR(255) NOT NULL,
    Categoria INT
);

CREATE TABLE PalabrasPorCategoria (
    IdPalabra INT,
    IdCategoria INT,
    FOREIGN KEY (IdPalabra) REFERENCES Palabra(IdPalabra),
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria),
    PRIMARY KEY (IdPalabra, IdCategoria)
);

CREATE TABLE SalaDeJuego (
    IdSala INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    IdCategoria INT,
    Estado CHECK (Estado IN ('Sin iniciar', 'En curso', 'Finalizado')),
    FOREIGN KEY (IdCategoria) REFERENCES Categoria (IdCategoria)
);