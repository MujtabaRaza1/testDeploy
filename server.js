const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle clean URLs for pages
app.get('/:page', (req, res) => {
  // Map clean URLs to their HTML files
  res.sendFile(path.join(__dirname, `${req.params.page}.html`), (err) => {
    if (err) {
      console.error(`Error serving ${req.params.page}.html:`, err);
      res.status(404).send('Page not found');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Try accessing pages like http://localhost:${port}/pricing`);
}); 