/**
 * utils.ts
 *
 * Utility functions to be used throughout the application, that are not react component specific.
 */

/**
 * Extract the value of the string representation of a property path from the data.
 * This method is responsible for fetching the value of a parameter (e.g. res.hobbies[0])
 * from the response payload. It does so by converting the dot (.) notation path it receives into keys, and uses a
 * reduce function to keep retrieving data until it has completely walked the path
 * @param obj - object to evaluate (data)
 * @param path - path to attribute to retrieve (e.g. res.)
 */
const getObjectValue = (obj: object | undefined, path: string): any => {
    const keys = path.match(/[^.[\]]+/g);

    if (!keys) return undefined;

    return keys.reduce((acc: any, key: string | number) => (acc !== undefined ? acc[key] : undefined), obj);
};

export { getObjectValue };
