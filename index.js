import express from 'express';
import { v4 as uuid } from 'uuid';

const PORT = process.env.PORT || 3000;

const createBook = (book) => {
  const {
    id = uuid(),
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
  } = book;
  return {
    id, title, description, authors, favorite, fileCover, fileName,
  };
};

const app = express();

const store = {
  books: [],
};

app.use(express.json());

// TODO validation

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  const { books } = store;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = store.books.find((book) => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
  }
});
app.post('/api/books', (req, res) => {
  const { books } = store;
  const newBook = createBook(req.body);
  books.push(newBook);
  res.status(201);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { params: { id }, body } = req;
  const { books } = store;
  const idx = books.findIndex((books) => books.id === id);
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      ...body,
    };
    res.json(books[idx]);
  } else {
    res.status(404);
  }
});
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { books } = store;
  const idx = books.findIndex((books) => books.id === id);
  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
