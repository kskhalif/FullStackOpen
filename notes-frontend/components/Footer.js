import React from 'react';

const Footer = () => {
    const footerStyle = {
        color: 'black',
        fontStyle: 'italic',
        fontSize: 16 
    };
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, by Kacem Khalife</em>
        </div>
    );
};

export default Footer;
