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
      console.log(`[URL]: ${url}`)

      const httpGetResult = await httpGet(url)
        .then(value => {
          console.log(`success value: ${JSON.stringify(value)}`)
          return value;
        })
        .catch(err => {
          console.error(`error: ${JSON.stringify(err)}`)
          return err
        });

      // console.log(`result: ${JSON.stringify(httpGetResult)}`)

    }
  }
  return results;
};

module.exports = {
  getArnieQuotes,
};
