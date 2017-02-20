const BaseController = require('../controller/BaseController');

class ErrorController extends BaseController {

  set error(error) {
    this._error = error;
  }
  
  main() {
    console.log('error');
  }

}

module.exports.default = ErrorController;
