import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import url from 'url';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.use(cookieParser());
  server.use(express.json());

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  const authApis = ['/api/auth/local', '/api/auth/register'];

  const proxyGetStrapiApi = proxy('http://strapi:1337', {
    proxyReqPathResolver: req => {
      return `${url.parse(req.url).path}`;
    },

    userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
      // recieves an Object of headers, returns an Object of headers.
      if (userReq.cookies['token'] && !authApis.includes(userReq.url)) {
        headers['Authorization'] = `Bearer ${userReq.cookies['token']}`;
        console.log('Added token to headers');
      }
      return headers;
    }
  }
  );

  const proxyPostStrapiApi = proxy('http://strapi:1337', {
    proxyReqPathResolver: req => {
      return `${url.parse(req.url).path}`;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      if (authApis.includes(userReq.url)) {
        const data = JSON.parse(proxyResData.toString('utf8'));
        userRes.cookie('token', data.jwt, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 ) });
        console.log('Added token to cookies');
        return proxyResData;
      }
    }
  }
  );

  server.post('/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.send(true);
  });

  // Proxy /api to strapi
  server.get('/api/**', proxyGetStrapiApi);
  server.post('/api/**', proxyPostStrapiApi);
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: 'REQUEST', useValue: req },
          { provide: 'RESPONSE', useValue: res },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
