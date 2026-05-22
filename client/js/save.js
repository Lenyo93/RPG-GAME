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

    socket.emit(
        'savePlayer',
        saveData
    )
}