const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');

const {
  renderLibrary,
  renderPageCreateBook,
  createPage,
  renderPageBook,
  updateBook,
  renderPageEditeBook,
  deleteBook
  } = require('../regulator/booksRender');


router.get('/', renderLibrary);
router.get('/create', renderPageCreateBook);
router.post('/create', fileMulter.single('fileBook'), createPage);

router.get('/:id', renderPageBook );
router.get('/update/:id', updateBook);
router.post('/update/:id', fileMulter.single('fileBook'), renderPageEditeBook);
router.post('/delete/:id', deleteBook);

module.exports = router