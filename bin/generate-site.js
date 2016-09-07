const browserify = require('browserify');
const concatStream = require('concat-stream');
const envify = require('envify/custom');
const fs = require('fs');
const path = require('path');

function bundleToPage(bundle) {
  const pageContents = `
    <head>
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
      <title> Max Gurewitz </title>
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
        }

        div {
          box-sizing: border-box;
        }

        .base-view::-webkit-scrollbar {
          width: 1em;
          height: 1em;
        }

        .base-view::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
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
  fs.writeFileSync(bundlePath, pageContents, { flag: 'w+' });
}

const bundler = browserify('src/index.tsx', {
  standalone: 'app'
});

bundler.on('error', err => {
  console.error(err.stack);
  process.exit(1);
});

bundler
  .transform(envify({ NODE_ENV: 'production' }))
  .plugin('tsify', { noImplicitAny: true })
  .transform({ global: true }, 'uglifyify')
  .bundle()
  .pipe(concatStream(bundleToPage));
