const dotenvPlugin = require('cypress-dotenv');
module.exports = (on, config) => {
  config = dotenvPlugin(config)
  config.baseUrl = process.env.BASE_URL;
  return config
}