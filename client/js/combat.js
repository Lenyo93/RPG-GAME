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

    document.getElementById(
        'playerHp'
    ).style.width =

        playerHp + '%'

    document.getElementById(
        'playerHp'
    ).innerText =

        playerHp +
        ' / 100 HP'

    document.getElementById(
        'combatLog'
    ).innerHTML =

        'Te sebzel: ' +
        damage +

        '<br>' +

        currentMonster.name +

        ' sebzett: ' +

        monsterDamage

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