const browserify = require('browserify');
const concatStream = require('concat-stream');
const fs = require('fs');
const path = require('path');

function bundleToPage(bundle) {
  const pageContents = `
    <head>
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
      <title> Max Gurewitz </title>
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
        }

        div {
          box-sizing: border-box;
        }
      </style>
    </head>
    <body>
      <div id="app"></div>
      <script>${bundle}</script>
      <script>
        app.default.render('#app');
      </script>
    </body>
  `;

  const bundlePath = path.join(__dirname, '..', 'index.html');
  fs.writeFileSync(bundlePath, pageContents);
}

const bundler = browserify('src/index.tsx', {
  standalone: 'app'
});

bundler.on('error', err => {
  console.error(err.stack);
  process.exit(1);
});

bundler
  .plugin('tsify', { noImplicitAny: true })
  .bundle()
  .pipe(concatStream(bundleToPage));

