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

        document.getElementById(
            'strengthStat'
        ).innerText = strength

        document.getElementById(
            'defenseStat'
        ).innerText = defense

        document.getElementById(
            'agilityStat'
        ).innerText = agility

        document.getElementById(
            'intelligenceStat'
        ).innerText = intelligence

        document.getElementById(
            'luckStat'
        ).innerText = luck

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
    }
)

socket.on(
    'loginError',
    (message) => {

        alert(message)
    }
)
