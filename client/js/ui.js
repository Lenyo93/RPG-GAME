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