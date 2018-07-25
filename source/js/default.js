'use strict';

(function () {

  const foodPacks = document.querySelectorAll('.food-type');

  let borderElement;
  let massElement;
  let linkElement;

  const setState = function (target, state) {
    borderElement.setAttribute('stroke', state.color);
    massElement.style = `background: ${ state.color }`;
    linkElement.style = `color: ${ state.color }`;
    if (state.description) {
      const findFoodPackData = function (foodPack) {
        return foodPack.ingredientString === target.querySelector('.food-type__header-ingredient').data;
      };

      let foodPackData = window.data.info.find(findFoodPackData);

      target.querySelector('.food-type__bottom-text').textContent = foodPackData.description;

    }
  };

  const removeState = function () {
    borderElement.removeAttribute('stroke');
    massElement.removeAttribute('style');
    linkElement.removeAttribute('style');
  };

  const onMouseover = function (event) {
    borderElement = this.querySelector('.food-type__border path');
    massElement = this.querySelector('.food-type__mass');
    linkElement = this.querySelector('.food-type__buy-link');

    const onMouseout = function (event) {
      if (event.target.classList[0] === 'food-type__buy-link' || event.target === borderElement) {
        removeState();
        event.target.removeEventListener('mouseout', onMouseout);
      }
    };

    if (event.target.classList[0] === 'food-type__buy-link' || event.target === borderElement) {
      setState(event.target, window.states.defaultHover);
      event.target.addEventListener('mouseout', onMouseout);
    }
  };

  foodPacks.forEach(function (currentElement) {
    currentElement.addEventListener('mouseover', onMouseover);
  });

})();
