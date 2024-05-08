const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: { 
      "openapi": "3.0.0",
      "info": {
        "title": "API de Backend de Pinturillo",
        "version": "1.0.0",
        "description": "Documentación de la API para la gestión de todas las funcionalidades del backend del juego Pinturillo, incluyendo categorías, salas de juego, palabras y asociaciones de palabras con categorías."
      },
      "servers": [
        {
          "url": "http://localhost:3000/api/v1"
        }
      ],
      "components": {
        "schemas": {
          "Category": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "Identificador único de la categoría"
              },
              "name": {
                "type": "string",
                "description": "Nombre de la categoría"
              }
            }
          },
          "GameRoom": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "Identificador único para la sala de juego"
              },
              "room_name": {
                "type": "string",
                "description": "Nombre de la sala de juego"
              },
              "state": {
                "type": "string",
                "description": "Estado de la sala de juego"
              },
              "id_category": {
                "type": "string",
                "description": "Categoría asociada con la sala de juego"
              }
            }
          },
          "Word": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "Identificador único de la palabra"
              },
              "text": {
                "type": "string",
                "description": "Texto de la palabra"
              }
            }
          },
          "WordCategory": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "Identificador único de la asociación de palabra-categoría"
              },
              "id_word": {
                "type": "string",
                "description": "Identificador de la palabra asociada"
              },
              "id_category": {
                "type": "string",
                "description": "Identificador de la categoría asociada"
              }
            }
          }
        }
      },
      "paths": {
        "/categories": {
          "get": {
            "summary": "Recupera todas las categorías",
            "tags": [
              "Categorías"
            ],
            "responses": {
              "200": {
                "description": "Lista de categorías",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Category"
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "summary": "Crea una nueva categoría",
            "tags": [
              "Categorías"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Categoría creada exitosamente"
              }
            }
          }
        },
        "/categories/{id}": {
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Recupera una categoría por ID",
            "tags": [
              "Categorías"
            ],
            "responses": {
              "200": {
                "description": "Detalles de la categoría",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Category"
                    }
                  }
                }
              },
              "404": {
                "description": "Categoría no encontrada"
              }
            }
          },
          "put": {
            "summary": "Actualiza una categoría existente",
            "tags": [
              "Categorías"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Categoría actualizada exitosamente"
              },
              "400": {
                "description": "Datos de entrada inválidos"
              },
              "404": {
                "description": "Categoría no encontrada"
              }
            }
          },
          "delete": {
            "summary": "Elimina una categoría",
            "tags": [
              "Categorías"
            ],
            "responses": {
              "204": {
                "description": "Categoría eliminada exitosamente"
              },
              "404": {
                "description": "Categoría no encontrada"
              }
            }
          }
        },
        "/categories/by-name/{name}": {
          "parameters": [
            {
              "in": "path",
              "name": "name",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Recupera una categoría por nombre",
            "tags": [
              "Categorías"
            ],
            "responses": {
              "200": {
                "description": "Detalles de la categoría encontrada por nombre",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Category"
                    }
                  }
                }
              },
              "404": {
                "description": "Categoría no encontrada"
              }
            }
          }
        },
        "/game-rooms": {
          "get": {
            "summary": "Lista todas las salas de juego",
            "tags": [
              "Salas de Juego"
            ],
            "responses": {
              "200": {
                "description": "Listado de todas las salas de juego disponibles",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/GameRoom"
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "summary": "Crea una nueva sala de juego",
            "tags": [
              "Salas de Juego"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GameRoom"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Sala de juego creada exitosamente"
              },
              "400": {
                "description": "Solicitud inválida debido a datos de entrada incorrectos"
              }
            }
          }
        },
        "/game-rooms/{id}": {
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Obtiene detalles de una sala de juego específica por su ID",
            "tags": [
              "Salas de Juego"
            ],
            "responses": {
              "200": {
                "description": "Detalles de la sala de juego",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/GameRoom"
                    }
                  }
                }
              },
              "404": {
                "description": "Sala de juego no encontrada"
              }
            }
          },
          "put": {
            "summary": "Actualiza una sala de juego existente",
            "tags": [
              "Salas de Juego"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GameRoom"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Sala de juego actualizada exitosamente"
              },
              "400": {
                "description": "Datos de entrada inválidos"
              },
              "404": {
                "description": "Sala de juego no encontrada"
              }
            }
          },
          "delete": {
            "summary": "Elimina una sala de juego",
            "tags": [
              "Salas de Juego"
            ],
            "responses": {
              "204": {
                "description": "Sala de juego eliminada exitosamente"
              },
              "404": {
                "description": "Sala de juego no encontrada"
              }
            }
          }
        },
        "/game-rooms/by-category/{id_category}": {
          "parameters": [
            {
              "in": "path",
              "name": "id_category",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Lista todas las salas de juego por ID de categoría",
            "tags": [
              "Salas de Juego"
            ],
            "responses": {
              "200": {
                "description": "Salas de juego encontradas para la categoría especificada",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/GameRoom"
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "No se encontraron salas de juego para esta categoría"
              },
              "500": {
                "description": "Error interno del servidor"
              }
            }
          }
        },
        "/words": {
          "get": {
            "summary": "Lista todas las palabras",
            "tags": [
              "Palabras"
            ],
            "responses": {
              "200": {
                "description": "Listado de todas las palabras disponibles",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Word"
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "summary": "Crea una nueva palabra",
            "tags": [
              "Palabras"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Word"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Palabra creada exitosamente"
              },
              "400": {
                "description": "Solicitud inválida debido a datos de entrada incorrectos"
              }
            }
          }
        },
        "/words/{id}": {
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Obtiene los detalles de una palabra específica por su ID",
            "tags": [
              "Palabras"
            ],
            "responses": {
              "200": {
                "description": "Detalles de la palabra",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Word"
                    }
                  }
                }
              },
              "404": {
                "description": "Palabra no encontrada"
              }
            }
          },
          "put": {
            "summary": "Actualiza una palabra existente",
            "tags": [
              "Palabras"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Word"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Palabra actualizada exitosamente"
              },
              "400": {
                "description": "Datos de entrada inválidos"
              },
              "404": {
                "description": "Palabra no encontrada"
              }
            }
          },
          "delete": {
            "summary": "Elimina una palabra",
            "tags": [
              "Palabras"
            ],
            "responses": {
              "204": {
                "description": "Palabra eliminada exitosamente"
              },
              "404": {
                "description": "Palabra no encontrada"
              }
            }
          }
        },
        "/words/by-text/{text}": {
          "parameters": [
            {
              "in": "path",
              "name": "text",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Obtiene los detalles de una palabra específica por su texto",
            "tags": [
              "Palabras"
            ],
            "responses": {
              "200": {
                "description": "Detalles de la palabra buscada por texto",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Word"
                    }
                  }
                }
              },
              "404": {
                "description": "Palabra no encontrada"
              }
            }
          }
        },
        "/word-categories": {
          "get": {
            "summary": "Recupera todas las categorías de palabras",
            "tags": [
              "Categorías de Palabras"
            ],
            "responses": {
              "200": {
                "description": "List of all word categories",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/WordCategory"
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error"
              }
            }
          },
          "post": {
            "summary": "Crea una nueva categoría de palabras",
            "tags": [
              "Categorías de Palabras"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WordCategory"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Word category created successfully"
              },
              "400": {
                "description": "Validation error with the provided data"
              },
              "500": {
                "description": "Internal server error"
              }
            }
          }
        },
        "/word-categories/{id}": {
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Obtiene detalles de una categoría de palabras específica por su ID",
            "tags": [
              "Categorías de Palabras"
            ],
            "responses": {
              "200": {
                "description": "Detalles de la categoría de palabras",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/WordCategory"
                    }
                  }
                }
              },
              "404": {
                "description": "Categoría de palabras no encontrada"
              }
            }
          },
          "put": {
            "summary": "Actualiza una categoría de palabras existente",
            "tags": [
              "Categorías de Palabras"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Word"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Categoría de palabras actualizada exitosamente"
              },
              "400": {
                "description": "Datos de entrada inválidos"
              },
              "404": {
                "description": "Categoría de palabras no encontrada"
              }
            }
          },
          "delete": {
            "summary": "Elimina una categoría de palabras",
            "tags": [
              "Categorías de Palabras"
            ],
            "responses": {
              "204": {
                "description": "Categoría de palabras eliminada exitosamente"
              },
              "404": {
                "description": "Categoría de palabras no encontrada"
              }
            }
          }
        },
        "/word-categories/by-word/{id_word}": {
          "parameters": [
            {
              "in": "path",
              "name": "id_word",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Recupera la categoría de palabras por ID de palabra",
            "tags": [
              "Categorías de Palabras"
            ],
            "responses": {
              "200": {
                "description": "Word category associated with the word ID",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/WordCategory"
                    }
                  }
                }
              },
              "404": {
                "description": "Word category not found for the specified word"
              },
              "500": {
                "description": "Internal server error"
              }
            }
          }
        },
        "/word-categories/by-category/{id_category}": {
          "parameters": [
            {
              "in": "path",
              "name": "id_category",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "get": {
            "summary": "Recupera categorías de palabras por ID de categoría",
            "tags": [
              "Categorías de Palabras"
            ],
            "responses": {
              "200": {
                "description": "Word categories associated with the category ID",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/WordCategory"
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "No word categories found for the specified category"
              },
              "500": {
                "description": "Internal server error"
              }
            }
          }
        }
      }
  },
  apis: ["./src/routes/*.js"]
}



const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;