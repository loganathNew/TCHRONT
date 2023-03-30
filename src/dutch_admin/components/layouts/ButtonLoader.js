import React from 'react';

export default class ButtonLoader extends React.Component {
    render() {
        return (
            <div id="preloader" style={{ position: "unset", zIndex: "0" }}>
                <div className="sk-three-bounce" style={{ backgroundColor: "#2f4cdd", fontSize: '12px' }}>
                    <div className="sk-child sk-bounce1" style={{ backgroundColor: "#fff", width: '20px', height: '20px' }}></div>
                    <div className="sk-child sk-bounce2" style={{ backgroundColor: "#fff", width: '20px', height: '20px' }}></div>
                    <div className="sk-child sk-bounce3" style={{ backgroundColor: "#fff", width: '20px', height: '20px' }}></div>
                </div>
            </div>
        )
    }
}
