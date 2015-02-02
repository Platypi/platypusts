module plat.ui.controls {
    'use strict';

    /**
     * @name Head
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A special type of {@link plat.ui.TemplateControl|TemplateControl} for managing meta tags, useful for SEO. This 
     * control will not exist unless you register it as a control with the name 'head'. It is static, so you can inject 
     * it into other components and get access to its properties.
     */
    export class Head extends plat.ui.TemplateControl {
        protected static _inject: any = {
            _document: __Document,
            _browser: __Browser
        };

        /**
         * @name element
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access public
         * 
         * @type {HTMLHeadElement}
         * 
         * @description
         * This control is specifically for use with the <head /> HTML element.
         */
        element: HTMLHeadElement;

        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Rather than be replaced by a 'div', this control wants to be a 'head' element.
         */
        replaceWith = __Head;

        /**
         * @name _document
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {Document}
         * 
         * @description
         * The Document injectable.
         */
        protected _document: Document;

        /**
         * @name _browser
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {plat.web.Browser}
         * 
         * @description
         * The {@link plat.web.Browser|Browser} injectable.
         */
        protected _browser: web.Browser;

        /**
         * @name _titleElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <title /> element.
         */
        protected _titleElement: HTMLTitleElement;

        /**
         * @name _ogTitleElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta property="og:title" /> element.
         */
        protected _ogTitleElement: HTMLMetaElement;

        /**
         * @name _twitterTitleElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta name="twitter:title" /> element.
         */
        protected _twitterTitleElement: HTMLMetaElement;
        
        /**
         * @name _descriptionElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta name="description" /> element.
         */
        protected _descriptionElement: HTMLMetaElement;

        /**
         * @name _ogDescriptionElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta property="og:description" /> element.
         */
        protected _ogDescriptionElement: HTMLMetaElement;

        /**
         * @name _twitterDescriptionElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta name="twitter:description" /> element.
         */
        protected _twitterDescriptionElement: HTMLMetaElement;

        /**
         * @name _ogUrlElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta property="og:url" /> element.
         */
        protected _ogUrlElement: HTMLMetaElement;

        /**
         * @name _twitterUrlElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta name="twitter:url" /> element.
         */
        protected _twitterUrlElement: HTMLMetaElement;

        /**
         * @name _authorElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <link rel="author" /> element.
         */
        protected _authorElement: HTMLLinkElement;

        /**
         * @name _publisherElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <link rel="publisher" /> element.
         */
        protected _publisherElement: HTMLLinkElement;

        /**
         * @name _ogImageElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta property="og:image" /> element.
         */
        protected _ogImageElement: HTMLMetaElement;

        /**
         * @name _twitterImageElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * A reference to the the <meta name="twitter:image" /> element.
         */
        protected _twitterImageElement: HTMLMetaElement;

        /**
         * @name initialize
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Registers for the navigating event to know when to remove all the elements so they 
         * don't bleed onto the next page.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.on(__navigating,(): void => {
                this._removeAllElements();
            });
        }

        /**
         * @name setTemplate
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Makes sure all the elements exist.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var meta = __Meta,
                title = __Title,
                link = __MetaLink,
                author = __Author,
                publisher = __Publisher,
                image = __MetaImage,
                description = __Description,
                url = __Url,
                og = __OpenGraph,
                twitter = __Twitter;

            this._titleElement = this._createElement<HTMLTitleElement>(title);
            this._ogTitleElement = this._createElement<HTMLMetaElement>(meta, og + title);
            this._twitterTitleElement = this._createElement<HTMLMetaElement>(meta, twitter + title);

            this._descriptionElement = this._createElement<HTMLMetaElement>(meta, description);
            this._ogDescriptionElement = this._createElement<HTMLMetaElement>(meta, og + description);
            this._twitterDescriptionElement = this._createElement<HTMLMetaElement>(meta, twitter + description);

            this._ogUrlElement = this._createElement<HTMLMetaElement>(meta, og + url);
            this._twitterUrlElement = this._createElement<HTMLMetaElement>(meta, twitter + url);

            this._authorElement = this._createElement<HTMLLinkElement>(link, author);

            this._publisherElement = this._createElement<HTMLLinkElement>(link, publisher);

            this._ogImageElement = this._createElement<HTMLMetaElement>(meta, og + image);
            this._twitterImageElement = this._createElement<HTMLMetaElement>(meta, twitter + image);
        }

        /**
         * @name title
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Gets the title or sets the title elements.
         * 
         * @param {string} title? If supplied, the title elements will be set to this value.
         * 
         * @returns {string} The title
         */
        title(title?: string): string {
            if (!isString(title)) {
                return this._getContent(this._titleElement);
            }

            this._titleElement.innerText = title;
            this._setContent([
                this._ogTitleElement,
                this._twitterTitleElement
            ], title);

            return title;
        }

        /**
         * @name description
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Gets the description or sets the description elements.
         * 
         * @param {string} description? If supplied, the description elements will be set to this value.
         * 
         * @returns {string} The description
         */
        description(description?: string): string {
            if (!isString(description)) {
                return this._getContent(this._descriptionElement);
            }

            this._setContent([
                this._descriptionElement,
                this._ogDescriptionElement,
                this._twitterDescriptionElement
            ], description);

            return description;
        }

        /**
         * @name url
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Gets the url or sets the url elements.
         * 
         * @param {string} url? If supplied, the url elements will be set to this value.
         * 
         * @returns {string} The url
         */
        url(url?: string): string {
            if (!isString(url)) {
                return this._getContent(this._ogUrlElement);
            }

            this._setContent([
                this._ogUrlElement,
                this._twitterUrlElement
            ], url);

            return url;
        }

        /**
         * @name author
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Gets the author or sets the author elements.
         * 
         * @param {string} author? If supplied, the author elements will be set to this value.
         * 
         * @returns {string} The author
         */
        author(author?: string): string {
            if (!isString(author)) {
                return this._getContent(this._authorElement);
            }

            this._setContent([
                this._authorElement,
            ], author);

            return author;
        }

        /**
         * @name publisher
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Gets the publisher or sets the publisher elements.
         * 
         * @param {string} publisher? If supplied, the publisher elements will be set to this value.
         * 
         * @returns {string} The publisher
         */
        publisher(publisher?: string): string {
            if (!isString(publisher)) {
                return this._getContent(this._publisherElement);
            }

            this._setContent([
                this._publisherElement
            ], publisher);

            return publisher;
        }

        /**
         * @name image
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Gets the image or sets the image elements.
         * 
         * @param {string} image? If supplied, the image elements will be set to this value.
         * 
         * @returns {string} The image
         */
        image(image?: string): string {
            if (!isString(image)) {
                return this._getContent(this._ogImageElement);
            }

            this._setContent([
                this._ogImageElement,
                this._twitterImageElement
            ], image);

            return image;
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Sets the url elements initially.
         * 
         * @returns {void}
         */
        loaded(): void {
            this.url(this._browser.url());
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         * 
         * @description
         * Sets the url elements.
         * 
         * @returns {void}
         */
        navigated(url: string): void {
            this.url(url);
        }

        /**
         * @name _getContent
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access protected
         * 
         * @description
         * Gets the innerText/content/href of an element.
         * 
         * @param {HTMLElement} element The element from which to get the content.
         * 
         * @returns {void}
         */
        protected _getContent(element: HTMLElement): string {
            var nodeName = element.nodeName.toLowerCase();

            if (nodeName === __Title) {
                return element.innerText;
            } else if (nodeName === __Meta) {
                return element.getAttribute(__Content);
            } else if (nodeName === __MetaLink) {
                return element.getAttribute(__MetaHref);
            }
        }

        /**
         * @name _setContent
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the innerText/content/href of a list elements. If an element is not in the DOM, it 
         * is added to the dom right after the <title /> element.
         * 
         * @param {Array<HTMLElement>} elements The elements for which to set values.
         * 
         * @returns {void}
         */
        protected _setContent(elements: Array<HTMLElement>, value: string): void {
            var nodes: Array<HTMLElement> = Array.prototype.slice.call(this.element.children),
                length = elements.length,
                content = __Content,
                href = __MetaHref,
                el: HTMLHeadElement = this.element,
                sibling = this._titleElement.nextSibling,
                dom = this.dom,
                nodeName: string,
                element: HTMLElement;

            for (var i = 0; i < elements.length; ++i) {
                element = elements[i];
                nodeName = element.nodeName.toLowerCase();

                if (nodeName === __Meta) {
                    element.setAttribute(content, value);
                } else {
                    element.setAttribute(href, value);
                }

                if (nodes.indexOf(element) === -1) {
                    dom.insertBefore(el, element, sibling);
                }
            }
        }

        /**
         * @name _createElement
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access protected
         * 
         * @description
         * Creates an element with the specified tag and name. The name corresponds to 
         * the type of the meta/link tag (i.e. title/description/author etc), and is also the 
         * value that will be set for the proper attribute. The attribute is determined based on 
         * the tag/name combination.
         * 
         * @typeparam {HTMLElement} T The type of element to create.
         * 
         * @param {string} tag The tag name for the element.
         * @param {string} name? The name corresponding to the type of meta/link tag.
         * 
         * @returns {T} The created element.
         */
        protected _createElement<T extends HTMLElement>(tag: string, name?: string): T {
            var el: T,
                hasName = isString(name),
                attr: string = hasName && name.indexOf(__OpenGraph) === 0 ? __MetaProperty : __MetaName,
                element: HTMLHeadElement = this.element;

            if (tag === __MetaLink) {
                attr = __Rel;
            }

            if (hasName) {
                el = <T>element.querySelector(tag + '[' + attr + '="' + name + '"]');
            } else {
                el = <T>element.querySelector(tag);
            }

            if (!isNode(el)) {
                el = <T>this._document.createElement(tag);
            }

            if (hasName) {
                el.setAttribute(attr, name);
            }

            return el;
        }

        /**
         * @name _removeAllElements
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access protected
         * 
         * @description
         * Removes all the unnecessary elements from the <head /> to avoid having 
         * incorrect tags on the page.
         * 
         * @returns {void}
         */
        protected _removeAllElements(): void {
            this._removeElements(
                this._ogTitleElement,
                this._twitterTitleElement,
                this._descriptionElement,
                this._ogDescriptionElement,
                this._twitterDescriptionElement,
                this._authorElement,
                this._publisherElement,
                this._ogImageElement,
                this._twitterImageElement
            );
        }

        /**
         * @name _removeElements
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access protected
         * 
         * @description
         * Removes elements from the <head />
         * 
         * @returns {void}
         */
        protected _removeElements(...elements: Array<HTMLElement>): void {
            var el = this.element,
                nodes: Array<HTMLElement> = Array.prototype.slice.call(el.children),
                length = elements.length,
                element: HTMLElement;

            for (var i = 0; i < length; ++i) {
                element = elements[i];
                if (nodes.indexOf(element) !== -1) {
                    el.removeChild(element);
                }
            }
        }
    }
}
