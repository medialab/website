import React from 'react';
import Select, {components} from 'react-select';
import Button from '../misc/Button';
import enums from '../../../../specs/enums.json';

const timedOptions = Object
  .keys(enums.productionTypes.groups)
  .map(value => ({value, label: value}));

const Menu = props => {
  return (
    <components.MenuList {...props}>
      <header className="multilevel-selector__menu-header">
        <Button className="multilevel-selector__menu-header-button" onClick={props.onClickBack}>◀</Button>
        <span className="multilevel-selector__menu-header-text">Search in {props.selected}</span>
      </header>
      {props.children}
    </components.MenuList>
  );
};

const CustomOption = props => (
  <components.Option {...props}>
    <span className="option-container">{props.children}</span>
  </components.Option>
);

export default class PopupSelector extends React.PureComponent {
  state = {isPopupOpen: false, selectedCategory: 'publications', textInInput: false};
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
    this.onClickBack();
    this.props.onChange(value);
  };
  render() {
    const {isPopupOpen, selectedCategory, textInInput} = this.state;
    const CustomMenuRenderer = props => (
      <Menu {...props} onClickBack={this.onClickBack} selected={selectedCategory} />
    );
    const onInputChange = (inputValue, {action}) => {
      switch (action) {
        case 'menu-close':
          return this.setState({
            // textInInput: false,
            // selectedCategory: undefined
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
      else if (!textInInput) {
        return timedOptions;
      }
      else {
        return this.props.options;
      }
    };
    const showSecondLevel = selectedCategory || textInInput;
    return (
      <Select
        onFocus={this.toggleOpen}
        classNamePrefix={showSecondLevel ? 'multilevel-selector__second-level' : 'multilevel-selector__first-level'}
        {...this.props}
        onInputChange={onInputChange}
        components={{
          MenuList: showSecondLevel ? CustomMenuRenderer : components.MenuList,
          Option: showSecondLevel ? components.Option : CustomOption
        }}
        controlShouldRenderValue={false}
        menuIsOpen
        onChange={this.onSelectChange}
        options={chooseOptions()} />
    );
  }
}
