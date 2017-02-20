const BaseController = require('./BaseController');
const HtmlView = require('../view/HtmlView');

class BaseHtmlController extends BaseController {

  /**
   * @type {HtmlView}
   */
  view = new HtmlView();

}

module.exports.default = BaseHtmlController;
