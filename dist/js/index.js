const cards = document.querySelectorAll(".memory-card");
let chosenCards = [];
let correctGuesses = 0;
const handleCard = (event) => {
    const card = event.currentTarget;
    if (card.classList.contains("flip")) {
        return;
    }
    card.classList.toggle("flip");
    chosenCards.push(card);
    if (chosenCards.length === 2) {
        removeCardListeners();
        compareCards();
    }
};
const addCardListeners = () => {
    cards.forEach((card) => {
        card.addEventListener("click", handleCard);
    });
};
addCardListeners();
const removeCardListeners = () => {
    cards.forEach((card) => {
        card.removeEventListener("click", handleCard);
    });
};
const compareCards = () => {
    const firstCard = chosenCards[0].attributes[1].value;
    const secondCard = chosenCards[1].attributes[1].value;
    if (firstCard !== secondCard) {
        flipBack();
        return;
    }
    correctGuesses++;
    chosenCards = [];
    addCardListeners();
    if (correctGuesses === cards.length / 2) {
        showWinningScreen();
    }
};
const flipBack = () => {
    setTimeout(() => {
        chosenCards.forEach((card) => {
            card.classList.toggle("flip");
        });
        chosenCards = [];
        addCardListeners();
    }, 700);
};
const showWinningScreen = () => {
    const overlayElement = document.querySelector(".overlay");
    overlayElement.classList.toggle("show");
    const closeOverlayButton = document.querySelector(".close");
    closeOverlayButton.addEventListener("click", () => {
        location.reload();
    });
};
