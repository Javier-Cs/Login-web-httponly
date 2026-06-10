export const API_BASE_URL = 'https://apioper.legumfrutsa.com/api/PeopleData';

export const SITE_TITLE = "People Data";
export const logosvg = 'https://javier-cs.github.io/Images-Box-Web/images/favicon%20copy.ico';

export function url(path = ''){
    return `${import.meta.env.SITE}${import.meta.env.BASE_URL}${path}`;
}