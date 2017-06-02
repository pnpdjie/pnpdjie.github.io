var assert = chai.assert;

describe('js/script.js', function() {

    describe('newDOMElement(tag, className, id)', function() {
        var el1, el2, el3;

        before(function() {
            el1 = newDOMElement('input');
            el2 = newDOMElement('input', 'style');
            el3 = newDOMElement('input', 'style', 'inputid');
        });

        it('测试生成的DOM元素标签名是否匹配', function() {
            assert.equal('input', el1.tagName.toLowerCase());

            assert.equal('input', el2.tagName.toLowerCase());

            assert.equal('input', el3.tagName.toLowerCase());
        });
        it('测试生成的DOM元素样式名是否匹配', function() {
            assert.equal('style', el2.className.toLowerCase());

            assert.equal('style', el3.className.toLowerCase());
        });
        it('测试生成的DOM元素ID是否匹配', function() {
            assert.equal('inputid', el3.id.toLowerCase());
        });
    });

    describe('classOnCondition(element, className, condition)', function() {
        var el1;

        before(function() {
            el1 = newDOMElement('input');
        });

        it('测试添加样式', function() {
            classOnCondition(el1, 'style', true);
            assert.equal('style', el1.className.toLowerCase());
        });
        it('测试取消样式', function() {
            classOnCondition(el1, 'style', false);
            assert.notEqual('style', el1.className.toLowerCase());
        });
    });

    describe('kub.toggleToc()', function() {
        var html = $('html');

        before(function() {
            html.removeClass('open-toc');
        });

        it('测试添加样式', function() {
            kub.toggleToc();
            assert.equal('open-toc', html.attr('class').toLowerCase());
        });
        it('测试取消样式', function() {
            kub.toggleToc();
            assert.notEqual('open-toc', html.attr('class').toLowerCase());
        });
    });
});
