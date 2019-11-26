export const placeTypeConversion = placeType => {
    switch( placeType ){
        case 'A':
            return 'Airport';
        case 'C':
            return 'City';
        case 'T':
            return 'Station';
        case 'Z':
        case 'G':
            return 'Place';
        default:
            return 'Default';
    }
};