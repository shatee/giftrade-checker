
class BaseController {

  request;
  response;

  /**
   * @type {BaseView}
   */
  view;
  
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  execute() {
    this.main();
  }

  /**
   * @abstract
   */
  main() {
  }
}

module.exports.default = BaseController;
