var assert = chai.assert;

var queryString = 'jekyll';
var obj;

describe('ContentJekyllSearch', function() {

    describe('7:init', function() {

        function triggerSearch() {
            document.getElementById("search-content-button").click();
        };
        before(function() {
            document.getElementById('query-string').value = queryString;


        });

        it('测试-参数包含必要["searchInput", "resultsContainer", "dataSource"]', function() {
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
        it('测试-参数不含["searchInput", "resultsContainer", "dataSource"]', function() {
            var _opt = {
                searchButton: document.getElementById('search-content-button'),
                searchResultTemplate: '<li><a href="{url}" title="Search configuration">{title}</a><div>{content}</div></li>',
                noResultsText: 'No results found.',
                fuzzy: true,
                afterInit: triggerSearch
            };

            assert.throws(ContentJekyllSearch.init(_opt), null, null);

        });
    });
});
