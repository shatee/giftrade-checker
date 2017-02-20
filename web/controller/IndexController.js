const BaseController = require('../controller/BaseController');
const HtmlView = require('../view/HtmlView');

class IndexController extends BaseController {

  view = new HtmlView();

  main() {
    console.log('index');
  }

}

module.exports.default = IndexController;
