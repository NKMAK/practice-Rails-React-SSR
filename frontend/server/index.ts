// server/index.ts
import express from 'express';
import { render } from '../src/enrty-server.tsx';
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  const html = render();
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  `);
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});