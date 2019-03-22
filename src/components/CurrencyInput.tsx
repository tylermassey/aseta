import * as React from 'react';
import { Input } from 'reactstrap';
import { getKeyValue, NumberKey } from 'src/utils/keyMapper';

interface OwnProps {
    value: number;
    onChange: (amount: number) => void;
}

export default class CurrencyInput extends React.Component<OwnProps, {}> {
    getRawInputFromPropValue = () =>
        this.props.value ? this.props.value.toString().replace('.', '') : '0';

    padZeros = (valueString: string): string => {
        if (valueString.length === 4) {
            return valueString;
        }
        return this.padZeros(0 + valueString);
    };

    convertToDecimalValue = (valueString: string): string => {
        if (valueString.length < 4) {
            valueString = this.padZeros(valueString);
        }
        const decimalIndex = valueString.length - 2;
        valueString =
            valueString.substr(0, decimalIndex) +
            '.' +
            valueString.substr(decimalIndex);
        return valueString;
    };

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const keyValue = getKeyValue(e.keyCode);
        const currentRawInput = this.getRawInputFromPropValue();
        let newRawInput = currentRawInput;
        switch (keyValue.type) {
            case 'number':
                const value = (keyValue as NumberKey).value;
                if (value === 0 && currentRawInput === '0') {
                    break;
                } else if (value !== 0 && currentRawInput === '0') {
                    newRawInput = value.toString();
                    break;
                } else {
                    newRawInput = currentRawInput + value;
                    break;
                }
            case 'backspace':
                newRawInput = currentRawInput.slice(0, -1);
                break;
        }
        this.props.onChange(+this.convertToDecimalValue(newRawInput));
    };

    render() {
        return (
            <Input
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                value={this.convertToDecimalValue(
                    this.getRawInputFromPropValue()
                )}
                pattern="[0-9]*"
            />
        );
    }
}
