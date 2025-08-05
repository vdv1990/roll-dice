
import React from 'react';

interface ToggleSwitchProps {
  isEnabled: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

// This component is the toggle switch for advanced options
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  isEnabled, 
  onChange, 
  label = 'Toggle switch',
  disabled = false 
}) => (
  <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} aria-label={label}>
    <input 
      type="checkbox" 
      checked={isEnabled} 
      onChange={(e) => !disabled && onChange(e.target.checked)}
      disabled={disabled}
      className="sr-only peer" 
      aria-checked={isEnabled}
    />
    <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 
      peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
      after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
      after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
      peer-checked:bg-blue-600 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    </div>
  </label>
);

export default ToggleSwitch;
