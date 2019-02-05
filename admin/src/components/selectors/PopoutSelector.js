import React from 'react';
import Select, {components} from 'react-select';
import Button from '../misc/Button';
import enums from '../../../../specs/enums.json';

const Menu = props => {
  return (
    <components.MenuList {...props}>
      <div>
        <Button onClick={props.onClickBack}>
          {'<-'}
        </Button>
        Search in {props.selected}
      </div>
      {props.children}
    </components.MenuList>
  );
};
const Blanket = props => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props} />
);
const Dropdown = ({children, isOpen, target, onClose}) => (
  <div css={{position: 'relative'}}>
    {isOpen ? null : target}
    {isOpen ? children : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);

const timedOptions = Object.keys(enums.productionTypes.groups).map(value => ({value, label: value}));

const CustomOption = props => (
  <components.Option {...props}>
    <span className="option-container">{props.children}</span>
  </components.Option>
);

export default class PopupSelector extends React.PureComponent {
  state = {isOpen: false, show: undefined, search: false};
  toggleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };
  onClickBack = () => {
    return this.setState({show: undefined});
  };
  onSelectChange = value => {
    if (timedOptions.includes(value)) {
      return this.setState({
        show: value.value
      });
    }
    this.toggleOpen();
    this.onClickBack();
    this.props.onChange(value);
  };
  render() {
    const {isOpen, show, search} = this.state;
    const CustomMenuRenderer = props => (
      <Menu {...props} onClickBack={this.onClickBack} selected={show} />
    );
    const onInputChange = (inputValue, {action}) => {
      switch (action) {
        case 'menu-close':
          return this.setState({
            search: false,
            show: undefined
          });
        case 'input-change':
          const hasSearch = inputValue.length >= 1;
          if (hasSearch !== this.state.search) {
            return this.setState({
              search: hasSearch
            });
          }
          break;
        default:
          return;
      }
    };
    const chooseOptions = () => {
      if (show) {
        return this.props.options.filter(d => d.familly === show);
      }
      else if (!search) {
        return timedOptions;
      }
      else {
        return this.props.options;
      }
    };
    const showList = show || search;
    return (
      <Dropdown
        isOpen={isOpen}
        onClose={this.toggleOpen}
        target={
          <Button
            onClick={this.toggleOpen}
            isSelected={isOpen}>
            Select a Production
          </Button>
        }>
        <Select
          autoFocus
          classNamePrefix={showList ? 'show-list' : 'hide-list'}
          {...this.props}
          onInputChange={onInputChange}
          components={{
            MenuList: showList ? CustomMenuRenderer : components.MenuList,
            Option: showList ? components.Option : CustomOption
          }}
          controlShouldRenderValue={false}
          menuIsOpen
          onChange={this.onSelectChange}
          options={chooseOptions()} />
      </Dropdown>
    );
  }
}
