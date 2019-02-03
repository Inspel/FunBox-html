'use strict';

(function () {

  var borderElement;
  var massElement;
  var buttonElement;

  var getColoredNodes = function (pack) {
    borderElement = pack.querySelector('.food-type__border path');
    massElement = pack.querySelector('.food-type__mass');
    buttonElement = pack.querySelector('.food-type__buy-button');
  };
  var removeStateColor = function () {
    borderElement.removeAttribute('stroke');
    massElement.removeAttribute('style');
    if (buttonElement) {
      buttonElement.removeAttribute('style');
    }
  };

  var setColor = function (pack, state) {
    borderElement.setAttribute('stroke', state.color);
    massElement.style.cssText = 'background: ' + state.color;
    if (buttonElement) {
      buttonElement.style.cssText = 'color: ' + state.color;
    }
  };

  var template = document.querySelector('#food-type-template');
  var descriptionTemplate = template.content.querySelector('.food-type__bottom-text');
  var setDescription = function (pack, state) {
    if (state.description === 'selected') {
      var foodPackIngredientString = (pack.querySelector('.food-type__header-ingredient').textContent);
      var foodPackData = window.info.find(function (element) {
        return element.ingredientString === foodPackIngredientString;
      });
      pack.querySelector('.food-type__bottom-text').textContent = foodPackData.description;
    } else {
      var defaultDescriptionNode =  descriptionTemplate.cloneNode(true);
      pack.removeChild(pack.querySelector('.food-type__bottom-text'));
      pack.append(defaultDescriptionNode);
    }
  };

  var checkClickableElements = function (event) {
    return (event.target === buttonElement || event.target === borderElement)
  };

  var onPackMouseOutDefault = function (event) {
    if (checkClickableElements(event)) {
      removeStateColor();
      this.removeEventListener('mouseout', onPackMouseOutDefault);
    }
  };

  var onPackMouseOverDefault = function (event) {
    getColoredNodes(this);
    if (checkClickableElements(event)) {
      setColor(this, window.states.defaultHover);
      this.addEventListener('mouseout', onPackMouseOutDefault);
    }
  };

  var onPackMouseOverSelected = function () {
    var headerIntro = this.querySelector('.food-type__header-intro');
    headerIntro.textContent = window.states.selected.upperText;
    headerIntro.removeAttribute('style');
    getColoredNodes(this);
    setColor(this, window.states.selected);
  };

  var onPackMouseOutSelected = function () {
    var headerIntro = this.querySelector('.food-type__header-intro');
    headerIntro.textContent = window.states.selectedHover.upperText;
    headerIntro.style.cssText = 'color: ' + window.states.selectedHover.color;
    setColor(this, window.states.selectedHover);
  };

  var onPackClick = function (event) {
    getColoredNodes(this);
    if (checkClickableElements(event)) {
      if (this.classList.contains('js-selected')) {
        setColor(this, window.states.defaultHover);
        setDescription(this, window.states.defaultHover);
        this.addEventListener('mouseover', onPackMouseOverDefault);
        this.addEventListener('mouseout', onPackMouseOutDefault);
        this.removeEventListener('mouseover', onPackMouseOverSelected);
        this.removeEventListener('mouseout', onPackMouseOutSelected);
      } else {
        setColor(this, window.states.selected);
        setDescription(this, window.states.selected);
        this.removeEventListener('mouseover', onPackMouseOverDefault);
        this.removeEventListener('mouseout', onPackMouseOutDefault);
        this.addEventListener('mouseout', onPackMouseOutSelected);
        this.addEventListener('mouseover', onPackMouseOverSelected);
      }
      this.classList.toggle('js-selected');
    }
  };

  var foodPacks = Array.prototype.slice.call(document.querySelectorAll('.food-type:not(.js-disabled)'));

  foodPacks.forEach(function (currentElement) {
    currentElement.addEventListener('mouseover', onPackMouseOverDefault);
    currentElement.addEventListener('click', onPackClick);
  });

})();
