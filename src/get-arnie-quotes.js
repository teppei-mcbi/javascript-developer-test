const { httpGet } = require('./mock-http-interface');

// store http get result as cache
const dataCache = new Map();

/**
 * Returns an array of object which includes either
 * - { 'Arnie Quote': '<Some cool quote>' }
 * - { 'FAILURE': '<error message>' }
 * 
 * @param {*} urls - array of strings
 * @returns an array includes objects
 */
const getArnieQuotes = async (urls) => {
  const results = [];

  // TODO: Implement this function.
  if (Array.isArray(urls)) { // check if param: 'urls' is an array
    
    // loop through th string arrays
    for (const url of urls) {
      const quote = await getQuote(url);

      // push to 'results' array
      results.push(quote);
    }
  }
  return results;
};

/**
 * Pass url string and return object with quote (200 success status) 
 * or error message (500 error status)
 * 
 * @param {*} url 
 * @returns success/failture object
 */
const getQuote = async (url) => {

  const objInCache = dataCache.get(url);
  if (objInCache) {
    // console.log(`quote with url: ${url} exists in cache`)
    return objInCache;

  } else {
    // console.log(`quote with url: ${url} does not exist in cache`)
    const quote = await httpGet(url)
    .then(httpResult => {

      // http get is successful
      const statusCode = httpResult.status;
      const msgJson = JSON.parse(httpResult.body); // body has a string which contains JSON object
      const msg = msgJson.message;

      switch (statusCode) {
        case 200:
          return { 'Arnie Quote': msg };

        case 500:
        default:
          return { 'FAILURE': msg };
      }
    })
    .catch(err => {
      return { 'FAILURE': `Unexpected error, ${err.message}`};
    });

    // store in cache with key: 'url', value: quote object
    // console.log(`set in cache: ${url}`)
    dataCache.set(url, quote);

    return quote;
  }
};


// lines below can be used to run getArnieQuotes(urls) functions using 'npm start'
// const urls = [
//   'http://www.smokeballdev.com/arnie0',
//   'http://www.smokeballdev.com/arnie1',
//   'http://www.smokeballdev.com/arnie2',
//   'http://www.smokeballdev.com/arnie3',
// ];

// async function testRun() {
//   console.log('test run no.1'); // no data cache to be used
//   await getArnieQuotes(urls);
  
//   console.log('test run no.2'); // data cache should be used
//   await getArnieQuotes(urls);
// }

// testRun();

module.exports = {
  getArnieQuotes,
};
