import React from 'react';
import Select, {components} from 'react-select';
import Button from '../misc/Button';
import enums from '../../../../specs/enums.json';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import omit from 'lodash/fp/omit';

const timedOptions = Object
  .keys(enums.productionTypes.groups)
  .map(value => ({value, label: value}));

const MenuListWithHeader = props => {
  return (
    <components.MenuList {...props}>
      <TransitionGroup appear enter exit>
        <CSSTransition
          key={props.selectProps.selected || 'woké'}
          classNames="fade"
          timeout={200}>
          <div className={`multilevel-selecto__animation ${props.selectProps.selected ? 'second-level' : 'first-level' }`}>
            {props.selectProps.selected && <header className="multilevel-selector__menu-header">
              <Button className="multilevel-selector__menu-header-button" onClick={props.selectProps.onClickBack}>◀</Button>
              <span className="multilevel-selector__menu-header-text">Search in {props.selectProps.selected}</span>
            </header>}
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

export default class PopupSelector extends React.PureComponent {
  state = {isPopupOpen: false, selectedCategory: undefined, textInInput: false};
  toggleOpen = () => {
    this.setState(state => ({
      isPopupOpen: !state.isPopupOpen
    }));
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
    this.toggleOpen();
    // this.onClickBack();
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
              textInInput: hasSearch
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
          MenuList: MenuListWithHeader,
          Option
        }}
        controlShouldRenderValue={false}
        menuIsOpen={isPopupOpen}
        onChange={this.onSelectChange}
        options={chooseOptions()} />
    );
  }
}
