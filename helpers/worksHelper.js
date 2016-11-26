const bluebird = require('bluebird');
const dateFormat = require('dateformat');
const moniker = require('moniker');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);

module.exports = class WorksHelper {
  constructor() {
    this.redisClient = redis.createClient();
  }

  getLatestVersion() {
    return this.redisClient.getAsync('works:versions:latest').then((version) => { // eslint-disable-line arrow-body-style
      return this.redisClient.getAsync(`works:version:${version}`);
    });
  }

  createNewVersion(dump) {
    const versionName = WorksHelper.createNewVersionName();
    return this.redisClient.setAsync(`works:version:${versionName}`, dump).then(() => { // eslint-disable-line arrow-body-style
      return this.redisClient.setAsync('works:versions:latest', versionName);
    }).then(() => { // eslint-disable-line arrow-body-style
      return this.redisClient.saddAsync('works:versions:all', versionName);
    });
  }

  static createNewVersionName() {
    const date = dateFormat(new Date(), 'UTC:yyyymmdd\'T\'HHMMssl');
    const randomName = moniker.choose();
    return `${date}_${randomName}`;
  }
};
