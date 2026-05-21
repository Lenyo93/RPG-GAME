const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = 3000

app.use(express.static(path.join(__dirname, '../client')))

let players = {}

io.on('connection', (socket) => {
    console.log('Játékos csatlakozott:', socket.id)

    players[socket.id] = {
        x: 400,
        y: 300,
        hp: 100,
        level: 1
    }

    socket.emit('currentPlayers', players)

    socket.broadcast.emit('newPlayer', {
        id: socket.id,
        player: players[socket.id]
    })

    socket.on('playerMovement', (movementData) => {
        if (!players[socket.id]) return

        players[socket.id].x = movementData.x
        players[socket.id].y = movementData.y

        socket.broadcast.emit('playerMoved', {
            id: socket.id,
            player: players[socket.id]
        })
    })

    socket.on('disconnect', () => {
        console.log('Játékos kilépett:', socket.id)

        delete players[socket.id]

        io.emit('playerDisconnected', socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`)
})