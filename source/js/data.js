'use strict';

(function () {
  window.info = [
    {
      ingredientString: 'с фуа-гра',
      portionsQuantity: '10',
      giftsQuantity: '1',
      mass: '0,5',
      description: 'Печень утки разварная с артищоками.'
    },
    {
      ingredientString: 'с рыбой',
      portionsQuantity: '40',
      giftsQuantity: '2',
      mass: '2',
      description: 'Головы щучьи с чесноком да свежайшая сёмгушка.'
    },
    {
      ingredientString: 'с курой',
      portionsQuantity: '100',
      giftsQuantity: '5',
      commentary: 'Заказчик доволен',
      mass: '5',
      description: 'Филе из цыплят с трюфелями в бульоне.',
      disabled: true
    }
  ];

  window.states = {
    defaultHover: {
      color: '#2ea8e5',
      description: 'default'
    },

    selected: {
      color: '#d91667',
      description: 'selected',
      upperText: 'Cказочное заморское яство'
    },

    selectedHover: {
      color: '#e62e7a',
      description: 'selected',
      upperText: 'Котэ не одобряет?'
    }
  };
}());
