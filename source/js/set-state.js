
(function () {

  let borderElement;
  let massElement;
  let buttonElement;

  const getColoredNodes = function (pack) {
    borderElement = pack.querySelector('.food-type__border path');
    massElement = pack.querySelector('.food-type__mass');
    buttonElement = pack.querySelector('.food-type__buy-button');
  };
  const removeStateColor = function () {
    borderElement.removeAttribute('stroke');
    massElement.removeAttribute('style');
    if(buttonElement) {
      buttonElement.removeAttribute('style');
    }
  };

  const setColor = function (pack, state) {
    borderElement.setAttribute('stroke', state.color);
    massElement.style.cssText = 'background: ' + state.color;
    if(buttonElement) {
      buttonElement.style.cssText = 'color: ' + state.color;
    }
  };

  const template = document.querySelector('#food-type-template');
  const descriptionTemplate = template.content.querySelector('.food-type__bottom-text');
  const setDescription = function (pack, state) {
    if (state.description === 'selected') {
      let foodPackIngredientString = (pack.querySelector('.food-type__header-ingredient').textContent);
      let foodPackData = window.info.find(function (element) {
        return element.ingredientString === foodPackIngredientString;
      });
      pack.querySelector('.food-type__bottom-text').textContent = foodPackData.description;
    } else {
      const defaultDescriptionNode =  descriptionTemplate.cloneNode(true);
      pack.removeChild(pack.querySelector('.food-type__bottom-text'));
      pack.append(defaultDescriptionNode);
    }
  };

  const checkClickableElements = function (event) {
    return (event.target === buttonElement || event.target === borderElement)
  };

  const onPackMouseOutDefault = function (event) {
    if (checkClickableElements(event)) {
      removeStateColor();
      this.removeEventListener('mouseout', onPackMouseOutDefault);
    }
  };

  const onPackMouseOverDefault = function (event) {
    getColoredNodes(this);
    if (checkClickableElements(event)) {
      setColor(this, window.states.defaultHover);
      this.addEventListener('mouseout', onPackMouseOutDefault);
    }
  };

  const onPackMouseOverSelected = function () {
    let headerIntro = this.querySelector('.food-type__header-intro');
    headerIntro.textContent = window.states.selected.upperText;
    headerIntro.removeAttribute('style');
    getColoredNodes(this);
    setColor(this, window.states.selected);
  };

  const onPackMouseOutSelected = function () {
    let headerIntro = this.querySelector('.food-type__header-intro');
    headerIntro.textContent = window.states.selectedHover.upperText;
    headerIntro.style.cssText = 'color: ' + window.states.selectedHover.color;
    setColor(this, window.states.selectedHover);
  };

  const onPackClick = function (event) {
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
        this.addEventListener('mouseover', onPackMouseOverSelected)
      }
      this.classList.toggle('js-selected');
    }
  };

  let foodPacks = Array.prototype.slice.call(document.querySelectorAll('.food-type:not(.js-disabled)'));

  foodPacks.forEach(function (currentElement) {
    currentElement.addEventListener('mouseover', onPackMouseOverDefault);
    currentElement.addEventListener('click', onPackClick);
  });

})();
