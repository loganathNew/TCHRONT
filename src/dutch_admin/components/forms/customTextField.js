import React from 'react';

import TextField from '@mui/material/TextField';
import validator from './validator';

class CustomTextField extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        let textProps = { ...props };
        delete textProps.onChangeText;
        this.state = { textProps: textProps }
    }

    onChangeText(e) {
        let res = (this.props.required && validator.empty(e.target.value)) ? true : false;
        this.props.onChangeText(res);
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        let textProps = { ...nextProps };
        delete textProps.onChangeText;
        this.setState({ textProps: textProps });
    }

    render() {
        return (
            <TextField {...this.state.textProps}
                onBlur={value => { this.onChangeText(value) }}
                onClick={value => { this.onChangeText(value) }}
                onFocus={value => { this.onChangeText(value) }}
                onKeyUp={value => { this.onChangeText(value) }}
                onChange={value => { this.onChangeText(value) }} />
        )
    }
}


export default CustomTextField;
