import React from 'react';
import { connect } from 'react-redux';
import { searchAction } from "../actions/search";
import { placeTypeConversion } from '../helpers/search';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleDropdown: false,
            inputValue: '',
            selectedOption: {}
        };
    }

    componentDidMount() {
        document.addEventListener( 'mousedown', this.handlePageClick, false )
    }

    // The following function is used to determine if the dropdown should be open or closed
    handlePageClick = e => {
        if( this.selectedInput.contains( e.target ) ) {
            // Clicked Inside
            this.setState({
                toggleDropdown: true,
            });
            return;
        }
        this.setState({
            toggleDropdown: false,
        });
    };

    // The following function is used to set the selectedInput value to what the user typed
    setInput = () => {
        if( this.state.inputValue.length ) this.selectedInput.value = this.state.inputValue;
    };

    // The following function handles the change event of the input and updates the values in state and also makes a request to get/update the returned results by calling the searchAction
    handleChange = e => {
        this.setState({
            inputValue: e.target.value
        });
        if ( e.target.value.length >= 2 ){
            const { searchAction } = this.props;
            searchAction( e.target.value );
        }
    };

    // The following function sets the input value to the item clicked and also sets the selectedOption so that this information is known when submittintg the form
    handleClick = obj => {
        this.selectedInput.value = obj.label;
        this.setState({
            toggleDropdown: false,
            selectedOption: obj,
        })
    };

    render() {
        const { searchReducer } = this.props;
        return (
            <div className="search">
                <h1>Where are you going ?</h1>
                <div className="dropdown">
                    <label htmlFor="pickupLocation" className="pickup">Pick-up Location</label>
                    <input
                        autocomplete="off"
                        ref={ ( ref ) => this.selectedInput = ref }
                        className="textbox"
                        name="pickupLocation"
                        placeholder="city, airport, station, region and district..."
                        onChange={ this.handleChange }
                        onClick={ this.setInput }
                    />
                    {
                        searchReducer && searchReducer.result && searchReducer.result.docs && this.state.toggleDropdown === true && this.state.inputValue.length >= 2 &&
                            <div className="results">
                                <ol className="list">
                                    {
                                        searchReducer.result.docs.map( ( location, i ) => {
                                            const placeType = placeTypeConversion( location.placeType );
                                            let line1 = location.name;
                                            if ( location.placeType === 'A' ) line1 += ` ( ${ location.iata } )`;
                                            let line2 = '';
                                            if( location.city ) line2 += location.city;
                                            else if( location.region ) line2 += location.region;
                                            if( location.country ) line2 += `, ${ location.country }`;
                                            const label = `${ line1 }, ${ line2 }`;
                                            console.log( "PLACETYPE", placeType );
                                            return (
                                                <li key={ i } className="item" onClick={ () => this.handleClick( { value: location.bookingId, label } ) }>
                                                    {
                                                        placeType !== null &&
                                                            <div className="pill-container">
                                                                <div className={ `pill ${ placeType.toLowerCase() }` }>{ placeType }</div>
                                                            </div>
                                                    }
                                                    <div className="text-container">
                                                        <div className="line-1">{ line1 }</div>
                                                        <div className="line-2">{ line2 }</div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    searchAction: ( inputValue ) => dispatch( searchAction( inputValue ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Search );