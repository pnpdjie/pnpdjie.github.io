(function e(t, n, r) {
    'use strict';

    /* execute all modules */
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" === typeof require && require;
                if (!u && a) {
                    return a(o, !0);
                }
                if (i) {
                    return i(o, !0);
                }
                throw new Error("Cannot find module '" + o + "'");
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    for (var i = "function" === typeof require && require, o = 0; o < r.length; o++) {
        s(r[o]);
    }
    return s;
}({
    1: [function(require, module) { /* load json from url */
        'use strict';

        module.exports = function() {
            /* check response is successful */
            function receivedResponse(xhr) {
                return 200 === xhr.status && 4 === xhr.readyState;
            }

            /* handle response */
            function handleResponse(xhr, callback) {
                xhr.onreadystatechange = function() {
                    if (receivedResponse(xhr)) {
                        try {
                            callback(null, JSON.parse(xhr.responseText));
                        } catch (err) {
                            callback(err, null);
                        }
                    }
                };
            }
            var self = this;
            /* execute request */
            self.load = function(location, callback) {
                var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                xhr.open("GET", location, !0);
                handleResponse(xhr, callback);
                xhr.send();
            };
        };
    }, {}],
    2: [function(require, module) {
        'use strict';

        /* fuzzy search */
        function FuzzySearchStrategy() {
            function createFuzzyRegExpFromString(string) {
                return new RegExp(string.split("").join(".*?"), "gi");
            }
            var self = this;
            self.matches = function(string, crit) {
                return "string" !== typeof string ? !1 : (string = string.trim(), !!string.match(createFuzzyRegExpFromString(crit)));
            };
        }
        module.exports = new FuzzySearchStrategy();
    }, {}],
    3: [function(require, module) {
        'use strict';

        /* literal search */
        function LiteralSearchStrategy() {
            function doMatch(string, crit) {
                return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0;
            }
            var self = this;
            self.matches = function(string, crit) {
                return "string" !== typeof string ? !1 : (string = string.trim(), doMatch(string, crit));
            };
        }
        module.exports = new LiteralSearchStrategy();
    }, {}],
    4: [function(require, module) { /* execute search */
        'use strict';
        module.exports = function() {
            var self = this,
                matches = [],
                fuzzy = !1,
                limit = 10,
                isLimit = true,
                fuzzySearchStrategy = require("./SearchStrategies/fuzzy"),
                literalSearchStrategy = require("./SearchStrategies/literal");

            /* push matched data to array */
            function findMatchesInObject(obj, crit, strategy) {
                if (strategy.matches(obj['all'], crit)) {
                    matches.push(obj);
                }
            }

            /* loop find matches in data */
            function findMatches(store, crit, strategy) {
                for (var data = store.get(), i = 0; i < data.length && (isLimit ? (matches.length < limit) : true); i++) {
                    findMatchesInObject(data[i], crit, strategy);
                }
                return matches;
            }

            /* get search strategy */
            function getSearchStrategy() {
                return fuzzy ? fuzzySearchStrategy : literalSearchStrategy;
            }

            self.setFuzzy = function(_fuzzy) {
                fuzzy = !!_fuzzy;
            };
            self.setLimit = function(_limit, _isLimit) {
                isLimit = _isLimit;
                if (isLimit) {
                    limit = parseInt(_limit, 10) || limit;
                }
            };
            self.search = function(data, crit) {
                crit = crit.trim();
                return crit ? (matches.length = 0, findMatches(data, crit, getSearchStrategy())) : [];
            };
        };
    }, { "./SearchStrategies/fuzzy": 2, "./SearchStrategies/literal": 3 }],
    5: [function(require, module) {
        'use strict';
        module.exports = function(_store) {
            var self = this,
                store = [];

            /* check is object */
            function isObject(obj) {
                return !!obj && "[object Object]" === Object.prototype.toString.call(obj);
            }

            /* check is array */
            function isArray(obj) {
                return !!obj && "[object Array]" === Object.prototype.toString.call(obj);
            }

            /* store object*/
            function addObject(data) {
                return store.push(data), data;
            }

            /* store array */
            function addArray(data) {
                for (var added = [], i = 0; i < data.length; i++) {
                    if (isObject(data[i])) {
                        added.push(addObject(data[i]));
                    }
                }
                return added;
            }
            if (isArray(_store)) { addArray(_store); }
            self.clear = function() {
                return store.length = 0, store;
            };
            self.get = function() {
                return store;
            };
            self.put = function(data) {
                return isObject(data) ? addObject(data) : (isArray(data) ? addArray(data) : void 0);
            };
        };
    }, {}],
    6: [function(require, module) {
        'use strict';
        module.exports = function() {
            var self = this,
                templatePattern = /\{(.*?)\}/g;
            self.setTemplatePattern = function(newTemplatePattern) { templatePattern = newTemplatePattern; };

            /* replace placeholder to matched data */
            self.render = function(t, data, condition) {
                return t.replace(templatePattern, function(match, prop) {
                    if (data[prop]) {
                        var res = data[prop];
                        var cutedContent = '';
                        if (prop === 'title') {
                            var reg = new RegExp(condition, "gi");
                            res = res.replace(reg, function(match) {
                                return '<strong>' + match + '</strong>';
                            });
                            return res;
                        } else if (prop === 'content') {
                            var regContent = new RegExp(condition, "gi");

                            res = res.replace(regContent, function(match, prop) {
                                var beforeFrom = prop > 20 ? prop - 20 : 0;
                                var afterTo = res.length - (prop + match.length) > 20 ? prop + match.length + 20 : res.length;
                                cutedContent += '...' + res.substring(beforeFrom, prop) + '<strong>' + match + '</strong>' + res.substring(prop + match.length, afterTo) + '...';
                                return '<strong>' + match + '</strong>';
                            });
                            return cutedContent;
                        }
                        return res;
                    } else {
                        return match;
                    }
                });
            };
        };
    }, {}],
    7: [function(require) {
        "use strict";
        (function(window) {

            function SimpleJekyllSearch() {
                var self = this;
                var Searcher = require("./Searcher"),
                    Templater = require("./Templater"),
                    Store = require("./Store"),
                    JSONLoader = require("./JSONLoader"),
                    searcher = new Searcher(),
                    templater = new Templater(),
                    store = new Store(),
                    jsonLoader = new JSONLoader();
                var condition = '',
                    requiredOptions = ["searchInput", "resultsContainer", "dataSource"],
                    opt = { searchInput: null, resultsContainer: null, dataSource: [], searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>', noResultsText: "No results found", limit: 10, fuzzy: !1, isLimit: !1, searchButton: null, afterInit: null, afterRender: null };

                /* clear search results in container */
                function emptyResultsContainer() {
                    opt.resultsContainer.innerHTML = "";
                }

                /* append search result to container */
                function appendToResultsContainer(text) {
                    opt.resultsContainer.innerHTML += text;
                }

                /* put search results to container */
                function render(results) {
                    if (emptyResultsContainer(), 0 === results.length) {
                        appendToResultsContainer(opt.noResultsText);
                    } else {
                        for (var i = 0; i < results.length; i++) {
                            appendToResultsContainer(templater.render(opt.searchResultTemplate, results[i], condition));
                        }
                    }
                    if (opt.afterRender) {
                        opt.afterRender(opt.resultsContainer, condition);
                    }
                }

                /* add event listener to search input and search button*/
                function registerInput() {
                    if (!opt.searchButton) {
                        opt.searchInput.onkeyup = function(e) {
                            condition = parseCondition(e.target.value);
                            return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        };
                    } else {
                        opt.searchInput.onkeydown = function(e) {
                            switch (e.which) {
                                case 13:
                                    {
                                        condition = parseCondition(e.target.value);
                                        return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                                    }
                            }
                        };

                        opt.searchButton.onclick = function() {
                            condition = parseCondition(opt.searchInput.value);
                            return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        };

                        if (opt.afterInit) {
                            opt.afterInit();
                        }
                    }
                }

                /* init store with json */
                var initWithJSON = function() {
                    validateJSON(opt.dataSource);
                    store.put(opt.dataSource);
                    registerInput();
                };

                /* throw error */
                function throwError(message) {
                    throw new Error("SimpleJekyllSearch --- " + message);
                }

                /* init store with url */
                var initWithURL = function(url) {
                    jsonLoader.load(url, function(err, json) {
                        if (err) {
                            throwError("failed to get JSON (" + url + ")");
                        } else {
                            validateJSON(json);
                            store.put(json);
                            registerInput();
                        }
                    });
                };

                /* validate init options */
                function validateOptions(_opt) {
                    for (var i = 0; i < requiredOptions.length; i++) {
                        var req = requiredOptions[i];
                        if (!_opt[req]) {
                            throwError("You must specify a " + req);
                        }
                    }
                }

                /* read init options */
                function assignOptions(_opt) {
                    for (var option in opt) { opt[option] = _opt[option] || opt[option]; }

                    searcher.setLimit(opt['limit'], opt['isLimit']);

                    if (!opt.searchButton) {
                        if (!opt.afterRender) {
                            throwError("You must specify a afterRender when not contain a searchButton");
                        }
                        if (!opt.isLimit) {
                            throwError("You must specify true for isLimit when not contain a searchButton");
                        }
                    }

                    if (opt.searchButton) {
                        if (!opt.afterInit) {
                            throwError("You must specify a afterInit when contain a searchButton");
                        }
                        if (opt.isLimit) {
                            throwError("You must specify false for isLimit when contain a searchButton");
                        }
                    }
                }

                /* check opt.json is json */
                var isJSON = function(json) {
                    try {
                        if (json instanceof Object) {
                            var data = JSON.parse(JSON.stringify(json));
                            return data ? true : false;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return !1;
                    }
                };

                /* validate json data */
                var validateJSON = function(json) {
                    if (json.length === 0 || !json[0].hasOwnProperty("title") || !json[0].hasOwnProperty("content") || !json[0].hasOwnProperty("all") || !json[0].hasOwnProperty("url")) {
                        throwError("JSON data must have data and fields(title,url,content,all).");
                        return false;
                    }
                    return true;
                };

                /* parse search term */
                var parseCondition = function(key) {
                    key = key.trim();
                    key = key.replace('\\', '\\\\');
                    return key;
                };

                /* init SimpleJekyllSearch */
                self.init = function(_opt) {
                    validateOptions(_opt);
                    assignOptions(_opt);
                    if (isJSON(opt.dataSource)) {
                        initWithJSON(opt.dataSource);
                    } else {
                        initWithURL(opt.dataSource);
                    }
                };
                /* dispose SimpleJekyllSearch */
                self.dispose = function() {
                    condition = '';
                    opt = { searchInput: null, resultsContainer: null, dataSource: [], searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>', noResultsText: "No results found", limit: 10, fuzzy: !1, isLimit: !1, searchButton: null, afterInit: null, afterRender: null };
                    store.clear();
                };
                self.opt = opt;
                self.isJSON = isJSON;
                self.validateJSON = validateJSON;
                self.store = store;
                self.searcher = searcher;
            }
            window.SimpleJekyllSearch = new SimpleJekyllSearch();
            window.ContentJekyllSearch = new SimpleJekyllSearch();
        }(window, document));
    }, { "./JSONLoader": 1, "./Searcher": 4, "./Store": 5, "./Templater": 6 }]
}, {}, [7]));
