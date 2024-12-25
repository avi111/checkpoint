import {texts} from "./strings.ts";

type Category =
    | 'films'
    | 'character'
    | 'vehicle'
    | 'starship'
    | 'species';

export const getErrorMessage = (type: Category): string => {
    switch (type) {
        case 'films':
            return texts.AN_ERROR_OCCURRED_WHILE_FETCHING_FILMS;
        case 'character':
            return texts.ERROR_FETCHING_CHARACTER;
        case 'vehicle':
            return texts.ERROR_FETCHING_VEHICLE;
        case 'starship':
            return texts.ERROR_FETCHING_STARSHIP;
        case 'species':
            return texts.ERROR_FETCHING_SPECIES;
        default:
            return texts.AN_UNKNOWN_ERROR_OCCURRED;
    }
};