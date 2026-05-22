const socket = io()

/* =========================
   PLAYER
========================= */

let currentUsername = ''

let currentPosition = 'castle_gate'

let playerHp = 100

let playerXp = 0

let playerLevel = 1

let statPoints = 0

let strength = 10
let defense = 8
let agility = 6
let intelligence = 4
let luck = 3

/* =========================
   LOCATIONS
========================= */

const locations = {

    town_square: {
        name: 'Főtér',
        image: 'assets/locations/town_square.jpg',
        description: 'A város központja.',
        exits: {
            north: 'blacksmith',
            east: 'temple',
            south: 'castle_gate',
            west: 'market'
        }
    },

    market: {
        name: 'Piac',
        image: 'assets/locations/market.jpg',
        description: 'Nyüzsgő piactér.',
        exits: {
            north: 'tavern',
            east: 'town_square',
            west: 'docks',
            south: 'living_quarter'
        }
    },

    blacksmith: {
        name: 'Kovács',
        image: 'assets/locations/blacksmith.jpg',
        description: 'Fegyverek és páncélok.',
        exits: {
            west: 'tavern',
            south: 'town_square'
        }
    },

    forest_road: {
        name: 'Erdei út',
        image: 'assets/locations/forest_road.jpg',
        description: 'Kivezet a városból.',
        exits: {
            north: 'castle_gate',
            south: 'dungeon_entrance',
            east: 'dark_forest'
        }
    },

    tavern: {
        name: 'Kocsma',
        image: 'assets/locations/tavern.jpg',
        description: 'Kalandorok gyűjtőhelye.',
        exits: {
            east: 'blacksmith',
            south: 'market'
        }
    },

    castle_gate: {
        name: 'Várkapu',
        image: 'assets/locations/castle_gate.jpg',
        description: 'Darnell városának a kapuja.',
        exits: {
            north: 'town_square',
            south: 'forest_road'
        }
    },

    temple: {
        name: 'Templom',
        image: 'assets/locations/temple.jpg',
        description: 'Ősi szentély.',
        exits: {
            west: 'town_square',
            east: 'graveyard'
        }
    },

    dungeon_entrance: {
        name: 'Dungeon bejárat',
        image: 'assets/locations/dungeon_entrance.jpg',
        description: 'Sötét és veszélyes.',
        exits: {
            north: 'forest_road'
        }
    },

    graveyard: {
        name: 'Temető',
        image: 'assets/locations/graveyard.png',
        description: 'A holtak nyughelye.',
        exits: {
            west: 'temple'
        }
    },

    swamp: {
        name: 'Mocsár',
        image: 'assets/locations/swamp.png',
        description: 'Bűzös mocsár',
        exits: {
            west: 'dark_forest',
            east: 'ancient_ruin'
        }
    },

    dark_forest: {
        name: 'Sötét Erdő',
        image: 'assets/locations/dark_forest.png',
        description: 'Egy sötét és baljós erdő. ',
        exits: {
            east: 'swamp',
            south: 'bandit_camp',
            west: 'forest_road'
        }
    },

    ancient_ruin: {
        name: 'Ősi Romok',
        image: 'assets/locations/ancient_ruin.png',
        description: 'Ősi és elhagyatott romok. Valaha templom lehetett?',
        exits: {
            west: 'swamp'
        }
    },

    bandit_camp: {
        name: 'Bandita tábor',
        image: 'assets/locations/bandit_camp.png',
        description: 'Pár rosszarcú lézeng, amikor megpillantod a jobb napokat is látott táborhelyet',
        exits: {
            north: 'dark_forest'
        }
    },

    docks: {
        name: 'Kikötő',
        image: 'assets/locations/docks.png',
        description: 'A sós tengeri levegő, és a rothadó halak szaga csapja meg az orrodat.',
        exits: {
            east: 'market'
        }
    },

    living_quarter: {
        name: 'Lakónegyed',
        image: 'assets/locations/living_quarter.png',
        description: 'Tiszta utcák, és rendes házak sorakoznak egymás mellett. ',
        exits: {
            north: 'market'
        }
    }
}

/* =========================
   MONSTERS
========================= */

const monsters = [

    {
        name: 'Goblin',
        hp: 60,
        image:
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357'
    },

    {
        name: 'Farkas',
        hp: 80,
        image:
            'https://images.unsplash.com/photo-1546182990-dffeafbe841d'
    },

    {
        name: 'Csontváz',
        hp: 100,
        image:
            'https://images.unsplash.com/photo-1560807707-8cc77767d783'
    },

    {
        name: 'Bandita',
        hp: 120,
        image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
]

let currentMonster = null

let monsterHp = 100

/* =========================
   SCREEN SYSTEM
========================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll('.screen')

    screens.forEach(screen => {

        screen.style.display = 'none'
    })

    document.getElementById(
        screenId
    ).style.display = 'block'
}

/* =========================
   WORLD
========================= */

function renderLocation() {

    const location =
        locations[currentPosition]

    document.getElementById(
        'locationName'
    ).innerText =
        location.name

    document.getElementById(
        'locationImage'
    ).src =
        location.image

    document.getElementById(
        'locationDescription'
    ).innerText =
        location.description

    setupButtons(location)

    const dungeonContainer =
        document.getElementById(
            'dungeonButtonContainer'
        )

    if (
        currentPosition ===
        'dungeon_entrance'
    ) {

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

    const northBtn =
        document.getElementById('north')

    const southBtn =
        document.getElementById('south')

    const eastBtn =
        document.getElementById('east')

    const westBtn =
        document.getElementById('west')

    northBtn.disabled =
        !location.exits.north

    southBtn.disabled =
        !location.exits.south

    eastBtn.disabled =
        !location.exits.east

    westBtn.disabled =
        !location.exits.west

    northBtn.onclick =
        () => move('north')

    southBtn.onclick =
        () => move('south')

    eastBtn.onclick =
        () => move('east')

    westBtn.onclick =
        () => move('west')
}

function move(direction) {

    const location =
        locations[currentPosition]

    if (
        !location.exits[direction]
    ) {
        return
    }

    currentPosition =
        location.exits[direction]

    socket.emit(
        'playerMovement',
        {
            location:
                currentPosition
        }
    )

    renderLocation()
}

/* =========================
   DUNGEON
========================= */

function enterDungeon() {

    showScreen('dungeonScreen')

    spawnMonster()
}

function leaveDungeon() {

    showScreen('worldScreen')
}

function spawnMonster() {

    const randomMonster =

        monsters[
        Math.floor(
            Math.random() *
            monsters.length
        )
        ]

    currentMonster =
        randomMonster

    monsterHp =
        randomMonster.hp

    document.getElementById(
        'monsterName'
    ).innerText =
        randomMonster.name

    document.getElementById(
        'monsterImage'
    ).src =
        randomMonster.image

    document.getElementById(
        'monsterHpBar'
    ).style.width =
        '100%'

    document.getElementById(
        'monsterHpBar'
    ).innerText =

        monsterHp +
        ' / ' +
        randomMonster.hp +
        ' HP'

    document.getElementById(
        'combatLog'
    ).innerHTML =

        randomMonster.name +
        ' jelent meg!'
}

function attackMonster() {

    const damage =
        Math.floor(
            Math.random() * 15
        ) + strength

    monsterHp -= damage

    if (monsterHp < 0) {

        monsterHp = 0
    }

    let monsterDamage =
        Math.floor(
            Math.random() * 10
        ) + 3 - Math.floor(defense / 2)

    if (monsterDamage < 1) {

        monsterDamage = 1
    }

    playerHp -= monsterDamage

    if (playerHp < 0) {

        playerHp = 0
    }

    /* MONSTER HP */

    document.getElementById(
        'monsterHpBar'
    ).style.width =

        (
            monsterHp
            /
            currentMonster.hp
        ) * 100 + '%'

    document.getElementById(
        'monsterHpBar'
    ).innerText =

        monsterHp +
        ' / ' +
        currentMonster.hp +
        ' HP'

    /* PLAYER HP */

    document.getElementById(
        'playerHp'
    ).style.width =

        playerHp + '%'

    document.getElementById(
        'playerHp'
    ).innerText =

        playerHp +
        ' / 100 HP'

    /* COMBAT LOG */

    document.getElementById(
        'combatLog'
    ).innerHTML =

        'Te sebzel: ' +
        damage +

        '<br>' +

        currentMonster.name +

        ' sebzett: ' +

        monsterDamage

    /* MONSTER DEAD */

    if (monsterHp <= 0) {

        playerXp += 25

        while (playerXp >= 100) {

            playerLevel++

            statPoints++

            playerXp -= 100
        }

        document.getElementById(
            'playerLevelText'
        ).innerText =

            currentUsername +
            ' Lv.' +
            playerLevel

        document.getElementById(
            'characterLevel'
        ).innerText =

            'Szint: ' +
            playerLevel

        document.getElementById(
            'characterXp'
        ).innerText =

            'XP: ' +
            playerXp +
            ' / 100'

        document.getElementById(
            'statPointsText'
        ).innerText =

            'Képességpont: ' +
            statPoints

        document.getElementById(
            'xpBar'
        ).style.width =

            playerXp + '%'

        document.getElementById(
            'xpBar'
        ).innerText =

            playerXp +
            ' / 100 XP'

        document.getElementById(
            'combatLog'
        ).innerHTML =

            currentMonster.name +
            ' meghalt! +25 XP'

        savePlayer()

        setTimeout(() => {

            spawnMonster()

        }, 1500)

        return
    }

    /* PLAYER DEAD */

    if (playerHp <= 0) {

        document.getElementById(
            'combatLog'
        ).innerHTML =
            'Meghaltál!'

        setTimeout(() => {

            playerHp = 100

            document.getElementById(
                'playerHp'
            ).style.width =
                '100%'

            document.getElementById(
                'playerHp'
            ).innerText =
                '100 / 100 HP'

            leaveDungeon()

        }, 2000)
    }
}

/* =========================
   LOGIN
========================= */

function login() {

    const username =
        document.getElementById(
            'username'
        ).value

    currentUsername = username

    const password =
        document.getElementById(
            'password'
        ).value

    if (
        !username ||
        !password
    ) {

        alert(
            'Tölts ki mindent!'
        )

        return
    }

    socket.emit(
        'login',
        {
            username:
                username,

            password:
                password
        }
    )
}

socket.on(
    'loginSuccess',
    (playerData) => {

        document.getElementById(
            'loginScreen'
        ).style.display =
            'none'

        /* LOAD PLAYER */

        playerLevel =
            playerData.level || 1

        playerXp =
            playerData.xp || 0

        strength =
            playerData.strength || 10

        defense =
            playerData.defense || 8

        agility =
            playerData.agility || 6

        intelligence =
            playerData.intelligence || 4

        luck =
            playerData.luck || 3

        statPoints =
            playerData.statPoints || 0

        /* SAFE UI UPDATE */

        const strengthStat =
            document.getElementById(
                'strengthStat'
            )

        if (strengthStat) {

            strengthStat.innerText =
                strength
        }

        const defenseStat =
            document.getElementById(
                'defenseStat'
            )

        if (defenseStat) {

            defenseStat.innerText =
                defense
        }

        const agilityStat =
            document.getElementById(
                'agilityStat'
            )

        if (agilityStat) {

            agilityStat.innerText =
                agility
        }

        const intelligenceStat =
            document.getElementById(
                'intelligenceStat'
            )

        if (intelligenceStat) {

            intelligenceStat.innerText =
                intelligence
        }

        const luckStat =
            document.getElementById(
                'luckStat'
            )

        if (luckStat) {

            luckStat.innerText =
                luck
        }

        const characterLevel =
            document.getElementById(
                'characterLevel'
            )

        if (characterLevel) {

            characterLevel.innerText =
                'Szint: ' +
                playerLevel
        }

        const characterXp =
            document.getElementById(
                'characterXp'
            )

        if (characterXp) {

            characterXp.innerText =
                'XP: ' +
                playerXp +
                ' / 100'
        }

        const statPointsText =
            document.getElementById(
                'statPointsText'
            )

        if (statPointsText) {

            statPointsText.innerText =
                'Képességpont: ' +
                statPoints
        }

        console.log(
            'Belépve:',
            playerData
        )
    }
)

socket.on(
    'loginError',
    (message) => {

        alert(message)
    }
)

/* =========================
   STATS
========================= */

function addStat(stat) {

    if (statPoints <= 0) {

        return
    }

    statPoints--

    if (stat === 'strength') {

        strength++

        document.getElementById(
            'strengthStat'
        ).innerText = strength
    }

    if (stat === 'defense') {

        defense++

        document.getElementById(
            'defenseStat'
        ).innerText = defense
    }

    if (stat === 'agility') {

        agility++

        document.getElementById(
            'agilityStat'
        ).innerText = agility
    }

    if (stat === 'intelligence') {

        intelligence++

        document.getElementById(
            'intelligenceStat'
        ).innerText = intelligence
    }

    if (stat === 'luck') {

        luck++

        document.getElementById(
            'luckStat'
        ).innerText = luck
    }

    document.getElementById(
        'statPointsText'
    ).innerText =

        'Képességpont: ' +
        statPoints

    savePlayer()
}

/* =========================
   SAVE PLAYER
========================= */

function savePlayer() {

    if (!currentUsername) {

        console.log(
            'NINCS USERNAME'
        )

        return
    }

    const saveData = {

        username: currentUsername,

        level: playerLevel,
        xp: playerXp,

        strength: strength,
        defense: defense,
        agility: agility,
        intelligence: intelligence,
        luck: luck,

        statPoints: statPoints
    }

    console.log(
        'MENTÉS FUT:',
        saveData
    )

    socket.emit(
        'savePlayer',
        saveData
    )
}

/* =========================
   START
========================= */

window.onload = () => {

    showScreen('worldScreen')

    renderLocation()
}