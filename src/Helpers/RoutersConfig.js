
export const sideList = [
    {link: '/login', label: 'Login', id: '1'},
    {link: '/signup', label: 'SignUp', id: '2'},
    {link: '/articles', label: 'Articles', id: '3'},
    {link: '/users', label: 'Users', id: '4'},
    {link: '/tags', label: 'Tags', id: '5'},
];

export const slArticlesHeaders = [
    {label: 'Title', key: 'title'},
    {label: 'Created', key: 'created'},
];

export const slUserHeaders = [
    { label: 'Id', key: 'id' },
    { label: 'Email', key: 'email' },
    { label: 'Created', key: 'created' },
    { label: 'Modified', key: 'modified' },
];

export const slTagHeaders = [
    { label: 'Id', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'Created', key: 'created' },
    { label: 'Modified', key: 'modified' },
];

export const formatDate = (date) => {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('/');
}