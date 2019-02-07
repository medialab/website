import React from 'react';
import Select, {components} from 'react-select';
import cond from 'lodash/fp/cond';
import property from 'lodash/fp/property';
import stubTrue from 'lodash/fp/stubTrue';
import Button from '../misc/Button';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

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

const determineOptions = cond([
  [
    property('state.selectedCategory'),
    ({state, props}) => props.options.filter(d => d.familly === state.selectedCategory)
  ],
  [
    property('state.textInInput'),
    property('props.options')
  ],
  [
    stubTrue,
    property('props.groupBy')
  ]
]);

export default class PopupSelector extends React.PureComponent {
  state = {
    isPopupOpen: false,
    selectedCategory: undefined,
    textInInput: false
  };
  toggleOpen = () => {
    this.setState({
      isPopupOpen: true
    });
  };
  onClickBack = () => {
    this.setState({selectedCategory: undefined});
  };
  onSelectChange = value => {
    if (this.props.groupBy.includes(value)) {
      return this.setState({
        selectedCategory: value.value
      });
    }
    this.setState({isPopupOpen: false});
    this.props.onChange(value);
  };
  onInputChange = (inputValue, {action}) => {
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
  render() {
    const {isPopupOpen, selectedCategory, textInInput} = this.state;
    const showSecondLevel = selectedCategory || textInInput;
    return (
      <Select
        onFocus={this.toggleOpen}
        classNamePrefix={showSecondLevel ? 'multilevel-selector__second-level' : 'multilevel-selector__first-level'}
        {...this.props}
        onInputChange={this.onInputChange}
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
        options={determineOptions(this)} />
    );
  }
}
