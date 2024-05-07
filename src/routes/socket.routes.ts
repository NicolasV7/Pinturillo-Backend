import { SocketController } from "../controller/socket.controller";

const express = require('express');
const router = express.Router();

module.exports = (expressWs) => {
    const socketController = new SocketController();
    let tiempo = 0;
    expressWs.applyTo(router);

    let adivinado = [];

    router.ws('/room/:idSalaDeJuego',async (ws, req) => {
        const idSalaDeJuego = req.params.idSalaDeJuego;
        const userName = req.headers.username;
        let maxRondas = 1;

        if(!await socketController.verifyRoom(idSalaDeJuego, ws)){
            return;
        };

        await socketController.joinRoom( ws, userName, idSalaDeJuego);
        let turnosJugadores = socketController.assignATurn(idSalaDeJuego);
        const turnoJugador = await(socketController.playerTurn(idSalaDeJuego, ws));
        
        SocketController.rooms[idSalaDeJuego].forEach(client => {
            if (client.ws == ws){
                client.ws.send(`Tienes el turno ${turnoJugador}`);
            }
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                client.ws.send(`${userName} se ha unido a la sala de juego`);
            }
        }
    );
        if (SocketController.rooms[idSalaDeJuego].size === 1) {
            SocketController.rooms[idSalaDeJuego].forEach(client => {
                if (client.ws.readyState === ws.OPEN) {
                    client.ws.send(`Esperando a que se unan más jugadores`);
                }
            });
        } 
        ws.on('message', async function (msg) {
            const jsonMessage = JSON.parse(msg);
            if (jsonMessage.type === 'SEND_MESSAGE') {
                SocketController.rooms[idSalaDeJuego].forEach(async client => {
                    const mensajePalabra = socketController.guessWord(idSalaDeJuego,jsonMessage.data);
                    
                    if (client.ws == ws && client.ws.readyState === ws.OPEN && mensajePalabra) {
                            client.ws.send(`¡Adivinaste la palabra :D!`);
                            adivinado.push(client.ws);
                            const puntos = await socketController.points(idSalaDeJuego, adivinado.length-1, ws, tiempo);
                            client.ws.send(`Conseguiste ${puntos} puntos`);
                            
                    }
                    
                    if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                        if(mensajePalabra){
                            client.ws.send(`¡¡${userName} ha adivinado la palabra!!`);
                        } else {
                        client.ws.send(`${userName}: ${jsonMessage.data}`);
                        }
                    }
                    if (adivinado.length === SocketController.rooms[idSalaDeJuego].size) {
                        SocketController.rooms[idSalaDeJuego].forEach(client => {
                            if (client.ws.readyState === ws.OPEN) {
                                client.ws.send(`¡Todos adivinaron la palabra!`);
                            }
                        });
                    }
                });
            }
            else if (jsonMessage.type === 'START_GAME' && SocketController.rooms[idSalaDeJuego].size > 1) {
                await game();
            }     
        });
        async function game() {
            try {
                const promises = turnosJugadores.map(async (client) => {
                    if (client.client.ws.readyState === ws.OPEN && client.turno === 1) {
                        adivinado.push(client.client.ws);
                        const palabraAsignada = await socketController.asignWord(idSalaDeJuego);
                        client.client.ws.send(`La palabra a dibujar es: ${palabraAsignada}`);
                        turnosJugadores = socketController.endTurn(idSalaDeJuego);
                    } else {
                        client.client.ws.send(`¡El juego ha comenzado!`);
                    }
                    const tiempoLimite = 90;
                    let contador = tiempoLimite;
                    client.client.ws.send(`Tiempo restante: ${contador} segundos`);
                    return new Promise<void>((resolve) => {
                        const intervalo = setInterval(() => {
                            contador--;
                            tiempo = contador;
                            if (contador > 0 && adivinado.length < turnosJugadores.length) {
                                client.client.ws.send(`Tiempo restante: ${contador} segundos`);
                            } else {
                                clearInterval(intervalo);
                                client.client.ws.send(`El turno de ${userName} ha terminado`);
                                resolve();
                            }
                        }, 1000);
                    });
                });
        
                await Promise.all(promises);
                finishTurn();
            } catch (error) {
                console.error("Error en la función game:", error);
            }
        }
        
        
        async function finishTurn(){
                maxRondas--;
                if(maxRondas > 0){
                    adivinado = [];
                    return await game();
                }
                else {
                    const puntajes = socketController.endGame(idSalaDeJuego);
                    SocketController.rooms[idSalaDeJuego].forEach(client => {
                        if (client.ws.readyState === ws.OPEN) {
                            client.ws.send(`¡Fin del juego!`);
                            client.ws.send(`${puntajes}`);
                            socketController.closeRoom(idSalaDeJuego, client.ws);
                        }
                    });
                };
        }

        ws.on('close', function () {
            try{
            SocketController.rooms[idSalaDeJuego].delete(ws);
            if (SocketController.rooms[idSalaDeJuego].size === 0) {
                delete SocketController.rooms[idSalaDeJuego];
            }
            socketController.leaveRoom(ws, idSalaDeJuego);
            turnosJugadores = socketController.assignATurn(idSalaDeJuego);

            SocketController.rooms[idSalaDeJuego].forEach(async client => {
                if (client.ws.readyState === ws.OPEN) {
                    client.ws.send(`${userName} ha abandonado a la sala de juego`);
                    const turnoNuevo = await socketController.playerTurn(idSalaDeJuego, client.ws);
                    client.ws.send(`Tienes el turno ${turnoNuevo}`);
                }
            }
        );
        }
        catch(error){
            console.error("No hay jugadores en la sala de juego");
        }
        });
    }
    );

    return router;
};