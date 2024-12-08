import { addBookHandler, getAllBookHandler, getByIdBookHandler } from "./handler.js";

export const route = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getByIdBookHandler
    },
];
