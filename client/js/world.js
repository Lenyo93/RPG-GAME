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