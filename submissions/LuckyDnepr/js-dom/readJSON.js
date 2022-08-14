'use strict';

export async function readJSON(source) {
    try {
        const response = await fetch(source);
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error.message);
    }

}
