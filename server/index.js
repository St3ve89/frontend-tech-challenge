require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

app.listen(4000, function (err) {
  if (err) return err;
  console.log('(HTTP) App now running on port', 4000);
});

app.get('/feeds', (req, res) => {
  try {
    const { page = '1' } = req.query;
    const currentPage = parseInt(page, 10);

    if (isNaN(currentPage) || currentPage < 1) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const feedData = require('./data/feed.json');

    const PAGE_SIZE = 5;
    const pageStartIndex = (currentPage - 1) * PAGE_SIZE;
    const pageEndIndex = currentPage * PAGE_SIZE;

    const paginatedFeeds = feedData.slice(pageStartIndex, pageEndIndex);
    res.json(paginatedFeeds);
  } catch (error) {
    console.error('Error fetching paginated feeds:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/comments/:briefref', (req, res) => {
  const { briefref } = req.params;
  try {
    const comments = require('./data/comments.json');

    const filteredComments = comments.filter(
      (comment) => comment.briefref === briefref
    );

    if (filteredComments.length === 0) {
      return res
        .status(404)
        .json({ error: 'No comments found for the specified briefref' });
    }

    res.json(filteredComments);
  } catch (error) {
    console.error(`Error fetching comments for briefref ${briefref}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
