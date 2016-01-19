'use strict';

var _ = require('lodash');
var InstanceResource = require('../../../../../base/InstanceResource');
var ListResource = require('../../../../../base/ListResource');
var Page = require('../../../../../base/Page');
var values = require('../../../../../base/values');

var TaskQueuesStatisticsPage;
var TaskQueuesStatisticsList;
var TaskQueuesStatisticsInstance;
var TaskQueuesStatisticsContext;

/**
 * Initialize the TaskQueuesStatisticsPage
 *
 * :param Version version: Version that contains the resource
 * :param Response response: Response from the API
 * :param workspaceSid: The workspace_sid
 *
 * @returns TaskQueuesStatisticsPage
 */
function TaskQueuesStatisticsPage(version, response, workspaceSid) {
  Page.prototype.constructor.call(this, version, response);

  // Path Solution
  this._solution = {
    workspaceSid: workspaceSid
  };
}

_.extend(TaskQueuesStatisticsPage.prototype, Page.prototype);
TaskQueuesStatisticsPage.prototype.constructor = TaskQueuesStatisticsPage;

/**
 * Build an instance of TaskQueuesStatisticsInstance
 *
 * :param dict payload: Payload response from the API
 *
 * @returns TaskQueuesStatisticsInstance
 */
TaskQueuesStatisticsPage.prototype.getInstance = function getInstance(payload) {
  return new TaskQueuesStatisticsInstance(
    this._version,
    payload,
    workspaceSid=this._solution['workspaceSid']
  );
};


/**
 * Initialize the TaskQueuesStatisticsList
 *
 * :param Version version: Version that contains the resource
 * :param workspaceSid: The workspace_sid
 *
 * @returns TaskQueuesStatisticsList
 */
function TaskQueuesStatisticsList(version, workspaceSid) {
  function TaskQueuesStatisticsListInstance(sid) {
    return TaskQueuesStatisticsListInstance.get(sid);
  }

  TaskQueuesStatisticsListInstance._version = version;
  // Path Solution
  TaskQueuesStatisticsListInstance._solution = {
    workspaceSid: workspaceSid
  };
  TaskQueuesStatisticsListInstance._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/TaskQueues/Statistics' // jshint ignore:line
  )(TaskQueuesStatisticsListInstance._solution);
  /**
   * Streams TaskQueuesStatisticsInstance records from the API.
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * @param string [opts.endDate] - The end_date
   * @param string [opts.friendlyName] - The friendly_name
   * @param string [opts.minutes] - The minutes
   * @param string [opts.startDate] - The start_date
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         list() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} opts.callback - A callback function to process records
   */
  TaskQueuesStatisticsListInstance.stream = function stream(opts) {
    opts = opts || {};

    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    var page = this.page(
      opts
    );

    return this._version.stream(page, limits.limit, limits.pageLimit);
  };

  /**
   * Lists TaskQueuesStatisticsInstance records from the API as a list.
   *
   * @param string [opts.endDate] - The end_date
   * @param string [opts.friendlyName] - The friendly_name
   * @param string [opts.minutes] - The minutes
   * @param string [opts.startDate] - The start_date
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   *
   * @returns {Array} A list of records
   */
  TaskQueuesStatisticsListInstance.list = function list(opts) {
    opts = opts || {};

    var allResources = [];
    opts.callback = function(resource) {
      allResources.push(resource);
    };

    var promise = this.stream(opts);
    promise = promise.then(function() {
      return allResources;
    });

    return promise;
  };

  /**
   * Retrieve a single page of TaskQueuesStatisticsInstance records from the API.
   * Request is executed immediately
   *
   * @param string [opts.endDate] - The end_date
   * @param string [opts.friendlyName] - The friendly_name
   * @param string [opts.minutes] - The minutes
   * @param string [opts.startDate] - The start_date
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   *
   * @returns Page of TaskQueuesStatisticsInstance
   */
  TaskQueuesStatisticsListInstance.page = function page(opts) {
    opts = opts || {};

    var version = this._version;
    var solution = this._solution;

    var params = values.of({
      'EndDate': opts.endDate,
      'FriendlyName': opts.friendlyName,
      'Minutes': opts.minutes,
      'StartDate': opts.startDate,
      'PageToken': opts.page_token,
      'Page': opts.page_number,
      'PageSize': opts.page_size
    });

    var promise = version.page(
      'GET',
      this._uri,
      params
    );

    promise = promise.then(function(response) {
      return new TaskQueuesStatisticsPage(
        version,
        response,
        solution.workspaceSid
      );
    });

    return promise;
  };

  return TaskQueuesStatisticsListInstance;
}


/**
 * Initialize the TaskQueuesStatisticsContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {object} payload - The instance payload
 *
 * @returns {TaskQueuesStatisticsContext}
 */
function TaskQueuesStatisticsInstance(version, payload, workspaceSid) {
  InstanceResource.prototype.constructor.call(this, version);

  // Marshaled Properties
  this._properties = {
    accountSid: payload.account_sid, // jshint ignore:line,
    cumulative: payload.cumulative, // jshint ignore:line,
    realtime: payload.realtime, // jshint ignore:line,
    taskQueueSid: payload.task_queue_sid, // jshint ignore:line,
    workspaceSid: payload.workspace_sid, // jshint ignore:line,
  };

  // Context
  this._context = undefined;
  this._solution = {
    workspaceSid: workspaceSid,
  };
}

_.extend(TaskQueuesStatisticsInstance.prototype, InstanceResource.prototype);
TaskQueuesStatisticsInstance.prototype.constructor = TaskQueuesStatisticsInstance;

Object.defineProperty(TaskQueuesStatisticsInstance.prototype,
  'accountSid', {
  get: function() {
    return this._properties.accountSid;
  },
});

Object.defineProperty(TaskQueuesStatisticsInstance.prototype,
  'cumulative', {
  get: function() {
    return this._properties.cumulative;
  },
});

Object.defineProperty(TaskQueuesStatisticsInstance.prototype,
  'realtime', {
  get: function() {
    return this._properties.realtime;
  },
});

Object.defineProperty(TaskQueuesStatisticsInstance.prototype,
  'taskQueueSid', {
  get: function() {
    return this._properties.taskQueueSid;
  },
});

Object.defineProperty(TaskQueuesStatisticsInstance.prototype,
  'workspaceSid', {
  get: function() {
    return this._properties.workspaceSid;
  },
});

module.exports = {
  TaskQueuesStatisticsPage: TaskQueuesStatisticsPage,
  TaskQueuesStatisticsList: TaskQueuesStatisticsList,
  TaskQueuesStatisticsInstance: TaskQueuesStatisticsInstance,
  TaskQueuesStatisticsContext: TaskQueuesStatisticsContext
};