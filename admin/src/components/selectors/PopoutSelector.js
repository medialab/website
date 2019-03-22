import React, {useState, useCallback} from 'react';
import Select, {components} from 'react-select';
import cond from 'lodash/fp/cond';
import property from 'lodash/fp/property';
import pipe from 'lodash/fp/pipe';
import filter from 'lodash/fp/filter';
import stubTrue from 'lodash/fp/stubTrue';
import map from 'lodash/fp/map';
import Button from '../misc/Button';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const mapObj = map.convert({cap: false});

const MenuList = props => {
  let header;
  if (props.selectProps.selected) {
    header = (
      <header className="multilevel-selector__menu-header" onClick={props.selectProps.onClickBack}>
        <Button className="multilevel-selector__menu-header-button">◀</Button>
        <span className="multilevel-selector__menu-header-text">Search in {props.selectProps.selected}</span>
      </header>
    );
  }
  else if (props.selectProps.inputValue.length) {
    header = (
      <header className="multilevel-selector__menu-header">
        <span className="multilevel-selector__menu-header-text">Search in every productions</span>
      </header>
    );
  }
  return (
    <components.MenuList {...props}>
      <TransitionGroup appear enter exit>
        <CSSTransition
          key={props.selectProps.selected || 'no-selection-key'}
          classNames="fade"
          timeout={200}>
          <div
            className={`multilevel-selecto__animation ${
              props.selectProps.selected ? 'multilevel-selecto__animation__second-level' : 'multilevel-selecto__animation__first-level'
            }`}>
            {header}
            {props.children}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </components.MenuList>
  );
};
const Option = props => (
  <components.Option {...props}>
    <span className="multilevel-selector__option-container">{props.children}</span>
  </components.Option>
);
const Control = props => (
  <span onMouseDown={props.selectProps.onFocus}>
    <components.Control {...props} />
  </span>
);
const determineOptions = cond([[
  property('selectedCategory'),
  ({selectedCategory, options}) => filter(
    d => d.type === selectedCategory,
    options
  )
], [
  property('textInInput'),
  property('options')
], [
  stubTrue, pipe(
    property('categories'),
    mapObj((category, label) => ({
      value: label,
      label: category.fr,
    })),
  )
]]);

const PopupSelector = props => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [textInInput, setTextInInput] = useState(false);

  const showSecondLevel = selectedCategory || textInInput;
  const options = determineOptions({
    selectedCategory,
    textInInput,
    options: props.options,
    categories: props.categories
  });

  const onSelectChange = useCallback(value => {
    if (value.value in props.categories) {
      setSelectedCategory(value.value);
    }
    else {
      setPopupOpen(false);
      props.onChange(value);
    }
  }, [props.categories, props.onChange]);
  const onClickBack = useCallback(() => setSelectedCategory(null));
  const toggleOpen = useCallback(() => setPopupOpen(true));
  const inputReducer = useCallback((inputValue, {action}) => {
    switch (action) {
      case 'menu-close':
        setTextInInput(false);
        setSelectedCategory(null);
        break;
      case 'input-change':
        const hasSearch = inputValue.length >= 1;
        if (hasSearch !== textInInput) {
          setTextInInput(hasSearch);
          setPopupOpen(true);
        }
        break;
      case 'input-blur':
        setPopupOpen(false);
        break;
      default:
        return;
    }
  }, [textInInput]);

  return (
    <Select
      onFocus={toggleOpen}
      classNamePrefix={showSecondLevel ? 'multilevel-selector__second-level' : 'multilevel-selector__first-level'}
      {...props}
      onInputChange={inputReducer}
      onClickBack={onClickBack}
      selected={selectedCategory}
      components={{
        MenuList,
        Option,
        Control
      }}
      placeholder={`rechercher dans les ${selectedCategory || 'productions'}`}
      controlShouldRenderValue={false}
      menuIsOpen={isPopupOpen}
      onChange={onSelectChange}
      options={options} />
  );
};

export default PopupSelector;
