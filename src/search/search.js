import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <h1>Where are you going ?</h1>
                <div className="dropdown">
                    <label htmlFor="pickupLocation" className="pickup">Pick-up Location</label>
                    <input className="textbox" name="pickupLocation"
                    />
                </div>
            </div>
        )
    }
}
export default Search;