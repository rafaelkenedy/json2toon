import { encode } from '@toon-format/toon';

export const convertJsonToToon = (json: any): any => {
    try {
        return encode(json);
    } catch (error) {
        console.error('TOON encoding failed:', error);
        throw error;
    }
};
