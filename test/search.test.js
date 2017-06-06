var assert = chai.assert;

var queryString = 'jekyll';
var obj;

describe('js/jekyll-search.js', function() {
    function triggerSearch() {
        document.getElementById("search-content-button").click();
    }
        function appendContentSearchLink(container, condition) {
            container.innerHTML += '<li><a href="/dosearch.html?queryString=' + condition + '" class="search-for"><span title="搜索‘' + condition + '’"><em>搜索‘' + condition + '’</em></span></a></li>';
        }
    before(function() {
        document.getElementById('query-string').value = queryString;
    });

    describe('ContentJekyllSearch:init-validateOptions(_opt)', function() {

        afterEach(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.dispose();
                done();
            }, 3000);
        });

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
                fuzzy: true
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
                fuzzy: true
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
                fuzzy: true
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify a dataSource'.toLowerCase(), e.message.toLowerCase());
            }
        });
        it('测试-包含参数"searchButton"时必须包含"afterInit"', function() {
            var _opt = {
                dataSource: 'data/search.json',
                searchInput: document.getElementById('query-string'),
                searchButton: document.getElementById('search-content-button'),
                resultsContainer: document.getElementById('results-content-container'),
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify a afterInit when contain a searchButton'.toLowerCase(), e.message.toLowerCase());
            }
        });
        it('测试-不包含参数"searchButton"时必须包含"afterRender"', function() {
            var _opt = {
                dataSource: 'data/search.json',
                searchInput: document.getElementById('query-string'),
                resultsContainer: document.getElementById('results-content-container'),
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify a afterRender when not contain a searchButton'.toLowerCase(), e.message.toLowerCase());
            }
        });
        it('测试-不包含参数"searchButton"时"isLimit"必须为true', function() {
            var _opt = {
                dataSource: 'data/search.json',
                searchInput: document.getElementById('query-string'),
                resultsContainer: document.getElementById('results-content-container'),
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                isLimit: false,
            afterRender: appendContentSearchLink
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify true for isLimit when not contain a searchButton'.toLowerCase(), e.message.toLowerCase());
            }
        });
        it('测试-包含参数"searchButton"时"isLimit"必须为false', function() {
            var _opt = {
                dataSource: 'data/search.json',
                searchInput: document.getElementById('query-string'),
                searchButton: document.getElementById('search-content-button'),
                resultsContainer: document.getElementById('results-content-container'),
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                isLimit: true,
                afterInit: triggerSearch
            };
            try {
                ContentJekyllSearch.init(_opt);
            } catch (e) {
                assert.equal('SimpleJekyllSearch --- You must specify false for isLimit when contain a searchButton'.toLowerCase(), e.message.toLowerCase());
            }
        });
    });

    describe('ContentJekyllSearch:init-assignOptions(_opt)', function() {
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

        after(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.dispose();
                done();
            }, 3000);
        });

        it('测试-参数写入成功', function() {
            ContentJekyllSearch.init(_opt);
            assert.equal(_opt["searchInput"], ContentJekyllSearch.opt["searchInput"]);
            assert.equal(_opt["searchButton"], ContentJekyllSearch.opt["searchButton"]);
            assert.equal(_opt["resultsContainer"], ContentJekyllSearch.opt["resultsContainer"]);
            assert.equal(_opt["dataSource"], ContentJekyllSearch.opt["dataSource"]);
            assert.equal(_opt["searchResultTemplate"], ContentJekyllSearch.opt["searchResultTemplate"]);
            assert.equal(_opt["noResultsText"], ContentJekyllSearch.opt["noResultsText"]);
            assert.equal(_opt["fuzzy"], ContentJekyllSearch.opt["fuzzy"]);
        });
    });

    describe('ContentJekyllSearch:init-isJSON(json)', function() {
        var _opt = {
            searchInput: document.getElementById('query-string'),
            searchButton: document.getElementById('search-content-button'),
            resultsContainer: document.getElementById('results-content-container'),
            dataSource: 'data/search.json',
            searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
            noResultsText: 'No results found.',
            fuzzy: true
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

    describe('ContentJekyllSearch:init-validateJSON(json)', function() {

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
            } catch (e) {
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
            } catch (e) {
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
            } catch (e) {
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
            } catch (e) {
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
            } catch (e) {
                assert.equal(undefined, res);
                assert.equal(msg, e.message);
            }
        });
    });

    describe('ContentJekyllSearch:init-读取JSON数据', function() {
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

        after(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.dispose();
                done();
            }, 3000);
        });

        it('测试-空数据，非JSON数据，格式错误JSON数据', function() {
            _opt.dataSource = null;
            var res = false;
            try {
                ContentJekyllSearch.init(_opt);
                res = true;
            } catch (e) {
                res = false;
            }
            assert.equal(false, res);

            _opt.dataSource = "";
            try {
                ContentJekyllSearch.init(_opt);
                res = true;
            } catch (e) {
                res = false;
            }
            assert.equal(false, res);

            _opt.dataSource = [{ "a": "b" }];
            try {
                ContentJekyllSearch.init(_opt);
                res = true;
            } catch (e) {
                res = false;
            }
            assert.equal(false, res);

            var data = [{
                "title": "About",
                "url": "/about.html",
                "content": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at jekyllrb.comYou can find the source code for the Jekyll new theme at:    jekyll /minimaYou can find the source code for Jekyll at    jekyll /jekyll"
            }, ];
            _opt.dataSource = data;
            try {
                ContentJekyllSearch.init(_opt);
                res = true;
            } catch (e) {
                res = false;
            }
            assert.equal(false, res);

        });

        it('测试-格式正确JSON数据且包含title,url,content,all', function() {
            var data = [{
                "title": "About",
                "url": "/about.html",
                "all": "",
                "content": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at jekyllrb.comYou can find the source code for the Jekyll new theme at:    jekyll /minimaYou can find the source code for Jekyll at    jekyll /jekyll"
            }];
            _opt.dataSource = data;
            _opt.afterInit = triggerSearch;
            try {
                ContentJekyllSearch.init(_opt);
                res = true;
            } catch (e) {
                res = false;
            }
            assert.equal(true, res);
            assert.equal(1, ContentJekyllSearch.store.get().length);

        });
    });

    describe('ContentJekyllSearch:init-读取JSON数据', function() {
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

        before(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                try {
                    ContentJekyllSearch.init(_opt);
                    res = true;
                } catch (e) {
                    res = false;
                }
                assert.equal(true, res);

                done();
            }, 3000);
        });

        after(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.dispose();
                done();
            }, 3000);
        });

        it('测试-URL读取JSON数据', function(done) {
            this.timeout(15000);

            setTimeout(function() {
                assert.equal(2, ContentJekyllSearch.store.get().length);
                done();
            }, 3000);
        });
    });

    describe('ContentJekyllSearch:dispose', function() {
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

        before(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.init(_opt);
                done();
            }, 3000);
        });
        after(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.dispose();
                done();
            }, 3000);
        });

        it('测试-数据是否清空', function(done) {

            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.dispose();
                assert.equal(0, ContentJekyllSearch.store.get().length);
                done();
            }, 3000);
        });
    });

    describe('ContentJekyllSearch:搜索', function() {
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
        before(function(done) {
            this.timeout(15000);
            setTimeout(function() {
                ContentJekyllSearch.init(_opt);
                done();
            }, 3000);
        });
        // after(function(done) {
        //     this.timeout(15000);
        //     setTimeout(function() {
        //         ContentJekyllSearch.dispose();
        //         done();
        //     }, 3000);
        // });

        it('测试-正常搜索', function(done) {
            this.timeout(15000);

            setTimeout(function() {
                var res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, 'Jekyll');
                assert.equal(1, res.length);

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, 'the');
                assert.equal(2, res.length);

                done();
            }, 3000);
        });

        it('测试-搜索空格', function(done) {
            this.timeout(15000);

            setTimeout(function() {
                var res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, ' ');
                assert.equal(0, res.length);

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '  ');
                assert.equal(0, res.length);

                done();
            }, 3000);
        });

        it('测试-搜索特殊字符\
          \' 单引号\
\"  双引号\
\&  和号\
\\  反斜杠\
\n  换行符\
\r  回车符\
\t  制表符\
\b  退格符\
\f  换页符', function(done) {
            this.timeout(15000);

            setTimeout(function() {
                var res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\'');
                assert.equal(1, res.length, '\' 单引号');

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\"');
                assert.equal(1, res.length, '\"  双引号');

                var res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\&');
                assert.equal(1, res.length, '\&  和号');

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\\');
                assert.equal(1, res.length, '\\  反斜杠');

                var res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\n');
                assert.equal(0, res.length, '\n  换行符');

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\r');
                assert.equal(0, res.length, '\r  回车符');

                var res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\t');
                assert.equal(0, res.length, '\t  制表符');

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\b');
                assert.equal(1, res.length, '\b  退格符');

                res = ContentJekyllSearch.searcher.search(ContentJekyllSearch.store, '\f');
                assert.equal(0, res.length, '\f  换页符');

                done();
            }, 3000);
        });
    });
});
