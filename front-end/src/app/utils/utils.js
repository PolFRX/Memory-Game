
export function parseUrl() {
    //debugger;
    const url = window.location;
    const query = url.href.split('?')[1] || '';
    const delimiter = '&';

    return query
        .split(delimiter)
        .map(item => item.split("="))
        .reduce((acc, cv) => {
            acc[cv[0]] = cv[1]
            return acc
        }, {});
    // TODO Step 3.3: Use Array.map() & Array.reduce()
}