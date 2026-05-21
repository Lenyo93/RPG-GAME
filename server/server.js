const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const fs = require('fs')

const app = express()

const server =
    http.createServer(app)

const io =
    new Server(server)

const PORT = 3000

/* =========================
   PLAYER SAVE FILE
========================= */

const playersFile =
    path.join(
        __dirname,
        'data',
        'players.json'
    )

function loadPlayers() {

    if (!fs.existsSync(playersFile)) {

        fs.writeFileSync(
            playersFile,
            '{}'
        )
    }

    return JSON.parse(

        fs.readFileSync(
            playersFile
        )
    )
}

function savePlayers(data) {

    fs.writeFileSync(

        playersFile,

        JSON.stringify(
            data,
            null,
            2
        )
    )
}

/* =========================
   CLIENT
========================= */

app.use(
    express.static(
        path.join(
            __dirname,
            '../client'
        )
    )
)

/* =========================
   ONLINE PLAYERS
========================= */

let onlinePlayers = {}

/* =========================
   SOCKET
========================= */

io.on('connection', (socket) => {

    console.log(
        'Játékos csatlakozott:',
        socket.id
    )

    /* =========================
       LOGIN / REGISTER
    ========================= */

    socket.on('login', (data) => {

    const players =
        loadPlayers()

    const username =
        data.username

    const password =
        data.password

    if (!players[username]) {

        players[username] = {

            password: password,

            level: 1,
            xp: 0,

            strength: 10,
            defense: 8,
            agility: 6,
            intelligence: 4,
            luck: 3,

            statPoints: 0
        }

        savePlayers(players)
    }

    if (
        players[username].password
        !== password
    ) {

        socket.emit(
            'loginError',
            'Hibás jelszó!'
        )

        return
    }

    socket.emit(
        'loginSuccess',
        players[username]
    )
})


        /* REGISTER */

        if (!players[username]) {

            players[username] = {

                password: password,

                level: 1,
                xp: 0,

                strength: 10,
                defense: 8,
                agility: 6,
                intelligence: 4,
                luck: 3,

                statPoints: 0
            }

            savePlayers(players)

            console.log(
                'Új account:',
                username
            )
        }

        /* WRONG PASSWORD */

        if (
            players[username].password
            !== password
        ) {

            socket.emit(
                'loginError',
                'Hibás jelszó!'
            )

            return
        }

        /* LOGIN SUCCESS */

        socket.emit(
            'loginSuccess',
            players[username]
        )

        console.log(
            username +
            ' belépett.'
        )
    })

    /* =========================
       SAVE PLAYER
    ========================= */

    socket.on('savePlayer', (data) => {

    console.log(
        'SAVE ÉRKEZETT:',
        data
    )

    const players =
        loadPlayers()

    if (!players[data.username]) {

        console.log(
            'NINCS ILYEN USER'
        )

        return
    }

    players[data.username] = {

        ...players[data.username],

        level: data.level,
        xp: data.xp,

        strength: data.strength,
        defense: data.defense,
        agility: data.agility,
        intelligence: data.intelligence,
        luck: data.luck,

        statPoints: data.statPoints
    }

    savePlayers(players)

    console.log(
        data.username +
        ' ELMENTVE'
    )
})

    /* =========================
       MULTIPLAYER
    ========================= */

    onlinePlayers[socket.id] = {

        x: 400,
        y: 300,
        hp: 100,
        level: 1
    }

    socket.emit(
        'currentPlayers',
        onlinePlayers
    )

    socket.broadcast.emit(
        'newPlayer',
        {
            id: socket.id,
            player:
                onlinePlayers[socket.id]
        }
    )

    socket.on(
        'playerMovement',
        (movementData) => {

            if (
                !onlinePlayers[socket.id]
            ) return

            onlinePlayers[socket.id].x =
                movementData.x

            onlinePlayers[socket.id].y =
                movementData.y

            socket.broadcast.emit(
                'playerMoved',
                {
                    id: socket.id,
                    player:
                        onlinePlayers[socket.id]
                }
            )
        }
    )

    /* =========================
       DISCONNECT
    ========================= */

    socket.on('disconnect', () => {

        console.log(
            'Játékos kilépett:',
            socket.id
        )

        delete onlinePlayers[socket.id]

        io.emit(
            'playerDisconnected',
            socket.id
        )
    })
})

/* =========================
   START SERVER
========================= */

server.listen(PORT, () => {

    console.log(
        `Szerver fut: http://localhost:${PORT}`
    )
})