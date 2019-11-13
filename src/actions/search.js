import axios from 'axios';

export const searchAction = ( inputValue ) => dispatch => {
    axios.get('https://www.rentalcars.com/FTSAutocomplete.do', {
        params: {
            solrIndex: 'fts_en',
            solrRows: 6,
            solrTerm: inputValue
        }
    })
        .then(function (response) {
            dispatch({
                type: 'SEARCH_ACTION',
                payload: response.data.results
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });

};