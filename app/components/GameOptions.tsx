
import React from 'react';
import StyledSelect from './StyledSelect';
import ToggleSwitch from './ToggleSwitch';
import { Theme, themes } from './types';

interface GameOptionsProps {
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
  limitEnabled: boolean;
  setLimitEnabled: (enabled: boolean) => void;
  maxRollsSelection: string;
  setMaxRollsSelection: (value: string) => void;
  customMaxRolls: number;
  setCustomMaxRolls: (value: number) => void;
  themes: Record<Theme, string>;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const GameOptions: React.FC<GameOptionsProps> = ({ 
    showOptions, 
    setShowOptions, 
    limitEnabled, 
    setLimitEnabled, 
    maxRollsSelection, 
    setMaxRollsSelection, 
    customMaxRolls, 
    setCustomMaxRolls, 
    themes, 
    theme, 
    setTheme 
}) => (
    <>
        <a onClick={() => setShowOptions(!showOptions)} className="text-gray-500 cursor-pointer hover:text-gray-800 transition">
            Options {showOptions ? '▴' : '▾'}
        </a>

        {showOptions && (
            <div className="bg-gray-100 rounded-lg p-4 mt-4 text-left space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-gray-700">Enable Roll Limit</label>
                    <ToggleSwitch isEnabled={limitEnabled} onChange={() => setLimitEnabled(!limitEnabled)} />
                </div>
                {limitEnabled && (
                    <>
                        <div className="flex justify-between items-center">
                            <label className="text-gray-700">Max Rolls</label>
                            <StyledSelect
                                options={[{ value: '3', label: '3' }, { value: 'other', label: 'Other...' }]}
                                value={maxRollsSelection}
                                onChange={(value) => setMaxRollsSelection(value)}
                            />
                        </div>
                        {maxRollsSelection === 'other' && (
                            <div className="flex justify-between items-center mt-2">
                                <label htmlFor="customMaxRollsInput" className="text-gray-700">Custom Max:</label>
                                <input type="number" id="customMaxRollsInput" value={customMaxRolls} onChange={(e) => setCustomMaxRolls(Number(e.target.value))} className="w-24 p-2 rounded-lg border border-gray-300 font-['Nunito',sans-serif]" min="1"/>
                            </div>
                        )}
                    </>
                )}
                <div className="flex justify-between items-center pt-2 border-t mt-3">
                    <label className="text-gray-700">Theme</label>
                    <StyledSelect
                        options={Object.keys(themes).map(t => ({ value: t, label: t }))}
                        value={theme}
                        onChange={(value) => setTheme(value as Theme)}
                    />
                </div>
            </div>
        )}
    </>
);

export default GameOptions;
