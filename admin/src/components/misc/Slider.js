import React from 'react';

export default function Slider(props) {
  const {
    min = -255,
    max = 255,
    onChange = Function.prototype,
    step = 1,
    value
  } = props;

  return (
    <input
      type="range"
      className="slider is-fullwidth is-circle"
      max={max}
      min={min}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
}
