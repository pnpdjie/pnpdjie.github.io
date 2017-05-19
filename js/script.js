
function newDOMElement(tag, className, id){
    var el = document.createElement(tag);

    if (className) el.className = className;
    if (id) el.id = id;

    return el;
}

(function(){
    var yah = true;
    var moving = false;
    var CSS_BROWSER_HACK_DELAY = 25;

    $(document).ready(function(){
        // Safari chokes on the animation here, so...
        if (navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('Safari') != -1){
            var hackStyle = newDOMElement('style');
            hackStyle.innerHTML = '.pi-accordion .pi-wrapper{transition: none}';
            body.append(hackStyle);
        }
        // Gross.

        $('.pi-accordion').each(function () {
            var accordion = this;
            var content = this.innerHTML;
            var container = newDOMElement('div', 'container');
            container.innerHTML = content;
            $(accordion).empty();
            accordion.appendChild(container);
            CollapseBox($(container));
        });

        setYAH();

        setTimeout(function () {
            yah = false;
        }, 500);
    });

    function CollapseBox(container){
        container.children('.item').each(function(){
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
                $(wrapper).css({height: 0});
            }


            $(title).click(function(){
                if (!yah) {
                    if (moving) return;
                    moving = true;
                }

                if (container[0].getAttribute('data-single')) {
                    var openSiblings = item.siblings().filter(function(sib){return sib.hasClass('on');});
                    openSiblings.forEach(function(sibling){
                        toggleItem(sibling);
                    });
                }

                setTimeout(function(){
                    if (!isContainer) {
                        moving = false;
                        return;
                    }
                    toggleItem(item);
                }, CSS_BROWSER_HACK_DELAY);
            });

            function toggleItem(thisItem){
                var thisWrapper = $(thisItem).find('.pi-wrapper').eq(0);

                if (!thisWrapper) return;

                var contentHeight = thisWrapper.find('.content').eq(0).innerHeight() + 'px';

                if ($(thisItem).hasClass('on')) {
                    thisWrapper.css({height: contentHeight});
                    $(thisItem).removeClass('on');

                    setTimeout(function(){
                        thisWrapper.css({height: 0});
                        moving = false;
                    }, CSS_BROWSER_HACK_DELAY);
                } else {
                    $(item).addClass('on');
                    thisWrapper.css({height: contentHeight});

                    var duration = parseFloat(getComputedStyle(thisWrapper[0]).transitionDuration) * 1000;

                    setTimeout(function(){
                        thisWrapper.css({height: ''});
                        moving = false;
                    }, duration);
                }
            }

            if (content) {
                var innerContainers = $(content).children('.container');
                if (innerContainers.length > 0) {
                    innerContainers.each(function(){
                        CollapseBox($(this));
                    });
                }
            }
        });
    }

    function setYAH() {
        var pathname = location.href.split('#')[0]; // on page load, make sure the page is YAH even if there's a hash
        var currentLinks = [];

        $('.pi-accordion a').each(function () {
            if (pathname === this.href) currentLinks.push(this);
        });

        currentLinks.forEach(function (yahLink) {
            $(yahLink).parents('.item').each(function(){
                $(this).addClass('on');
                $(this).find('.pi-wrapper').eq(0).css({height: 'auto'});
                $(this).find('.content').eq(0).css({opacity: 1});
            });

            $(yahLink).addClass('yah');
            yahLink.onclick = function(e){e.preventDefault();};
        });
    }
})();
