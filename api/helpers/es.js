'use strict';
const ElasticSearch = require('elasticsearch');

// create an elastic search client on port 9200
const client = new ElasticSearch.Client({
  host: 'localhost:9200',
  log: 'error',
});

module.exports = client;
