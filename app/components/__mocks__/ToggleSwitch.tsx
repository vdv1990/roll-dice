import React from 'react';

const ToggleSwitch = ({ isEnabled, onChange }) => (
  <input
    type="checkbox"
    checked={isEnabled}
    onChange={(e) => onChange(e.target.checked)}
    data-testid="toggle-switch"
  />
);

export default ToggleSwitch;
