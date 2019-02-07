import React from 'react';
import Select, {components} from 'react-select';
import Button from '../misc/Button';
import enums from '../../../../specs/enums.json';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const timedOptions = Object
  .keys(enums.productionTypes.groups)
  .map(value => ({value, label: value}));

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
          key={props.selectProps.selected || 'woké'}
          classNames="fade"
          timeout={200}>
          <div className={`multilevel-selecto__animation ${props.selectProps.selected ? 'second-level' : 'first-level' }`}>
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
export default class PopupSelector extends React.PureComponent {
  state = {isPopupOpen: false, selectedCategory: undefined, textInInput: false};
  toggleOpen = () => {
    this.setState({
      isPopupOpen: true
    });
  };
  onClickBack = () => {
    return this.setState({selectedCategory: undefined});
  };
  onSelectChange = value => {
    if (timedOptions.includes(value)) {
      return this.setState({
        selectedCategory: value.value
      });
    }
    this.setState({
      isPopupOpen: false
    });
    this.props.onChange(value);
  };
  render() {
    const {isPopupOpen, selectedCategory, textInInput} = this.state;
    const onInputChange = (inputValue, {action}) => {
      switch (action) {
        case 'menu-close':
          return this.setState({
            textInInput: false,
            selectedCategory: undefined
          });
        case 'input-change':
          const hasSearch = inputValue.length >= 1;
          if (hasSearch !== this.state.textInInput) {
            return this.setState({
              textInInput: hasSearch,
              isPopupOpen: true
            });
          }
          break;
        case 'input-blur':
          return this.setState({
            isPopupOpen: false
          });
        default:
          return;
      }
    };
    const chooseOptions = () => {
      if (selectedCategory) {
        return this.props.options.filter(d => d.familly === selectedCategory);
      }
      else if (textInInput) {
        return this.props.options;
      }
      else {
        return timedOptions;
      }
    };
    const showSecondLevel = selectedCategory || textInInput;
    return (
      <Select
        onFocus={this.toggleOpen}
        classNamePrefix={showSecondLevel ? 'multilevel-selector__second-level' : 'multilevel-selector__first-level'}
        {...this.props}
        onInputChange={onInputChange}
        onClickBack={this.onClickBack}
        selected={selectedCategory}
        components={{
          MenuList,
          Option,
          Control
        }}
        placeholder={`Search in every ${selectedCategory || 'productions'}`}
        controlShouldRenderValue={false}
        menuIsOpen={isPopupOpen}
        onChange={this.onSelectChange}
        options={chooseOptions()} />
    );
  }
}
