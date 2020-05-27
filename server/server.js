const express = require('express');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 8080;
const SERVER_ENV = process.env.NODE_ENV || 'default';

app.use((req, res, next) => {
  console.log(`incoming request: ${req.method} to ${req.url}`);
  return next();
});

app.use((req, res, next) => {
  return next({
    error: {
      err: `Unhandled request type: ${req.method} to ${req.url}`,
    },
    message: 'Not Found',
    status: 404, 
    location: 'catch-all route handler',
  })
});

app.use((err, req, res, next) => {
  const { error, message = 'An error occurred', status = 404, location = 'unknown next error' } = err;

  console.log(`
    ERROR CAUGHT AT: ${moment()}
    ERROR THROWN FROM: ${location}
    ERROR DETAILS:
      > ${typeof err === 'object' && err !== null ? JSON.stringify(err) : err}
  `);

  const responseObj = { success: false, message };
  if (process.env.NODE_ENV === 'development') responseObj.error = error;

  return res.status(status).json(responseObj);
});

app.listen(PORT, () => console.log(`${SERVER_ENV} server listening at: ${PORT}`));
