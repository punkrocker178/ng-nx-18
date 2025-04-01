import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import cookieParser from 'cookie-parser';
import express from 'express';
import proxy from 'express-http-proxy';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import url from 'url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
app.use(cookieParser());
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

const authApis = ['/api/auth/local', '/api/auth/register'];

const proxyGetStrapiApi = proxy('http://strapi:1337', {
  proxyReqPathResolver: req => {
    return `${url.parse(req.url).path}`;
  },
  proxyReqOptDecorator: (proxyReqOpts, userReq) => {
    // recieves an Object of headers, returns an Object of headers.
    if (userReq.cookies['token'] && !authApis.includes(userReq.url)) {
      if (proxyReqOpts.headers) {
        proxyReqOpts.headers['Authorization'] = `Bearer ${userReq.cookies['token']}`;
        console.log('Added token to headers');
      }
    }
    return proxyReqOpts;
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
      userRes.cookie('token', data.jwt, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
      console.log('Added token to cookies');
      return proxyResData;
    }
  }
}
);

app.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.send(true);
});

// Proxy /api to strapi
app.get('/api/**', proxyGetStrapiApi);
app.post('/api/**', proxyPostStrapiApi);
/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
