const BaseView = require('./BaseView');

class HtmlView extends BaseView {
  
  contentType = 'text/html';
    
  before() {
    this.response

    controller.execute();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end();
  }
  
  render() {
    
  }

}

module.exports = HtmlView;
