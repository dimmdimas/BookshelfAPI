import { addBookHandler, getAllBookHandler, getByIdBookHandler, updateBookHandler } from "./handler.js";

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
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler
    },
];
