var assert = chai.assert;

describe('newDOMElement(tag, className, id)', function() {
  describe('动态生存DOM元素', function() {
    it('测试生成的DOM元素标签名是否匹配', function() {
      assert.equal('input', newDOMElement('input').tagName.toLowerCase());

      assert.equal('input', newDOMElement('input','style').tagName.toLowerCase());

      assert.equal('input', newDOMElement('input','style', 'inputid').tagName.toLowerCase());
    });
    it('测试生成的DOM元素样式名是否匹配', function() {
      assert.equal('style', newDOMElement('input','style').className.toLowerCase());

      assert.equal('style', newDOMElement('input','style', 'inputid').className.toLowerCase());
    });
    it('测试生成的DOM元素ID是否匹配', function() {
      assert.equal('inputid', newDOMElement('input','style', 'inputid').id.toLowerCase());
    });
  });
});


