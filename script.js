const table = document.querySelector('.table');
const startPage = document.querySelector('.page-wrapper');
const tablePage = document.querySelector('.table-wrapper');

let gameLevel;

const levelButtons = document.querySelectorAll('.button');
const selected = document.querySelector('.selected');
const levelButtonsActive = document.querySelectorAll('.level');

let hasPlayed = false;

const gridTemplateHard = '228px 228px 228px 228px 228px';
const gridTemplateEasy = '228px 228px 228px';

// класс для рисования стола и определения карты с багом

class CardTable {
  constructor(level) {
    this.level = level
  }

  drawCards() {
 
    let numberOfCards;

    // определяем количество карт в соответствии с уровнем сложности

    if (table.style.gridTemplateColumns === gridTemplateHard) {
      table.style.gridTemplateColumns = gridTemplateEasy;
    }

    switch(this.level) {   
      case 'Простой':  
        numberOfCards = 3;
        break;   
      case 'Средний':  
        numberOfCards = 6;
        break;
      case 'Сложный':  
        numberOfCards = 10;
        table.style.gridTemplateColumns = gridTemplateHard;
        break;
      default:
        numberOfCards = 3;
    }

    // рисуем нужное количество карт

    let i = 1;
    while (i <= numberOfCards) {
      let elementForCard = document.createElement('div');
      elementForCard.classList.add('card');
      table.appendChild(elementForCard); 
      i++;
    }

    console.log(`Количество нарисованных карт: ${numberOfCards}`);

    // рандомом выбираем номер карты с багом

    function getBugCard(numberOfCards) {
      const min = 1;
      const max = numberOfCards;
      return (Math.floor(Math.random() * (max - min + 1)) + min)
    } 

    let bugCardNumber = getBugCard(numberOfCards);
    console.log(`Карта с багом - это карта под номером ${bugCardNumber}`);

    // обработка кликов по картам

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, i) => {
      let elementForFront = document.createElement('div');
      let elementForBack = document.createElement('div');
      
      card.appendChild(elementForFront);
      card.appendChild(elementForBack);

      elementForFront.classList.add('card-front');

      if ((i + 1) === bugCardNumber) {
        elementForBack.classList.add('card-back-buggy');
      } else {
        elementForBack.classList.add('card-back-okay');
      }

      const activeElementAnimation = () => {
        if (hasPlayed) {
          startPage.style.display = 'block';
          tablePage.style.display = 'none';
          hasPlayed = false;
          gameLevel = 'Простой';
        } else {
          card.style.transform = 'rotateY(180deg)';
          hasPlayed = true;
        }
      };
      
      card.addEventListener('click', activeElementAnimation);
    });

  }
}

// выбор уровня сложности


levelButtons.forEach((levelButton, i) => {
  const buttonOnClick = () => {
    selected.classList.remove('selected');
    gameLevel = levelButton.getAttribute('value');
    console.log(gameLevel);  
    
    levelButtonsActive.forEach((levelButtonActive) => {
      levelButtonActive.classList.remove('post-click');
    })
    
    switch(gameLevel) {   
      case 'Простой':  
        levelButtonsActive[0].classList.add('post-click');
        break;   
      case 'Средний':  
        levelButtonsActive[1].classList.add('post-click');
        break;
      case 'Сложный':  
        levelButtonsActive[2].classList.add('post-click');
        break;
    }
  }

  levelButton.addEventListener('click', buttonOnClick);
});

// обработка старта игры

const startButton = document.querySelector('.start');

const startOnClick = () => {
  table.innerHTML = '';
  console.log(gameLevel);
  let newTable = new CardTable(gameLevel);
  startPage.style.display = 'none';
  selected.classList.add('selected');
  tablePage.style.display = 'flex';

  levelButtonsActive.forEach((levelButtonActive) => {
    levelButtonActive.classList.remove('post-click');
  })

  newTable.drawCards();
}
startButton.addEventListener('click', startOnClick);




