import React, { Fragment, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import CustomTextField from './customTextField';

class CustomTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeDateTime = this.onChangeDateTime.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeDateTime(value) {
        this.props.onChangeDateTime(value);
    }

    onChangeText(res) {
        this.props.onChangeText(res);
    }

    render() {
        const appTheme = createTheme({
            components: {
                "MuiOutlinedInput": {
                    styleOverrides: {
                        root: {
                            background: "#fff",
                            color: "#6e6e6e",
                            height: "56px",
                            display: "inline-flex",
                            width: "100%",
                            fontFamily: "'poppins', sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            backgroundClip: "padding-box",
                            transition: "border-color 0.15s ease-in-out, boxShadow 0.15s ease-in-out",
                        },
                        "notchedOutline": {
                            border: "1px solid #f0f1f5",
                            // borderRadius: "100px",
                        },

                    },
                },
                "MuiOutlinedInput:hover": {
                    styleOverrides: {
                        root: {
                            border: "1px solid red",
                            borderRadius: "50px",
                        }
                    }
                },
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            width: "100%",
                        },
                    },
                },
            }
        });


        const { hasDateTimeError, showDateTimeErrorMsg } = this.props;

        return (
            <ThemeProvider theme={appTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                        ampm={false}
                        inputFormat="HH:mm"
                        renderInput={(props) =>
                            <CustomTextField {...props}
                                required={true}
                                onChangeText={(newValue) => {
                                    this.onChangeText(newValue);
                                }}
                            />
                        }
                        value={this.props.dateTime}
                        onChange={(newValue) => {
                            this.onChangeDateTime(newValue);
                        }}
                    />
                    {hasDateTimeError && showDateTimeErrorMsg ?
                        <div className="react-inputs-validation__msg_identifier react-inputs-validation__msg react-inputs-validation__error">Please enter date time field</div> : ""
                    }
                </LocalizationProvider>
            </ThemeProvider>
        )
    }


}

export default CustomTimePicker;



