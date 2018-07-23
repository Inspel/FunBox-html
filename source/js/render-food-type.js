`use strict`;

(function () {

  document.querySelector(`.cat-food__nojs`).remove();

  const catFoodListNode = document.querySelector(`.cat-food__list`);

  catFoodListNode.classList.remove(`hidden`);

  const foodElementTemplate = document.querySelector(`#food-type-template`);

  const data = window.data;

  const getGiftString = function (currentFoodType) {
    const giftsQuantityLastSymbol = currentFoodType.giftsQuantity.slice(-1);
    switch(true) {
      case giftsQuantityLastSymbol === `1`:
        return `мышь`;

      case parseInt(giftsQuantityLastSymbol, 10) >= 5:
        return `мышей`;

      default:
        return `мыши`;
    }
  };

  const getGiftQuantity = function (currentFoodType) {
    if (currentFoodType.giftsQuantity === `1`) {
      return ``
    }
      return currentFoodType.giftsQuantity
  };

  const setCommentary = function (element, currentFoodType) {
    let commentaryNode = element.querySelector(`.js-commentary`);
    if (currentFoodType.commentary) {
      commentaryNode.textContent = currentFoodType.commentary;
    } else {
      commentaryNode.remove();
    }
  };

  const template = foodElementTemplate.content.querySelector(`.food-type`);
  const createFoodElementsFragment = function () {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let foodElement = template.cloneNode(true);

      foodElement.querySelector(`.food-type__header-ingredient`).
        textContent = data[i].ingredientString;

      foodElement.querySelector(`.js-portions`).
        textContent = data[i].portionsQuantity;

      foodElement.querySelector(`.js-gifts .food-type__quantity`).
        textContent = getGiftQuantity(data[i]);

      foodElement.querySelector(`.js-gifts .food-type__text`).textContent = getGiftString(data[i]) + ` в подарок`;

      setCommentary(foodElement, data[i]);

      foodElement.querySelector(`.food-type__mass-value--quantity`).
        textContent = data[i].mass;

      fragment.appendChild(foodElement);
    }
    return fragment;
  };

  const FoodElementsFragment = createFoodElementsFragment();
  catFoodListNode.appendChild(FoodElementsFragment);

})();
