var assert = chai.assert;

var queryString = 'jekyll';
var obj;

describe('js/jekyll-search-copy.js', function() {
    function triggerSearch() {
        document.getElementById("search-content-button").click();
    }
    before(function() {
        document.getElementById('query-string').value = queryString;
    });

    describe('7:init-validateOptions(_opt)', function() {

        it('测试-包含必要参数["searchInput", "resultsContainer", "dataSource"]', function() {
            var _opt = {
                searchInput: document.getElementById('query-string'),
                searchButton: document.getElementById('search-content-button'),
                resultsContainer: document.getElementById('results-content-container'),
                dataSource: 'data/search.json',
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                afterInit: triggerSearch
            };
            ContentJekyllSearch.init(_opt);
        });
        it('测试-不含必要参数"searchInput"', function() {
            var _opt = {
                searchButton: document.getElementById('search-content-button'),
                resultsContainer: document.getElementById('results-content-container'),
                dataSource: 'data/search.json',
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                afterInit: triggerSearch
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify a searchInput'.toLowerCase(), e.message.toLowerCase());
            }
        });
        it('测试-不含必要参数"resultsContainer"', function() {
            var _opt = {
                searchInput: document.getElementById('query-string'),
                searchButton: document.getElementById('search-content-button'),
                dataSource: 'data/search.json',
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                afterInit: triggerSearch
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify a resultsContainer'.toLowerCase(), e.message.toLowerCase());
            }
        });
        it('测试-不含必要参数"dataSource"', function() {
            var _opt = {
                searchInput: document.getElementById('query-string'),
                searchButton: document.getElementById('search-content-button'),
                resultsContainer: document.getElementById('results-content-container'),
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                afterInit: triggerSearch
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify a dataSource'.toLowerCase(), e.message.toLowerCase());
            }
        });
    });

    describe('7:init-assignOptions(_opt)', function() {
        var _opt = {
            searchInput: document.getElementById('query-string'),
            searchButton: document.getElementById('search-content-button'),
            resultsContainer: document.getElementById('results-content-container'),
            dataSource: 'data/search.json',
            searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
            noResultsText: 'No results found.',
            fuzzy: true,
            afterInit: triggerSearch
        };

        it('测试-参数写入成功', function() {
            ContentJekyllSearch.init(_opt);
            assert.equal(_opt["searchInput"], ContentJekyllSearch.opt["searchInput"]);
            assert.equal(_opt["searchButton"], ContentJekyllSearch.opt["searchButton"]);
            assert.equal(_opt["resultsContainer"], ContentJekyllSearch.opt["resultsContainer"]);
            assert.equal(_opt["dataSource"], ContentJekyllSearch.opt["dataSource"]);
            assert.equal(_opt["searchResultTemplate"], ContentJekyllSearch.opt["searchResultTemplate"]);
            assert.equal(_opt["noResultsText"], ContentJekyllSearch.opt["noResultsText"]);
            assert.equal(_opt["fuzzy"], ContentJekyllSearch.opt["fuzzy"]);
            assert.equal(_opt["afterInit"], ContentJekyllSearch.opt["afterInit"]);
        });
    });

    describe('7:init-isJSON(json)', function() {
        var _opt = {
            searchInput: document.getElementById('query-string'),
            searchButton: document.getElementById('search-content-button'),
            resultsContainer: document.getElementById('results-content-container'),
            dataSource: 'data/search.json',
            searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
            noResultsText: 'No results found.',
            fuzzy: true,
            afterInit: triggerSearch
        };

        it('测试-判断json', function() {
            assert.equal(false, ContentJekyllSearch.isJSON(_opt.dataSource));

            var data = [{
                "title": "About",
                "url": "/about.html",
                "content": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at jekyllrb.comYou can find the source code for the Jekyll new theme at:    jekyll /minimaYou can find the source code for Jekyll at    jekyll /jekyll"
            }, {
                "title": "Index",
                "url": "/index.html",
                "content": "Once we gain ground on the above items, we can work together formalize our contribution guidelines and governance. For further info & ideas, please see our projects."
            }];

            assert.equal(true, ContentJekyllSearch.isJSON(data));

        });
    });

    describe('7:init-validateJSON(json)', function() {

        it('测试-验证JSON格式，必须包含title,url,content,all', function() {
            var data = [{
                "title": "About",
                "url": "/about.html",
                "content": "",
                "all": ""
            }];
            assert.equal(true, ContentJekyllSearch.validateJSON(data));

            var res;
            var msg = 'SimpleJekyllSearch --- JSON data must have data and fields(title,url,content,all).';
            try {
                data = [];
                res = ContentJekyllSearch.validateJSON(data);
            } catch(e) {
                assert.equal(undefined, res);
                assert.equal(msg, e.message);
            }

            try {
                data = [{
                    "url": "/about.html",
                    "content": "",
                    "all": ""
                }];
                res = ContentJekyllSearch.validateJSON(data);
            } catch(e) {
                assert.equal(undefined, res);
                assert.equal(msg, e.message);
            }

            try {
                data = [{
                    "title": "About",
                    "content": "",
                    "all": ""
                }];
                res = ContentJekyllSearch.validateJSON(data);
            } catch(e) {
                assert.equal(undefined, res);
                assert.equal(msg, e.message);
            }

            try {
                data = [{
                    "title": "About",
                    "url": "/about.html",
                    "all": ""
                }];
                res = ContentJekyllSearch.validateJSON(data);
            } catch(e) {
                assert.equal(undefined, res);
                assert.equal(msg, e.message);
            }

            try {
                data = [{
                    "title": "About",
                    "url": "/about.html",
                    "content": ""
                }];
                res = ContentJekyllSearch.validateJSON(data);
            } catch(e) {
                assert.equal(undefined, res);
                assert.equal(msg, e.message);
            }
        });
    });
});
