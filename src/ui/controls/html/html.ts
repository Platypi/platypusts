namespace plat.ui.controls {
    'use strict';

    /**
     * @name InnerHtml
     * @memberof plat.ui.controls
     * @kind class
     *
     * @extends {plat.ui.TemplateControl}
     *
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for adding HTML to the
     * DOM through bound context strings.
     */
    export class InnerHtml extends TemplateControl {
        protected static _inject: any = {
            _TemplateControlFactory: __TemplateControlFactory,
        };

        /**
         * @name options
         * @memberof plat.ui.controls.InnerHtml
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<plat.ui.controls.IInnerHtmlOptions>}
         *
         * @description
         * The {@link plat.ui.controls.IInnerHtmlOptions|options} for the {@link plat.ui.controls.InnerHtml|InnerHtml} control.
         */
        public options: observable.IObservableProperty<IInnerHtmlOptions>;

        /**
         * @name controls
         * @memberof plat.ui.controls.InnerHtml
         * @kind property
         * @access public
         *
         * @type {Array<plat.ui.TemplateControl>}
         *
         * @description
         * The child controls of the control. All will be of type {@link plat.ui.TemplateControl|TemplateControl}.
         */
        public controls: TemplateControl[];

        /**
         * @name _TemplateControlFactory
         * @memberof plat.ui.controls.InnerHtml
         * @kind property
         * @access protected
         *
         * @type {plat.ui.ITemplateControlFactory}
         *
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        protected _TemplateControlFactory: ITemplateControlFactory;

        /**
         * @name _html
         * @memberof plat.ui.controls.InnerHtml
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The string representation of the current bound html template.
         */
        protected _html: string;

        /**
         * @name setTemplate
         * @memberof plat.ui.controls.InnerHtml
         * @kind function
         * @access public
         *
         * @description
         * Clears the inner template if one exists.
         *
         * @returns {void}
         */
        public setTemplate(): void {
            this.dom.clearNode(this.element);
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.InnerHtml
         * @kind function
         * @access public
         *
         * @description
         * Checks options and initializes bindings.
         *
         * @returns {void}
         */
        public loaded(): void {
            const options = this.options;
            if (!isObject(options)) {
                return;
            }

            this._onOptionsChanged(options.value);
            options.observe(this._onOptionsChanged);
        }

        /**
         * @name _onOptionsChanged
         * @memberof plat.ui.controls.InnerHtml
         * @kind function
         * @access protected
         *
         * @description
         * The function called when any of the options for this control changes.
         *
         * @param {IInnerHtmlOptions} newValue The new value of the options property.
         * @param {IInnerHtmlOptions} oldValue? The old value of the options property.
         *
         * @returns {void}
         */
        protected _onOptionsChanged(
            newValue: IInnerHtmlOptions,
            oldValue?: IInnerHtmlOptions
        ): void {
            if (newValue === oldValue) {
                return;
            } else if (!isObject(newValue)) {
                this._log.debug(
                    `plat-options for ${this.type} must be an object.`
                );

                return;
            }

            const html = newValue.html;
            if (html === this._html) {
                return;
            }

            this._html = html;

            const htmlIsString = isString(html);
            if (isNull(html) || (htmlIsString && html.trim() === '')) {
                if (this.controls.length > 0) {
                    this._TemplateControlFactory.dispose(this.controls[0]);
                } else {
                    this.dom.clearNode(this.element);
                }

                return;
            } else if (!htmlIsString) {
                this._log.debug(
                    `Trying to bind a non-string value to ${this.type}.`
                );

                return;
            } else if (newValue.compile === true) {
                const hasControl = this.controls.length > 0;
                this.bindableTemplates.once(html).then((template) => {
                    if (hasControl) {
                        this._TemplateControlFactory.dispose(this.controls[0]);
                    } else {
                        this.dom.clearNode(this.element);
                    }

                    this.element.insertBefore(template, null);
                });

                return;
            }

            setInnerHtml(this.element, html);
        }
    }

    register.control(__Html, InnerHtml);

    /**
     * @name IInnerHtmlOptions
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @description
     * The {@link plat.observable.IObservableProperty|options} object for the
     * {@link plat.ui.controls.InnerHtml|InnerHtml} control.
     */
    export interface IInnerHtmlOptions {
        /**
         * @name html
         * @memberof plat.ui.controls.IInnerHtmlOptions
         * @kind property
         *
         * @type {string}
         *
         * @description
         * The HTML string to bind to the DOM.
         */
        html?: string;

        /**
         * @name compile
         * @memberof plat.ui.controls.IInnerHtmlOptions
         * @kind property
         *
         * @type {boolean}
         *
         * @description
         * Will compile the template string if set to true.
         */
        compile?: boolean;
    }
}
