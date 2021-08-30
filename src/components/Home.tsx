import React from 'react'
const Barcode = require('react-barcode');



export const Home = () => {
    return (
        <div>
            <Barcode value="test" />
        </div>
    )
}
