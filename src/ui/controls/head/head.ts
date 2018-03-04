namespace plat.ui.controls {
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
    export class Head extends TemplateControl {
        protected static _inject: any = {
            _document: __Document,
            _browser: __Browser,
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
        public element: HTMLHeadElement;

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
        public replaceWith: string = __Head;

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
         * @name _structuredDataElements
         * @memberof plat.ui.controls.Head
         * @kind property
         * @access protected
         *
         * @type {Array<HTMLElement>}
         *
         * @description
         * A reference to all the structured data elements added to the DOM for this page.
         */
        protected _structuredDataElements: HTMLElement[] = [];

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
        public initialize(): void {
            this.on(__navigating, (): void => {
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
        public setTemplate(): void {
            const meta = __Meta;
            const title = __Title;
            const link = __MetaLink;
            const author = __Author;
            const type = __MetaType;
            const creator = __Creator;
            const image = __MetaImage;
            const video = __MetaVideo;
            const description = __Description;
            const url = __Url;
            const og = __OpenGraph;
            const article = __Article;
            const twitter = __Twitter;

            this.element.setAttribute(
                'prefix',
                'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#'
            );

            this._titleElement = this._createElement<HTMLTitleElement>(title);
            this._ogTitleElement = this._createElement<HTMLMetaElement>(
                meta,
                og + title
            );
            this._twitterTitleElement = this._createElement<HTMLMetaElement>(
                meta,
                twitter + title
            );

            this._descriptionElement = this._createElement<HTMLMetaElement>(
                meta,
                description
            );
            this._ogDescriptionElement = this._createElement<HTMLMetaElement>(
                meta,
                og + description
            );
            this._twitterDescriptionElement = this._createElement<
                HTMLMetaElement
            >(meta, twitter + description);

            this._ogUrlElement = this._createElement<HTMLMetaElement>(
                meta,
                og + url
            );
            this._twitterUrlElement = this._createElement<HTMLMetaElement>(
                meta,
                twitter + url
            );

            this._authorElement = this._createElement<HTMLMetaElement>(
                meta,
                author
            );
            this._googleAuthorElement = this._createElement<HTMLLinkElement>(
                link,
                author
            );
            this._fbAuthorElement = this._createElement<HTMLMetaElement>(
                meta,
                article + author
            );
            this._twitterCreatorElement = this._createElement<HTMLMetaElement>(
                meta,
                twitter + creator
            );

            this._ogTypeElement = this._createElement<HTMLMetaElement>(
                meta,
                og + type
            );
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
        public title(title?: string): string {
            if (!isString(title)) {
                return this._getContent(this._titleElement);
            }

            this._titleElement.innerText = title;
            this._setContent(
                [this._ogTitleElement, this._twitterTitleElement],
                title
            );

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
        public description(description?: string): string {
            if (!isString(description)) {
                return this._getContent(this._descriptionElement);
            }

            this._setContent(
                [
                    this._descriptionElement,
                    this._ogDescriptionElement,
                    this._twitterDescriptionElement,
                ],
                description
            );

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
        public url(url?: string): string {
            if (!isString(url)) {
                return this._getContent(this._ogUrlElement);
            }

            this._setContent(
                [this._ogUrlElement, this._twitterUrlElement],
                url
            );

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
        public author(author?: string): string {
            if (!isString(author)) {
                return this._getContent(this._authorElement);
            }

            this._setContent([this._authorElement], author);

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
        public googleAuthor(author?: string): string {
            if (!isString(author)) {
                return this._getContent(this._googleAuthorElement);
            }

            this._setContent([this._googleAuthorElement], author);

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
        public fbAuthor(author?: string): string {
            if (!isString(author)) {
                return this._getContent(this._fbAuthorElement);
            }

            this._setContent([this._fbAuthorElement], author);

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
        public twitterCreator(creator?: string): string {
            if (!isString(creator)) {
                return this._getContent(this._twitterCreatorElement);
            }

            this._setContent([this._twitterCreatorElement], creator);

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
        public fbType(type?: string): string {
            if (!isString(type)) {
                return this._getContent(this._ogTypeElement);
            }

            this._setContent([this._ogTypeElement], type);

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
        public images(images: string[]): void {
            if (!isArray(images)) {
                return;
            }

            const meta = __Meta;
            const og = __OpenGraph;
            const twitter = __Twitter;
            let ogElement: HTMLMetaElement;
            let twitterElement: HTMLMetaElement;
            const head = this.element;

            forEach((image: string): void => {
                image = this._browser.urlUtils(image).href;

                const elements = head.querySelectorAll(
                    `${meta}[content="${image}"]`
                );

                if (elements.length === 2) {
                    return;
                }

                ogElement = this._createElement<HTMLMetaElement>(
                    meta,
                    og + __MetaImage,
                    true
                );
                twitterElement = this._createElement<HTMLMetaElement>(
                    meta,
                    twitter + __MetaImage,
                    true
                );

                this._setContent([ogElement, twitterElement], image);
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
        public videos(videos: string[]): void {
            if (!isArray(videos)) {
                return;
            }

            const meta = __Meta;
            const og = __OpenGraph;
            const metaVideo = __MetaVideo;
            const _browser = this._browser;
            let ogElement: HTMLMetaElement;
            const head = this.element;

            forEach((video: string): void => {
                video = _browser.urlUtils(video).href;

                const elements = head.querySelectorAll(
                    `${meta}[content="${video}"]`
                );

                if (elements.length === 1) {
                    return;
                }

                ogElement = this._createElement<HTMLMetaElement>(
                    meta,
                    og + metaVideo,
                    true
                );

                this._setContent([ogElement], video);
            }, videos);
        }

        /**
         * @name structuredData
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Adds a structured data ld+json element to the DOM.
         *
         * @param {any} The object, it will be stringified and put in the ld+json tag.
         *
         * @returns {void}
         */
        public structuredData(obj: any): void {
            if (isEmpty(obj)) {
                return;
            }

            const el = this._document.createElement('script');
            const sibling = this._titleElement.nextSibling;

            el.setAttribute('type', 'application/ld+json');
            el.textContent = JSON.stringify(obj);

            this._structuredDataElements.push(el);
            this.dom.insertBefore(this.element, el, sibling);
        }

        /**
         * @name blogPostings
         * @memberof plat.ui.controls.Head
         * @kind function
         * @access public
         *
         * @description
         * Takes in one or more BlogPosting <http://schema.org/BlogPosting> objects and sets them as ld+json tags in the head.
         *
         * @param {plat.ui.controls.IBlogPosting} The posting object, it will be stringified and put in the ld+json tag.
         *
         * @returns {void}
         */
        public blogPostings(...postings: IBlogPosting[]): void {
            const length = postings.length;

            for (let i = 0; i < length; i += 1) {
                this.structuredData(postings[i]);
            }
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
        public loaded(): void {
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
        public navigated(url: string): void {
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
            const nodeName = element.nodeName.toLowerCase();

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
        protected _setContent(elements: HTMLElement[], value: string): void {
            const el: HTMLHeadElement = this.element;
            const nodes: HTMLElement[] = Array.prototype.slice.call(
                el.children
            );
            const length = elements.length;
            const content = __Content;
            const href = __MetaHref;
            const sibling = this._titleElement.nextSibling;
            const dom = this.dom;
            let nodeName: string;
            let element: HTMLElement;

            for (let i = 0; i < length; i += 1) {
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
        protected _createElement<T extends HTMLElement>(
            tag: string,
            name?: string,
            multiple?: boolean
        ): T {
            const hasName = isString(name);
            const element: HTMLHeadElement = this.element;

            let el: T;
            let attr: string =
                hasName &&
                (name.indexOf(__OpenGraph) === 0 ||
                    name.indexOf(__Article) === 0)
                    ? __MetaProperty
                    : __MetaName;

            if (tag === __MetaLink) {
                attr = __Rel;
            }

            if (!multiple && hasName) {
                el = element.querySelector(`${tag}[${attr}="${name}"]`);
            } else if (!multiple) {
                el = element.querySelector(tag);
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
            const slice = Array.prototype.slice;
            const og = this._document.head.querySelectorAll(
                `meta[${__MetaProperty}^="${__OpenGraph}"]`
            );
            const twitter = this._document.head.querySelectorAll(
                `meta[${__MetaName}^="${__Twitter}"]`
            );

            this._removeElements.apply(
                this,
                [
                    this._descriptionElement,
                    this._authorElement,
                    this._googleAuthorElement,
                ].concat(
                    slice.call(og),
                    slice.call(twitter),
                    slice.call(this._structuredDataElements)
                )
            );

            this._structuredDataElements = [];
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
        protected _removeElements(...elements: HTMLElement[]): void {
            const el = this.element;
            const nodes: HTMLElement[] = Array.prototype.slice.call(
                el.children
            );
            const length = elements.length;
            let element: HTMLElement;

            for (let i = 0; i < length; i += 1) {
                element = elements[i];
                if (nodes.indexOf(element) !== -1) {
                    el.removeChild(element);
                }
            }
        }
    }

    /**
     * @name IArticle
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @description
     * An interface for the http://schema.org/Article type.
     */
    export interface IArticle {
        /**
         * @name @context
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Should be http://schema.org
         */
        '@context': string;

        /**
         * @name @type
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Should be the specific type of schema (i.e. Article, BlogPosting)
         */
        '@type': string;

        /**
         * @name mainEntityOfPage
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         * @optional
         *
         * @type {any}
         *
         * @description
         * A WebPage object, with the id being the url of the page. This property is
         * optional, but highly recommended.
         */
        mainEntityOfPage?: {
            '@type': string;
            '@id': string;
        };

        /**
         * @name headline
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * A WebPage object, with the id being the url of the page. No longer than 110 characters.
         */
        headline: string;

        /**
         * @name image
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {plat.ui.controls.IImageObject}
         *
         * @description
         * An image to associate with this article.
         */
        image: IImageObject;

        /**
         * @name datePublished
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {Date}
         *
         * @description
         * The date the article was published.
         */
        datePublished: Date;

        /**
         * @name dateModified
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         * @optional
         *
         * @type {Date}
         *
         * @description
         * The date the article was last modified.
         */
        dateModified?: Date;

        /**
         * @name author
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * The author of the article.
         */
        author: {
            '@type': string;
            name: string;
        };

        /**
         * @name publisher
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * The publisher of the article.
         */
        publisher: {
            '@type': string;
            name: string;
            logo: IImageObject;
        };

        /**
         * @name description
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * A brief description of the article.
         */
        description?: string;

        /**
         * @name name
         * @memberof plat.ui.controls.IArticle
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * The name of the article.
         */
        name?: string;
    }

    /**
     * @name IBlogPosting
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @extends {plat.ui.controls.IArticle}
     *
     * @description
     * An interface for the http://schema.org/BlogPosting type.
     */
    // tslint:disable-next-line
    export interface IBlogPosting extends IArticle {}

    /**
     * @name IBlogPosting
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @extends {plat.ui.controls.IArticle}
     *
     * @description
     * An interface for the http://schema.org/ImageObject type.
     */
    export interface IImageObject {
        /**
         * @name @type
         * @memberof plat.ui.controls.IImageObject
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Should be ImageObject
         */
        '@type': string;

        /**
         * @name url
         * @memberof plat.ui.controls.IImageObject
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The url to the image location.
         */
        url: string;

        /**
         * @name caption
         * @memberof plat.ui.controls.IImageObject
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * The caption for the image
         */
        caption?: string;

        /**
         * @name height
         * @memberof plat.ui.controls.IImageObject
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The pixel height of the image
         */
        height: number;

        /**
         * @name width
         * @memberof plat.ui.controls.IImageObject
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The pixel width of the image
         */
        width: number;
    }
}
