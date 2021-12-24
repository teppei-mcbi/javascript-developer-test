const { httpGet } = require('./mock-http-interface');

/**
 * 
 * @param {*} urls - array of strings
 */
const getArnieQuotes = async (urls) => {
  console.log(`----------- getArnieQuotes ----------`)
  const results = [];

  // TODO: Implement this function.
  if (Array.isArray(urls)) {
    for (const url of urls) {
      console.log(`[URL]: ${url}`)

      const quote = await httpGet(url)
        .then(httpResult => {

          const statusCode = httpResult.status;
          const msgJson = JSON.parse(httpResult.body);

          switch (statusCode) {
            case 200:
              return { 'Arnie Quote': msgJson.message };
        
            case 500:
            default:
              return { 'FAILURE': msgJson.message}
          }

          console.log(`success value: ${JSON.stringify(value)}`)
          return value;
        })
        .catch(err => {
          console.error(`error: ${JSON.stringify(err)}`)
          return err
        });

      console.log(`--- quote: ${JSON.stringify(quote)}`)

      results.push(quote);
    }

    console.log(`results: ${JSON.stringify(results)}`)

  }
  return results;
};

const urls = [
  'http://www.smokeballdev.com/arnie0',
  'http://www.smokeballdev.com/arnie1',
  'http://www.smokeballdev.com/arnie2',
  'http://www.smokeballdev.com/arnie3',
];

getArnieQuotes(urls);

module.exports = {
  getArnieQuotes,
};
