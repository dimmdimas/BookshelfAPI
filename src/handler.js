import { nanoid } from "nanoid";
import { book } from "./book.js";

export const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  const Newbook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  book.push(Newbook);

  const isSuccess = book.filter((books) => books.id === id).length > 0;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berasil disimpan",
      data: {
        bookId: id,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    massage: "Book gagal disimpan",
  });
  response.code(500);
  return response;
};

export const getAllBookHandler = (req, h) => {
  const { name, reading, finished } = req.query;

  let theBook = book;

  if (name) {
    theBook = theBook.filter((n) =>
      n.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading) {
    if (reading === "0") {
      theBook = theBook.filter((n) => n.reading === false);
    }
    if (reading === "1") {
      theBook = theBook.filter((n) => n.reading === true);
    }
  }

  if (finished) {
    if (finished === "0") {
      theBook = theBook.filter((n) => n.finished === false);
    }
    if (finished === "1") {
      theBook = theBook.filter((n) => n.finished === true);
    }
  }

  const response = h.response({
    status: "success",
    data: {
      theBook,
    },
  });
  response.code(200);
  return response;
};

export const getByIdBookHandler = (req, h) => {
  const { bookId } = req.params;

  const theBook = book.filter((n) => n.id === bookId)[0];

  if (theBook !== undefined) {
    return {
      status: "success",
      data: {
        theBook,
      },
    };
  }

  const response = h.response({
    status: "fail",
    massage: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

export const updateBookHandler = (req, h) => {
  const { bookId } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = book.findIndex((books) => books.id === bookId);

  if (!name) {
    const response = h.response({
      status: "fail",
      massage: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      massage:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    book[index] = {
      ...book[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      massage: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    massage: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

export const hapusBookHandler = (req, h) => {
  const { bookId } = req.params;

  const index = book.findIndex((books) => books.id === bookId);

  if (index !== -1) {
    book.splice(index, 1);

    const response = h.response({
      status: "success",
      massage: "Buku berasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    massage: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
