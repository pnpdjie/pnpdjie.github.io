var body;

function newDOMElement(tag, className, id) {
    "use strict";

    var el = document.createElement(tag);

    if (className) {
        el.className = className;
    }

    if (id) {
        el.id = id;
    }

    return el;
}

function classOnCondition(element, className, condition) {
    "use strict";
    if (condition) {
        $(element).addClass(className);
    } else {
        $(element).removeClass(className);
    }
}

$(function() {
    "use strict";
    if ((location.pathname.split("/")[1]) !== "") {
        $('header .trigger a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    }
});

var kub = (function() {
    "use strict";
    var HEADER_HEIGHT;
    var html, header, quickstartButton, hero, encyclopedia, footer, headlineWrapper;

    function tocWasClicked(e) {
        var target = $(e.target);
        var docsToc = $("#docsToc");
        return (target[0] === docsToc[0] || target.parents("#docsToc").length > 0);
    }

    function listenForTocClick(e) {
        if (!tocWasClicked(e)) {
            toggleToc();
        }
    }

    function toggleToc() {
        html.toggleClass('open-toc');

        setTimeout(function() {
            if (html.hasClass('open-toc')) {
                window.addEventListener('click', listenForTocClick);
            } else {
                window.removeEventListener('click', listenForTocClick);
            }
        }, 100);
    }

    function setFooterType() {
        var windowHeight = window.innerHeight;
        var bodyHeight;

        switch (html[0].id) {
            case 'docs':
                {
                    bodyHeight = hero.outerHeight() + encyclopedia.outerHeight();
                    break;
                }

            case 'home':
                // case 'caseStudies':
                bodyHeight = windowHeight;
                break;

            case 'caseStudies':
            case 'partners':
                bodyHeight = windowHeight * 2;
                break;

            default:
                {
                    bodyHeight = hero.outerHeight() + $('#mainContent').outerHeight();
                }
        }

        var footerHeight = footer.outerHeight();
        classOnCondition(body, 'fixed', windowHeight - footerHeight > bodyHeight);
    }

    function setHomeHeaderStyles() {
        var Y = window.pageYOffset;
        var quickstartBottom = quickstartButton[0].getBoundingClientRect().bottom;

        classOnCondition(html[0], 'y-enough', Y > quickstartBottom);
    }

    function resetTheView() {
        if (!html.hasClass('open-nav')) {
            HEADER_HEIGHT = header.outerHeight();
        }

        if (html.hasClass('open-toc')) {
            toggleToc();
        }

        classOnCondition(html, 'flip-nav', window.pageYOffset > 0);

        if (html[0].id === 'home') {
            setHomeHeaderStyles();
        }
    }

    $(document).ready(function() {
        html = $('html');
        body = $('body');
        header = $('header');
        quickstartButton = $('#quickstartButton');
        hero = $('#hero');
        encyclopedia = $('#encyclopedia');
        footer = $('footer');
        headlineWrapper = $('#headlineWrapper');
        HEADER_HEIGHT = header.outerHeight();

        resetTheView();

        window.addEventListener('resize', resetTheView);
        window.addEventListener('scroll', resetTheView);

        document.onunload = function() {
            window.removeEventListener('resize', resetTheView);
            window.removeEventListener('scroll', resetTheView);
        };

        setInterval(setFooterType, 100);
    });

    return {
        toggleToc: toggleToc
    };
})();

(function() {
    "use strict";
    var yah = true;
    var moving = false;
    var CSS_BROWSER_HACK_DELAY = 25;

    function setYAH() {
        var pathname = location.href.split('#')[0]; // on page load, make sure the page is YAH even if there's a hash
        var currentLinks = [];

        $('.pi-accordion a').each(function() {
            if (pathname === this.href) {
                currentLinks.push(this);
            }
        });

        currentLinks.forEach(function(yahLink) {
            $(yahLink).parents('.item').each(function() {
                $(this).addClass('on');
                $(this).find('.pi-wrapper').eq(0).css({ height: 'auto' });
                $(this).find('.content').eq(0).css({ opacity: 1 });
            });

            $(yahLink).addClass('yah');
            yahLink.onclick = function(e) { e.preventDefault(); };
        });
    }

    function collapseBox(container) {
        container.children('.item').each(function() {
            // build the TOC DOM
            // the animated open/close is enabled by having each item's content exist in the flow, at its natural height,
            // enclosed in a wrapper with height = 0 when closed, and height = contentHeight when open.
            var item = this;

            // only add content wrappers to containers, not to links
            var isContainer = item.tagName === 'DIV';

            var titleText = item.getAttribute('data-title');
            var title = newDOMElement('div', 'title');
            title.innerHTML = titleText;

            var wrapper, content;

            if (isContainer) {
                wrapper = newDOMElement('div', 'pi-wrapper');
                content = newDOMElement('div', 'content');
                content.innerHTML = item.innerHTML;
                wrapper.appendChild(content);
            }

            item.innerHTML = '';
            item.appendChild(title);

            if (wrapper) {
                item.appendChild(wrapper);
                $(wrapper).css({ height: 0 });
            }

            function toggleItem(thisItem) {
                var thisWrapper = $(thisItem).find('.pi-wrapper').eq(0);

                if (!thisWrapper) {
                    return;
                }

                var contentHeight = thisWrapper.find('.content').eq(0).innerHeight() + 'px';

                if ($(thisItem).hasClass('on')) {
                    thisWrapper.css({ height: contentHeight });
                    $(thisItem).removeClass('on');

                    setTimeout(function() {
                        thisWrapper.css({ height: 0 });
                        moving = false;
                    }, CSS_BROWSER_HACK_DELAY);
                } else {
                    $(item).addClass('on');
                    thisWrapper.css({ height: contentHeight });

                    var duration = parseFloat(getComputedStyle(thisWrapper[0]).transitionDuration) * 1000;

                    setTimeout(function() {
                        thisWrapper.css({ height: '' });
                        moving = false;
                    }, duration);
                }
            }

            $(title).click(function() {
                if (!yah) {
                    if (moving) {
                        return;
                    }
                    moving = true;
                }

                if (container[0].getAttribute('data-single')) {
                    var openSiblings = item.siblings().filter(function(sib) {
                        return sib.hasClass('on');
                    });
                    openSiblings.forEach(function(sibling) {
                        toggleItem(sibling);
                    });
                }

                setTimeout(function() {
                    if (!isContainer) {
                        moving = false;
                        return;
                    }
                    toggleItem(item);
                }, CSS_BROWSER_HACK_DELAY);
            });

            if (content) {
                var innerContainers = $(content).children('.pi-container');
                if (innerContainers.length > 0) {
                    innerContainers.each(function() {
                        collapseBox($(this));
                    });
                }
            }
        });
    }

    $(document).ready(function() {
        // Safari chokes on the animation here, so...
        if (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Safari') !== -1) {
            var hackStyle = newDOMElement('style');
            hackStyle.innerHTML = '.pi-accordion .pi-wrapper{transition: none}';
            body.append(hackStyle);
        }
        // Gross.

        $('.pi-accordion').each(function() {
            var accordion = this;
            var content = this.innerHTML;
            var container = newDOMElement('div', 'pi-container');
            container.innerHTML = content;
            $(accordion).empty();
            accordion.appendChild(container);
            collapseBox($(container));
        });

        setYAH();

        setTimeout(function() {
            yah = false;
        }, 500);
    });

    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
	
	//add class for toc
	$(document).ready(function() {
		var toc_right = $("#markdown-toc");
		toc_right.wrap("<div id='navbar-example'></div>")
		
		$("#markdown-toc").addClass("nav");
		$("#markdown-toc ul").addClass("nav");
		
		//hidden ul
		$("#markdown-toc >  li ul").attr("style","display:none");
		setInterval(function(){
			$("#markdown-toc >  li ul").attr("style","display:none");
			$(".active >ul").attr("style","display:block");
		},300);
		
	});
	//add listener
	$(document).ready(function(){
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh')
		})
	});
	//style="display:none"
	
})();

