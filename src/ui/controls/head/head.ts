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
        replaceWith: string = __Head;

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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
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
         * @type {HTMLMetaElement}
         *
         * @description
         * A reference to the the <meta name="author" /> element.
         */
        protected _authorElement: HTMLMetaElement;

        /**
         * @name _authorElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         *
         * @type {HTMLLinkElement}
         *
         * @description
         * A reference to the the <link rel="author" /> element.
         */
        protected _googleAuthorElement: HTMLLinkElement;

        /**
         * @name _fbAuthorElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         *
         * @type {HTMLMetaElement}
         *
         * @description
         * A reference to the the <meta property="article:author" /> element.
         */
        protected _fbAuthorElement: HTMLMetaElement;

        /**
         * @name _twitterCreatorElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         *
         * @type {HTMLMetaElement}
         *
         * @description
         * A reference to the the <meta property="twitter:creator" /> element.
         */
        protected _twitterCreatorElement: HTMLMetaElement;

        /**
         * @name _ogTypeElement
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         *
         * @type {HTMLMetaElement}
         *
         * @description
         * A reference to the the <meta property="og:type" /> element.
         */
        protected _ogTypeElement: HTMLMetaElement;

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
            let meta = __Meta,
                title = __Title,
                link = __MetaLink,
                author = __Author,
                type = __MetaType,
                creator = __Creator,
                image = __MetaImage,
                video = __MetaVideo,
                description = __Description,
                url = __Url,
                og = __OpenGraph,
                article = __Article,
                twitter = __Twitter;

            this._titleElement = this._createElement<HTMLTitleElement>(title);
            this._ogTitleElement = this._createElement<HTMLMetaElement>(meta, og + title);
            this._twitterTitleElement = this._createElement<HTMLMetaElement>(meta, twitter + title);

            this._descriptionElement = this._createElement<HTMLMetaElement>(meta, description);
            this._ogDescriptionElement = this._createElement<HTMLMetaElement>(meta, og + description);
            this._twitterDescriptionElement = this._createElement<HTMLMetaElement>(meta, twitter + description);

            this._ogUrlElement = this._createElement<HTMLMetaElement>(meta, og + url);
            this._twitterUrlElement = this._createElement<HTMLMetaElement>(meta, twitter + url);

            this._authorElement = this._createElement<HTMLMetaElement>(meta, author);
            this._googleAuthorElement = this._createElement<HTMLLinkElement>(link, author);
            this._fbAuthorElement = this._createElement<HTMLMetaElement>(meta, article + author);
            this._twitterCreatorElement = this._createElement<HTMLMetaElement>(meta, twitter + creator);

            this._ogTypeElement = this._createElement<HTMLMetaElement>(meta, og + type);
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
         * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
         * display name of the content author.
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
         * @name googleAuthor
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Gets the author or sets the author elements.
         *
         * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
         * Google+ profile url for the author.
         *
         * @returns {string} The author
         */
        googleAuthor(author?: string): string {
            if (!isString(author)) {
                return this._getContent(this._googleAuthorElement);
            }

            this._setContent([
                this._googleAuthorElement,
            ], author);

            return author;
        }

        /**
         * @name fbAuthor
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Gets the author or sets the author elements. This method is for use with the Facebook profile authors.
         *
         * @param {string} author? If supplied, the author elements will be set to this value. The value should be
         * the `https://www.facebook.com/username` account, and make sure the user supports followers.
         *
         * @returns {string} The author
         */
        fbAuthor(author?: string): string {
            if (!isString(author)) {
                return this._getContent(this._fbAuthorElement);
            }

            this._setContent([
                this._fbAuthorElement
            ], author);

            return author;
        }

        /**
         * @name twitterCreator
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Gets the creator or sets the creator elements
         *
         * @param {string} creator? If supplied, the creator elements will be set to this value. The
         * value should be the twitter `@username` of the creator
         *
         * @returns {string} The creator
         */
        twitterCreator(creator?: string): string {
            if (!isString(creator)) {
                return this._getContent(this._twitterCreatorElement);
            }

            this._setContent([
                this._twitterCreatorElement
            ], creator);

            return creator;
        }

        /**
         * @name fbType
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Gets the type or sets the type elements.
         *
         * @param {string} type? If supplied, the image elements will be set to this value.
         *
         * @returns {string} The image
         */
        fbType(type?: string): string {
            if (!isString(type)) {
                return this._getContent(this._ogTypeElement);
            }

            this._setContent([
                this._ogTypeElement
            ], type);

            return type;
        }

        /**
         * @name images
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Sets the image elements.
         *
         * @param {Array<string>} images For each image, a tag will be created
         *
         * @returns {void}
         */
        images(images: Array<string>): void {
            if (!isArray(images)) {
                return;
            }

            let meta = __Meta,
                og = __OpenGraph,
                twitter = __Twitter,
                ogElement: HTMLMetaElement,
                twitterElement: HTMLMetaElement;

            forEach((image: string): void => {
                ogElement = this._createElement<HTMLMetaElement>(meta, og + __MetaImage, true);
                twitterElement = this._createElement<HTMLMetaElement>(meta, twitter + __MetaImage, true);

                image = this._browser.urlUtils(image).href;

                this._setContent([
                    ogElement,
                    twitterElement
                ], image);
            }, images);
        }

        /**
         * @name videos
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Sets the video elements.
         *
         * @param {Array<string>} videos For each video, a tag will be created
         *
         * @returns {void}
         */
        videos(videos: Array<string>): void {
            if (!isArray(videos)) {
                return;
            }

            let meta = __Meta,
                og = __OpenGraph,
                metaVideo = __MetaVideo,
                _browser = this._browser,
                ogElement: HTMLMetaElement;

            forEach((video: string): void => {
                ogElement = this._createElement<HTMLMetaElement>(meta, og + metaVideo, true);
                video = _browser.urlUtils(video).href;

                this._setContent([
                    ogElement
                ], video);
            }, videos);
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
            let nodeName = element.nodeName.toLowerCase();

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
            let el: HTMLHeadElement = this.element,
                nodes: Array<HTMLElement> = Array.prototype.slice.call(el.children),
                length = elements.length,
                content = __Content,
                href = __MetaHref,
                sibling = this._titleElement.nextSibling,
                dom = this.dom,
                nodeName: string,
                element: HTMLElement;

            for (let i = 0; i < length; ++i) {
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
         * @param {boolean} multiple? Whether or not there can be multiple of this tag/name in the dom
         *
         * @returns {T} The created element.
         */
        protected _createElement<T extends HTMLElement>(tag: string, name?: string, multiple?: boolean): T {
            let el: T,
                hasName = isString(name),
                attr: string = (hasName && (name.indexOf(__OpenGraph) === 0 || name.indexOf(__Article) === 0)) ? __MetaProperty : __MetaName,
                element: HTMLHeadElement = this.element;

            if (tag === __MetaLink) {
                attr = __Rel;
            }

            if (!multiple && hasName) {
                el = <T>element.querySelector(tag + '[' + attr + '="' + name + '"]');
            } else if(!multiple) {
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
            let slice = Array.prototype.slice,
                og = this._document.head.querySelectorAll('meta[' + __MetaProperty + '^="' + __OpenGraph + '"]'),
                twitter = this._document.head.querySelectorAll('meta[' + __MetaName + '^="' + __Twitter + '"]');

            this._removeElements.apply(this, [
                this._descriptionElement,
                this._authorElement,
                this._googleAuthorElement
            ].concat(slice.call(og), slice.call(twitter)));
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
            let el = this.element,
                nodes: Array<HTMLElement> = Array.prototype.slice.call(el.children),
                length = elements.length,
                element: HTMLElement;

            for (let i = 0; i < length; ++i) {
                element = elements[i];
                if (nodes.indexOf(element) !== -1) {
                    el.removeChild(element);
                }
            }
        }
    }
}
