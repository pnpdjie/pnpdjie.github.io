(function e(t, n, r) {
    'use strict';

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
    1: [function(require, module) {
        'use strict';
        module.exports = function() {
            function receivedResponse(xhr) {
                return 200 === xhr.status && 4 === xhr.readyState;
            }

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
    4: [function(require, module) {
        'use strict';
        module.exports = function() {
            var self = this,
                matches = [],
                fuzzy = !1,
                limit = 10,
                isLimit = true,
                fuzzySearchStrategy = require("./SearchStrategies/fuzzy"),
                literalSearchStrategy = require("./SearchStrategies/literal");

            function findMatchesInObject(obj, crit, strategy) {
                //for (var key in obj)
                if (strategy.matches(obj['all'], crit)) {
                    matches.push(obj);
                    //break
                }
            }

            function findMatches(store, crit, strategy) {
                for (var data = store.get(), i = 0; i < data.length && (isLimit ? (matches.length < limit) : true); i++) {
                    findMatchesInObject(data[i], crit, strategy);
                }
                return matches;
            }

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

            function isObject(obj) {
                return !!obj && "[object Object]" === Object.prototype.toString.call(obj);
            }

            function isArray(obj) {
                return !!obj && "[object Array]" === Object.prototype.toString.call(obj);
            }

            function addObject(data) {
                return store.push(data), data;
            }

            function addArray(data) {
                for (var added = [], i = 0; i < data.length; i++) {
                    //isObject(data[i]) && added.push(addObject(data[i]));
                    if (isObject(data[i])) {
                        added.push(addObject(data[i]));
                    }
                }
                return added;
            }
            //isArray(_store) && addArray(_store);
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
            self.render = function(t, data, condition) {
                // var res = t.replace(templatePattern, function(match, prop) {
                //     return data[prop] || match
                // });
                // return res.replace(condition), function(match, prop) {
                //     return data[prop] || match
                // });
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
                                var beforeFrom = prop > 20?prop - 20:0;
                                var afterTo =  res.length - (prop + match.length)> 20?prop + match.length+20:res.length;
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

                function emptyResultsContainer() {
                    opt.resultsContainer.innerHTML = "";
                }

                function appendToResultsContainer(text) {
                    opt.resultsContainer.innerHTML += text;
                }

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

                function registerInput() {
                    if (!opt.searchButton) {
                        // opt.searchInput.addEventListener("keyup", function(e) {
                        //     condition = parseCondition(e.target.value);
                        //     return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        // });
                        opt.searchInput.onkeyup = function(e) {
                            condition = parseCondition(e.target.value);
                            return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        };
                    } else {
                        // opt.searchInput.addEventListener("keydown", function(e) {
                        //     switch (e.which) {
                        //         case 13:
                        //             {
                        //                 condition = parseCondition(e.target.value);
                        //                 return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        //             }
                        //     }
                        // });
                        opt.searchInput.onkeydown = function(e) {
                            switch (e.which) {
                                case 13:
                                    {
                                        condition = parseCondition(e.target.value);
                                        return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                                    }
                            }
                        };

                        // opt.searchButton.addEventListener("click", function() {
                        //     condition = parseCondition(opt.searchInput.value);
                        //     return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        // });
                        opt.searchButton.onclick = function() {
                            condition = parseCondition(opt.searchInput.value);
                            return 0 === condition.length ? void emptyResultsContainer() : void render(searcher.search(store, condition));
                        };

                        if (opt.afterInit) {
                            opt.afterInit();
                        }
                    }
                }

                var initWithJSON = function() {
                    validateJSON(opt.dataSource);
                    store.put(opt.dataSource);
                    registerInput();
                };

                function throwError(message) {
                    throw new Error("SimpleJekyllSearch --- " + message);
                }

                var initWithURL = function(url) {
                    jsonLoader.load(url, function(err, json) {
                        //err ? throwError("failed to get JSON (" + url + ")") : (store.put(json), registerInput());
                        if (err) {
                            throwError("failed to get JSON (" + url + ")");
                        } else {
                            validateJSON(json);
                            store.put(json);
                            registerInput();
                        }
                    });
                };

                function validateOptions(_opt) {
                    for (var i = 0; i < requiredOptions.length; i++) {
                        var req = requiredOptions[i];
                        //_opt[req] || throwError("You must specify a " + req);
                        if (!_opt[req]) {
                            throwError("You must specify a " + req);
                        }
                    }
                }

                function assignOptions(_opt) {
                    for (var option in opt) { opt[option] = _opt[option] || opt[option]; }

                    searcher.setLimit(opt['limit'], opt['isLimit']);
                }

                var isJSON = function(json) {
                    try {
                        if (json instanceof Object) {
                            var data = JSON.parse(JSON.stringify(json));
                            return data ? true : false;
                        } else {
                            return false;
                        }
                        // return json instanceof Object && JSON.parse(JSON.stringify(json));
                    } catch (e) {
                        return !1;
                    }
                };
                var validateJSON = function(json) {
                    if (json.length === 0 || !json[0].hasOwnProperty("title") || !json[0].hasOwnProperty("content") || !json[0].hasOwnProperty("all") || !json[0].hasOwnProperty("url")) {
                        throwError("JSON data must have data and fields(title,url,content,all).");
                        return false;
                    }
                    return true;
                };
                var parseCondition = function(key) {
                    key = key.trim();
                    key = key.replace('\\','\\\\');
                    return key;
                };

                self.init = function(_opt) {
                    validateOptions(_opt);
                    assignOptions(_opt);
                    //isJSON(opt.dataSource) ? initWithJSON(opt.dataSource) : initWithURL(opt.dataSource);
                    if (isJSON(opt.dataSource)) {
                        initWithJSON(opt.dataSource);
                    } else {
                        initWithURL(opt.dataSource);
                    }
                };
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
