import React, {Component} from 'react';
import Select from 'react-select';
import range from 'lodash/range';

import Button from '../misc/Button';

const TODAY = new Date();

const YEARS = range(2010, TODAY.getFullYear() + 3);

const YEAR_OPTIONS = YEARS.map(year => {
  return {
    value: '' + year,
    label: '' + year
  };
});

const MONTH_OPTIONS = [
  {label: 'January', value: '01'},
  {label: 'February', value: '02'},
  {label: 'March', value: '03'},
  {label: 'April', value: '04'},
  {label: 'May', value: '05'},
  {label: 'June', value: '06'},
  {label: 'July', value: '07'},
  {label: 'August', value: '08'},
  {label: 'September', value: '09'},
  {label: 'October', value: '10'},
  {label: 'November', value: '11'},
  {label: 'December', value: '12'},
];

const DAY_OPTIONS = range(1, 31 + 1).map(day => ({
  label: '' + day,
  value: day < 10 ? ('0' + day) : ('' + day)
}));

const customStyles = {
  year: {
    control(provided) {
      return {
        ...provided,
        width: '130px'
      };
    }
  },
  month: {
    control(provided) {
      return {
        ...provided,
        width: '180px'
      };
    }
  },
  day: {
    control(provided) {
      return {
        ...provided,
        width: '120px'
      };
    }
  }
};

function validate(precision, year, month, day) {
  if (!year && !month && !day)
    return null;

  if (precision === 'month' && !month)
    return 'A month is required';

  else if (precision === 'day' && !day)
    return 'A month and a day is required';

  return null;
}

function format(year, month, day) {
  return [year, month, day].filter(x => x).join('-');
}

function parse(date) {
  const split = (date || '').split('-');

  return {
    year: split[0] || null,
    month: split[1] || null,
    day: split[2] || null
  };
}

export default class DateSelector extends Component {
  constructor(props) {
    super(props);

    const {year, month, day} = parse(props.value);

    this.state = {
      year: YEAR_OPTIONS.find(o => o.value === year) || null,
      month: MONTH_OPTIONS.find(o => o.value === month) || null,
      day: DAY_OPTIONS.find(o => o.value === day) || null
    };
  }

  handleYear = o => {
    this.setState({year: o}, this.handleChange);
  };

  handleMonth = o => {
    this.setState({month: o}, this.handleChange);
  };

  handleDay = o => {
    this.setState({day: o}, this.handleChange);
  };

  handleChange = () => {
    const {
      year,
      month,
      day
    } = this.state;

    const validationError = validate(this.props.precision, year, month, day);

    if (!validationError) {
      if (year)
        this.props.onChange(format(year.value, month.value, day.value));
      else
        this.props.onChange();
    }
  };

  handleErase = () => {
    this.setState({year: null, month: null, day: null}, this.handleChange);
  };

  render() {
    const {
      precision = 'year'
    } = this.props;

    const {
      year,
      month,
      day
    } = this.state;

    const validationError = validate(precision, year, month, day);

    return (
      <div className="field">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <Select
                isClearable={!month}
                placeholder="Year"
                menuPlacement="top"
                value={year}
                onChange={this.handleYear}
                styles={customStyles.year}
                options={YEAR_OPTIONS} />
            </div>
            <div className="level-item">
              <Select
                isClearable={!day}
                isDisabled={!year}
                placeholder="Month"
                menuPlacement="top"
                value={month}
                onChange={this.handleMonth}
                styles={customStyles.month}
                options={MONTH_OPTIONS} />
            </div>
            <div className="level-item">
              <Select
                isClearable
                isDisabled={!month}
                placeholder="Day"
                menuPlacement="top"
                value={day}
                onChange={this.handleDay}
                styles={customStyles.day}
                options={DAY_OPTIONS} />
            </div>
            <div className="level-item">
              {year && <Button kind="text" onClick={this.handleErase}>Erase</Button>}
            </div>
          </div>
        </div>
        {validationError && <p className="help is-info">{validationError}</p>}
      </div>
    );
  }
}
