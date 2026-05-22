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