/* Desenvolva sua lógica aqui */
function callModal (){
    const buttonModal = document.querySelector (".newValueButton")
    const modalController = document.querySelector(".modalController")

    buttonModal.addEventListener('click', () => {
    modalController.showModal()

    closingModal ()
    cancellingModal()
    })
}

function closingModal (){
    const buttonCloseModal = document.querySelector (".buttonFechar")
    const modalController = document.querySelector(".modalController")

    buttonCloseModal.addEventListener('click', () => {
    modalController.close()
    })
}
callModal ()

function cancellingModal (){
    const cancelarButton = document.querySelector('.buttonNormal')
    const modalController = document.querySelector ('.modalController')

    cancelarButton.addEventListener('click', () => {
        modalController.close()
    })
}