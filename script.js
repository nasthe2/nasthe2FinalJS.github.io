const gameLevel = +(prompt('Выбери уровень игры от 1 (самый легкий) до 3 (самый сложный):', 1));

class CardTable {
  constructor(level) {
    this.level = level
  }

  drawCards() {

    let numberOfCards;

    switch(this.level) {   
      case 1:  
        //console.log('Нарисовали 3 карты');
        numberOfCards = 3;
        break;   
      case 2:  
        //console.log('Нарисовали 6 карт');
        numberOfCards = 6;
        break;
      case 3:  
        //console.log('Нарисовали 10 карт');
        numberOfCards = 10;
        break;
      default:
        //console.log('Нарисовали 3 карты');
        numberOfCards = 3;
    }

    console.log(`Количество нарисованных карт: ${numberOfCards}`);

    function getBugCard(numberOfCards) {
      let min = 1;
      let max = numberOfCards;
      console.log(`Карта с багом - это карта под номером ${Math.floor(Math.random() * (max - min + 1)) + min}`);
    } 

    getBugCard(numberOfCards);

  }
}

const table = new CardTable(gameLevel);

table.drawCards();
