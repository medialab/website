import React, {Component} from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import range from 'lodash/range';

import Button from '../misc/Button';

const TODAY = new Date();

const YEARS = range(2007, TODAY.getFullYear() + 3);

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

const HOUR_OPTIONS = range(0, 24 + 1).map(hour => {
  const value = hour < 10 ? ('0' + hour) : ('' + hour);

  return {
    label: value,
    value
  };
});

const MINUTE_OPTIONS = range(0, 60 + 1).map(min => {
  const value = min < 10 ? ('0' + min) : ('' + min);

  return {
    label: value,
    value
  };
});

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
  },
  hour: {
    control(provided) {
      return {
        ...provided,
        width: '130px'
      };
    }
  },
  minutes: {
    control(provided) {
      return {
        ...provided,
        width: '130px'
      };
    }
  }
};

function isYear(string) {
  return string.length === 4 && !isNaN(+string) && +string;
}

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

function formatTime(hour, minute) {
  if (!hour)
    return '';

  if (!minute)
    return hour + ':00';

  return hour + ':' + minute;
}

function parseDate(string) {
  const split = (string || '').split('T')[0].split('-');

  return {
    year: split[0] || null,
    month: split[1] || null,
    day: split[2] || null
  };
}

function parseTime(string) {
  if (!string || !string.includes('T'))
    return {
      hour: null,
      minutes: null
    };

  const split = string.split('T')[1].split(':');

  return {
    hour: split[0] || null,
    minute: split[1] || null
  };
}

export default class DateSelector extends Component {
  constructor(props) {
    super(props);

    const {year, month, day} = parseDate(props.value);

    this.state = {
      year: YEAR_OPTIONS.find(o => o.value === year) || null,
      month: MONTH_OPTIONS.find(o => o.value === month) || null,
      day: DAY_OPTIONS.find(o => o.value === day) || null
    };

    if (props.datetime) {
      const {hour, minute} = parseTime(props.value);

      this.state.hour = HOUR_OPTIONS.find(o => o.value === hour) || null;
      this.state.minute = MINUTE_OPTIONS.find(o => o.value === minute) || null;
    }

    this.monthRef = React.createRef();
    this.dayRef = React.createRef();
    this.hourRef = React.createRef();
    this.minuteRef = React.createRef();
  }

  handleYear = o => {
    this.setState({year: o}, () => {
      this.handleChange();

      if (!this.state.month)
        this.monthRef.current.focus();
    });
  };

  handleMonth = o => {
    this.setState({month: o}, () => {
      this.handleChange();

      if (!this.state.day)
        this.dayRef.current.focus();
    });
  };

  handleDay = o => {
    this.setState({day: o}, this.handleChange);

    if (this.props.datetime && !this.state.hour)
      setTimeout(() => this.hourRef.current.focus(), 200);
  };

  handleHour = o => {
    this.setState({hour: o}, this.handleChange);

    if (this.props.datetime && !this.state.minute)
      setTimeout(() => this.minuteRef.current.focus(), 200);
  };

  handleMinute = o => {
    this.setState({minute: o}, this.handleChange);
  };

  handleChange = () => {
    const {
      year,
      month,
      day,
      hour,
      minute
    } = this.state;

    const validationError = validate(this.props.precision, year, month, day);

    if (!validationError) {
      if (year) {

        let formatted = format(year.value, month && month.value, day && day.value);

        if (this.props.datetime && hour)
          formatted += 'T' + formatTime(hour.value, minute && minute.value);

        this.props.onChange(formatted);
      }
      else {
        this.props.onChange();
      }
    }
  };

  handleErase = () => {
    this.setState({year: null, month: null, day: null, hour: null, minute: null}, this.handleChange);
  };

  render() {
    const {
      precision = 'year',
      datetime = false
    } = this.props;

    const {
      year,
      month,
      day,
      hour,
      minute
    } = this.state;

    const validationError = validate(precision, year, month, day);

    return (
      <>
        <div className="field">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <CreatableSelect
                  isClearable={!month}
                  placeholder="Year"
                  menuPlacement="top"
                  isValidNewOption={isYear}
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
                  options={MONTH_OPTIONS}
                  ref={this.monthRef} />
              </div>
              <div className="level-item">
                <Select
                  isClearable={!hour}
                  isDisabled={!month}
                  placeholder="Day"
                  menuPlacement="top"
                  value={day}
                  onChange={this.handleDay}
                  styles={customStyles.day}
                  options={DAY_OPTIONS}
                  ref={this.dayRef} />
              </div>
              <div className="level-item">
                {year && <Button kind="text" onClick={this.handleErase}>Erase</Button>}
              </div>
            </div>
          </div>
          {validationError && <p className="help is-info">{validationError}</p>}
        </div>
        {datetime && (
          <div className="field">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <Select
                      isClearable={!minute}
                      isDisabled={!day}
                      placeholder="Hour"
                      menuPlacement="top"
                      value={hour}
                      onChange={this.handleHour}
                      styles={customStyles.hour}
                      options={HOUR_OPTIONS}
                      ref={this.hourRef} />
                </div>
                <div className="level-item">
                  <Select
                      isClearable
                      isDisabled={!hour}
                      placeholder="Min"
                      menuPlacement="top"
                      value={minute}
                      onChange={this.handleMinute}
                      styles={customStyles.minutes}
                      options={MINUTE_OPTIONS}
                      ref={this.minuteRef} />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
