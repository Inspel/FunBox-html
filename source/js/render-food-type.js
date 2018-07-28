'use strict';
(function () {

  var noJsInfo = document.querySelector('.cat-food__nojs');
  noJsInfo.parentNode.removeChild(noJsInfo);

  var catFoodListNode = document.querySelector('.cat-food__list');

  catFoodListNode.classList.remove('hidden');

  var foodElementTemplate = document.querySelector('#food-type-template');

  var data = window.info;

  var getGiftString = function (currentFoodType) {
    var giftsQuantityLastSymbol = currentFoodType.giftsQuantity.slice(-1);
    switch (true) {
      case giftsQuantityLastSymbol === '1':
        return 'мышь';

      case parseInt(giftsQuantityLastSymbol, 10) >= 5:
        return 'мышей';

      default:
        return 'мыши';
    }
  };

  var getGiftQuantity = function (currentFoodType) {
    if (currentFoodType.giftsQuantity === '1') {
      return '';
    }
    return currentFoodType.giftsQuantity;
  };

  var setCommentary = function (element, currentFoodType) {
    var commentaryNode = element.querySelector('.js-commentary');
    if (currentFoodType.commentary) {
      commentaryNode.textContent = currentFoodType.commentary;
    } else {
      commentaryNode.parentNode.removeChild(commentaryNode);
    }
  };

  var template = foodElementTemplate.content.querySelector('.food-type');
  var createFoodElementsFragment = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var foodElement = template.cloneNode(true);

      foodElement.querySelector('.food-type__header-ingredient').
        textContent = data[i].ingredientString;

      foodElement.querySelector('.js-portions').
        textContent = data[i].portionsQuantity;

      foodElement.querySelector('.js-gifts .food-type__quantity').
        textContent = getGiftQuantity(data[i]);

      foodElement.querySelector('.js-gifts .food-type__text').textContent = getGiftString(data[i]) + ' в подарок';

      setCommentary(foodElement, data[i]);

      foodElement.querySelector('.food-type__mass-value--quantity').textContent = data[i].mass;

      if (data[i].disabled) {
        foodElement.classList.add('js-disabled');
        foodElement.querySelector('.food-type__bottom-text').textContent = 'Печалька, ' + data[i].ingredientString  + ' закончился.';
      }

      fragment.appendChild(foodElement);
    }
    return fragment;
  };

  var FoodElementsFragment = createFoodElementsFragment();
  catFoodListNode.appendChild(FoodElementsFragment);

})();
