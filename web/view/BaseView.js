class BaseView {
  
  request;
  response;
  
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  /**
   * @abstract
   */
  render() {}
}

module.exports.default = BaseView;
