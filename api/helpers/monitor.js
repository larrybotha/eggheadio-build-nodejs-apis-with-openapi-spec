const esClient = require('./es');

// elastic search can be evaluated using the following to see which indices
// are available:
// curl localhost:9200/_cat/indices
// We want the monitoring index, and we can inspect documents that are in that
// index:
// curl localhost:9200/monitoring/_search&q=*
const persistDuration = (duration, tag) => {
  // create a new document in elastic search
  esClient.create({
    // in the monitoring index (like a mongo collection)
    index: 'monitoring',
    // with a todo-api type
    type: 'todo-api',
    id: new Date().getTime(),
    // and write the duration and tag to that document
    body: {
      duration,
      tag,
    },
  });
};

// create a monitor object
const monitor = (start, tag) => {
  // if it hasn started
  if (start) {
    // get the time delta from the last hrtime object
    const endTime = process.hrtime(start);
    // determine the duration in ms
    const duration = parseInt(endTime[0] * 1000 + endTime[1] / 1000000);

    // log it out
    console.log(`Duration for ${tag}: ${duration} msec`);
    // and then save it to elsatic search
    persistDuration(duration, tag);
  } else {
    return process.hrtime();
  }
};

module.exports = monitor;
