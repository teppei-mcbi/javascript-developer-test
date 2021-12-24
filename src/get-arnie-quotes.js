const { httpGet } = require('./mock-http-interface');

/**
 * 
 * @param {*} urls - array of strings
 */
const getArnieQuotes = async (urls) => {
  const results = [];

  // TODO: Implement this function.
  if (Array.isArray(urls)) {
    for (const url of urls) {
      const quote = await getQuote(url);
      results.push(quote);
    }
  }
  return results;
};

/**
 * Pass url string and return object with quote or error message
 * 
 * @param {*} url 
 * @returns 
 */
const getQuote = async (url) => {
  const quote = await httpGet(url)
    .then(httpResult => {

      const statusCode = httpResult.status;
      const msgJson = JSON.parse(httpResult.body);

      switch (statusCode) {
        case 200:
          return { 'Arnie Quote': msgJson.message };

        case 500:
        default:
          return { 'FAILURE': msgJson.message }
      }
    })
    .catch(err => {
      return { 'FAILURE': `Unexpected error, ${err.message}`};
    });
    return quote;
}

module.exports = {
  getArnieQuotes,
};
