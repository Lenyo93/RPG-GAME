const socket = io()

let currentPosition = 'town_square'

const locations = {

    town_square: {
        name: 'Főtér',
        image: 'assets/locations/town_square.jpg',
        description: 'A város központja.',
        exits: {
            north: 'market',
            east: 'blacksmith',
            south: 'tavern',
            west: 'forest_road'
        }
    },

    market: {
        name: 'Piac',
        image: 'assets/locations/market.jpg',
        description: 'Nyüzsgő piactér.',
        exits: {
            south: 'town_square'
        }
    },

    blacksmith: {
        name: 'Kovács',
        image: 'assets/locations/blacksmith.jpg',
        description: 'Fegyverek és páncélok.',
        exits: {
            west: 'town_square',
            east: 'castle_gate'
        }
    },

    forest_road: {
        name: 'Erdei út',
        image: 'assets/locations/forest_road.jpg',
        description: 'Kivezet a városból.',
        exits: {
            east: 'town_square',
            west: 'temple'
        }
    },

    tavern: {
        name: 'Kocsma',
        image: 'assets/locations/tavern.jpg',
        description: 'Kalandorok gyűjtőhelye.',
        exits: {
            north: 'town_square',
            south: 'dungeon_entrance'
        }
    },

    castle_gate: {
        name: 'Várkapu',
        image: 'assets/locations/castle_gate.jpg',
        description: 'A király vára.',
        exits: {
            west: 'blacksmith'
        }
    },

    temple: {
        name: 'Templom',
        image: 'assets/locations/temple.jpg',
        description: 'Ősi szentély.',
        exits: {
            east: 'forest_road'
        }
    },

    dungeon_entrance: {
        name: 'Dungeon bejárat',
        image: 'assets/locations/dungeon_entrance.jpg',
        description: 'Sötét és veszélyes.',
        exits: {
            north: 'tavern'
        }
    }
}

function renderLocation() {

    const location = locations[currentPosition]

    document.getElementById('locationName').innerText =
        location.name

    document.getElementById('locationImage').src =
        location.image

    document.getElementById('locationDescription').innerText =
        location.description

    setupButtons(location)

    const dungeonContainer =
        document.getElementById(
            'dungeonButtonContainer'
        )

    if (currentPosition === 'dungeon_entrance') {

        dungeonContainer.innerHTML = `

        <br>

        <button
            class="menuBtn"
            onclick="enterDungeon()"
        >
            ⚔ Belépés a dungeonbe
        </button>
    `
    }
    else {

        dungeonContainer.innerHTML = ''
    }
}

function setupButtons(location) {

    const northBtn = document.getElementById('north')
    const southBtn = document.getElementById('south')
    const eastBtn = document.getElementById('east')
    const westBtn = document.getElementById('west')

    northBtn.disabled = !location.exits.north
    southBtn.disabled = !location.exits.south
    eastBtn.disabled = !location.exits.east
    westBtn.disabled = !location.exits.west

    northBtn.onclick = () => move('north')
    southBtn.onclick = () => move('south')
    eastBtn.onclick = () => move('east')
    westBtn.onclick = () => move('west')
}

function move(direction) {

    const location = locations[currentPosition]

    if (!location.exits[direction]) {
        return
    }

    currentPosition = location.exits[direction]

    socket.emit('playerMovement', {
        location: currentPosition
    })

    renderLocation()
}

window.onload = () => {

    renderLocation()
}
function enterDungeon() {

    showScreen('dungeonScreen')
}

function leaveDungeon() {

    showScreen('worldScreen')
}

let monsterHp = 100

function attackMonster() {

    const damage =
        Math.floor(Math.random() * 15) + 5

    monsterHp -= damage

    if (monsterHp < 0) {
        monsterHp = 0
    }

    document.getElementById(
        'monsterHpBar'
    ).style.width = monsterHp + '%'

    document.getElementById(
        'monsterHpBar'
    ).innerText =
        monsterHp + ' / 100 HP'

    document.getElementById(
        'combatLog'
    ).innerHTML =
        'Sebzés: ' + damage

    if (monsterHp <= 0) {

        document.getElementById(
            'combatLog'
        ).innerHTML =
            'A szörny meghalt! +25 XP'
    }
}
/* LOGIN */

function login() {

    document.getElementById(
        'loginScreen'
    ).style.display = 'none'
}