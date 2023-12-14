const cards: NodeListOf<HTMLElement> =
  document.querySelectorAll(".memory-card");
let chosenCards: HTMLElement[] = [];
let correctGuesses: number = 0;

const handleCard = (event): void => {
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

const addCardListeners = (): void => {
  cards.forEach((card) => {
    card.addEventListener("click", handleCard);
  });
};
addCardListeners();

const removeCardListeners = (): void => {
  cards.forEach((card) => {
    card.removeEventListener("click", handleCard);
  });
};

const compareCards = (): void => {
  const firstCard: string = chosenCards[0].attributes[1].value;
  const secondCard: string = chosenCards[1].attributes[1].value;

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

const flipBack = (): void => {
  setTimeout(() => {
    chosenCards.forEach((card) => {
      card.classList.toggle("flip");
    });
    chosenCards = [];
    addCardListeners();
  }, 700);
};

const showWinningScreen = (): void => {
  const overlayElement: HTMLElement = document.querySelector(".overlay");
  overlayElement.classList.toggle("show");

  const closeOverlayButton: HTMLElement = document.querySelector(".close");
  closeOverlayButton.addEventListener("click", () => {
    location.reload();
  });
};
