module plat.controls {
    'use strict';

    /**
     * @name KeyCodes
     * @memberof plat.controls
     * @kind property
     * @access public
     * 
     * @type {any}
     * 
     * @description
     * A mapping of all keys to their equivalent keyCode.
     */
    export var KeyCodes = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'shift': 16,
        'ctrl': 17,
        'alt': 18,
        'pause': 19, 'break': 19,
        'caps lock': 20,
        'escape': 27,
        'space': 32,
        'page up': 33,
        'page down': 34,
        'end': 35,
        'home': 36,
        'left': 37, 'left arrow': 37,
        'up': 38, 'up arrow': 38,
        'right': 39, 'right arrow': 39,
        'down': 40, 'down arrow': 40,
        'insert': 45,
        'delete': 46,
        '0': 48, 'zero': 48,
        ')': 48, 'right parenthesis': 48,
        '1': 49, 'one': 49,
        '!': 49, 'exclamation': 49, 'exclamation point': 49,
        '2': 50, 'two': 50,
        '@': 50, 'at': 50,
        '3': 51, 'three': 51,
        '#': 51, 'number sign': 51,
        'hash': 51, 'pound': 51,
        '4': 52, 'four': 52,
        '$': 52, 'dollar': 52, 'dollar sign': 52,
        '5': 53, 'five': 53,
        '%': 53, 'percent': 53, 'percent sign': 53,
        '6': 54, 'six': 54,
        '^': 54, 'caret': 54,
        '7': 55, 'seven': 55,
        '&': 55, 'ampersand': 55,
        '8': 56, 'eight': 56,
        '*': 56, 'asterisk': 56,
        '9': 57, 'nine': 57,
        '(': 57, 'left parenthesis': 57,
        'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69,
        'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74,
        'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79,
        'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
        'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89,
        'z': 90,
        'lwk': 91, 'left window key': 91,
        'rwk': 92, 'right window key': 92,
        'select': 93, 'select key': 93,
        'numpad 0': 96,
        'numpad 1': 97,
        'numpad 2': 98,
        'numpad 3': 99,
        'numpad 4': 100,
        'numpad 5': 101,
        'numpad 6': 102,
        'numpad 7': 103,
        'numpad 8': 104,
        'numpad 9': 105,
        'multiply': 106,
        'add': 107,
        'subtract': 109,
        'decimal point': 110,
        'divide': 111,
        'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115,
        'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119,
        'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123,
        'num lock': 144,
        'scroll lock': 145,
        ';': 186, 'semi-colon': 186,
        ':': 186, 'colon': 186,
        '=': 187, 'equal': 187, 'equal sign': 187,
        '+': 187, 'plus': 187,
        ',': 188, 'comma': 188,
        '<': 188, 'lt': 188, 'less than': 188,
        'left angle bracket': 188,
        '-': 189, 'dash': 189,
        '_': 189, 'underscore': 189,
        '.': 190, 'period': 190,
        '>': 190, 'gt': 190, 'greater than': 190,
        'right angle bracket': 190,
        '/': 191, 'forward slash': 191,
        '?': 191, 'question mark': 191,
        '`': 192, 'grave accent': 192,
        '~': 192, 'tilde': 192,
        '[': 219, 'open bracket': 219,
        '{': 219, 'open brace': 219,
        '\\': 220, 'back slash': 220,
        '|': 220, 'pipe': 220,
        ']': 221, 'close bracket': 221,
        '}': 221, 'close brace': 221,
        '\'': 222, 'single quote': 222,
        '"': 222, 'double quote': 222
    };

    /**
     * @name KeyCodeEventControl
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.SimpleEventControl}
     * @implements {plat.controls.IKeyCodeEventControl}
     * 
     * @description
     * Base class used for filtering keys on KeyboardEvents.
     */
    export class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
        /**
         * @name keyCodes
         * @memberof plat.controls.KeyCodeEventControl
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * Holds the key mappings to filter for in a KeyboardEvent.
         */
        keyCodes: IObject<boolean> = {};

        /**
         * @name _setListener
         * @memberof plat.controls.KeyCodeEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if the {@link plat.controls.IKeyboardEventInput|IKeyboardEventInput} is an expression object 
         * and sets the necessary listener.
         * 
         * @returns {void}
         */
        protected _setListener(): void {
            var attr = this.attribute;
            if (isEmpty(this.event) || isEmpty(attr)) {
                return;
            }

            var expression = this.attributes[attr].trim();
            if (expression[0] === '{') {
                var eventObject: IKeyboardEventInput = this.evaluateExpression(expression) || { method: '' },
                    keys = this._filterArgs(eventObject);

                this._setKeyCodes(keys);
                this.addEventListener(this.element, this.event, this._onEvent, false);
                return;
            }

            super._setListener();
        }

        /**
         * @name _filterArgs
         * @memberof plat.controls.KeyCodeEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Parses the proper method args and finds any key code filters.
         * 
         * @returns {Array<number|string>} An array of either characters or key codes 
         * used for filtering.
         */
        protected _filterArgs(input: IKeyboardEventInput): Array<any> {
            var key = input.key,
                keys = input.keys;

            this._parseArgs(input.method);

            if (isArray(keys)) {
                return keys;
            } else if (isString(keys)) {
                return [keys];
            } else if (isArray(key)) {
                return key;
            } else if (isString(key)) {
                return [key];
            } else {
                if (!(isNull(input.char) && isNull(input.chars))) {
                    this._log.warn(this.type +
                        ' should be using the property key or keys to denote key codes or keys and not char codes or characters.');
                }
            }
        }

        /**
         * @name _onEvent
         * @memberof plat.controls.KeyCodeEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Matches the event's keyCode if necessary and then handles the event if 
         * a match is found or if there are no filter keyCodes.
         * 
         * @param {KeyboardEvent} ev The keyboard event object.
         * 
         * @returns {void}
         */
        protected _onEvent(ev: KeyboardEvent): void {
            if (this._compareKeys(ev)) {
                super._onEvent(ev);
            }
        }

        /**
         * @name _compareKeys
         * @memberof plat.controls.KeyCodeEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Matches the event's keyCode if necessary.
         * 
         * @param {KeyboardEvent} ev The keyboard event object.
         * 
         * @returns {boolean} Whether or not there is a match.
         */
        protected _compareKeys(ev: KeyboardEvent): boolean {
            var keyCodes = this.keyCodes,
                keyCode = ev.keyCode || ev.which;

            return isEmpty(keyCodes) || keyCodes[keyCode] === true;
        }

        /**
         * @name _setKeyCodes
         * @memberof plat.controls.KeyCodeEventControl
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the defined key codes as they correspond to 
         * the {@link plat.controls.KeyCodes|KeyCodes} map.
         * 
         * @param {Array<string>} keys? The array of defined keys to satisfy the 
         * key press condition.
         * 
         * @returns {void}
         */
        protected _setKeyCodes(keys?: Array<string>): void {
            if (!isArray(keys)) {
                keys = [];
            }

            var length = keys.length,
                key: string,
                keyCodes = this.keyCodes,
                index: string;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                index = isNumber(key) ? key : (<any>KeyCodes)[key.toLowerCase()];
                keyCodes[index] = true;
            }
        }
    }

    /**
     * @name IKeyCodeEventControl
     * @memberof plat.controls
     * @kind interface
     * 
     * @extends {plat.controls.ISendEvents}
     * 
     * @description
     * An attribute object that binds to specified key code scenarios.
     */
    export interface IKeyCodeEventControl extends ISendEvents {
        /**
         * @name keyCodes
         * @memberof plat.controls.IKeyCodeEventControl
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * Holds the key mappings to filter for in a KeyboardEvent.
         */
        keyCodes: IObject<boolean>;
    }

    /**
     * @name IKeyboardEventInput
     * @memberof plat.controls
     * @kind interface
     * 
     * @description
     * The available options for {@link plat.controls.KeyCodeEventControl|KeyCodeEventControl}.
     */
    export interface IKeyboardEventInput {
        /**
         * @name method
         * @memberof plat.controls.IKeyboardEventInput
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The method to call when the condition is satisfied.
         */
        method: string;

        /**
         * @name key
         * @memberof plat.controls.IKeyboardEventInput
         * @kind property
         * @access public
         * 
         * @type {string|number}
         * 
         * @description
         * The key to satisfy the press condition. Can be specified either as a numeric key code 
         * or a string representation as seen by the KeyCodes mapping. Used for keydown, 
         * keypress, and keyup events where capitalization is disregarded.
         */
        key?: any;

        /**
         * @name keys
         * @memberof plat.controls.IKeyboardEventInput
         * @kind property
         * @access public
         * 
         * @type {Array<string|number>}
         * 
         * @description
         * An optional array of keys or key codes if more than one key can satisfy the condition. Used for keydown, 
         * keypress, and keyup events where capitalization is disregarded.
         */
        keys?: Array<any>;

        /**
         * @name char
         * @memberof plat.controls.IKeyboardEventInput
         * @kind property
         * @access public
         * 
         * @type {string|number}
         * 
         * @description
         * The character to satisfy the press condition. Can be specified either as a numeric char code 
         * or the char itself. Used for the charpress event where capitalization is regarded.
         */
        char?: any;

        /**
         * @name chars
         * @memberof plat.controls.IKeyboardEventInput
         * @kind property
         * @access public
         * 
         * @type {Array<string|number>}
         * 
         * @description
         * An optional array of characters or char codes if more than one char can satisfy the condition. 
         * Used for the charpress event where capitalization is regarded.
         */
        chars?: Array<any>;
    }

    /**
     * @name KeyDown
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.KeyCodeEventControl}
     * 
     * @description
     * Used for filtering keys on keydown events. Does not take capitalization into account.
     */
    export class KeyDown extends KeyCodeEventControl {
        /**
         * @name event
         * @memberof plat.controls.KeyDown
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event name.
         */
        event: string = 'keydown';
    }

    /**
     * @name KeyPress
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.KeyCodeEventControl}
     * 
     * @description
     * Used for filtering only printing keys (a-z, A-Z, 0-9, and special characters) on keydown events. 
     * Does not take capitalization into account.
     */
    export class KeyPress extends KeyCodeEventControl {
        /**
         * @name event
         * @memberof plat.controls.KeyPress
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event name.
         */
        event: string = 'keydown';

        /**
         * @name _onEvent
         * @memberof plat.controls.KeyPress
         * @kind function
         * @access protected
         * 
         * @description
         * Filters only 'printing keys' (a-z, A-Z, 0-9, and special characters).
         * 
         * @param {KeyboardEvent} ev The KeyboardEvent object.
         * 
         * @returns {void}
         */
        _onEvent(ev: KeyboardEvent): void {
            var keyCode = ev.keyCode || ev.which;

            if (super._compareKeys(ev) && ((keyCode >= 48 && keyCode <= 90) ||
                (keyCode >= 186) || (keyCode >= 96 && keyCode <= 111))) {
                var remove = this.addEventListener(this.element, 'keypress',(e: KeyboardEvent): void => {
                    remove();
                    super._onEvent(e);
                }, false);
            }
        }

        /**
         * @name _compareKeys
         * @memberof plat.controls.KeyPress
         * @kind function
         * @access protected
         * 
         * @description
         * Matches the event's keyCode if necessary.
         * 
         * @param {KeyboardEvent} ev The keyboard event object.
         * 
         * @returns {boolean} Whether or not there is a match.
         */
        protected _compareKeys(ev: KeyboardEvent): boolean {
            return true;
        }
    }

    /**
     * @name KeyUp
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.KeyCodeEventControl}
     * 
     * @description
     * Used for filtering keys on keyup events. Does not take capitalization into account.
     */
    export class KeyUp extends KeyCodeEventControl {
        /**
         * @name event
         * @memberof plat.controls.KeyUp
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event name.
         */
        event: string = 'keyup';
    }

    /**
     * @name CharPress
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.controls.KeyCodeEventControl}
     * 
     * @description
     * Used for filtering keys on keypress events. Takes capitalization into account.
     */
    export class CharPress extends KeyCodeEventControl {
        /**
         * @name event
         * @memberof plat.controls.CharPress
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event name.
         */
        event: string = 'keypress';

        /**
         * @name _filterArgs
         * @memberof plat.controls.CharPress
         * @kind function
         * @access protected
         * 
         * @description
         * Parses the proper method args and finds any char code filters.
         * 
         * @returns {Array<number|string>} An array of either characters or char codes 
         * used for filtering.
         */
        protected _filterArgs(input: IKeyboardEventInput): Array<any> {
            var char = input.char,
                chars = input.chars;

            this._parseArgs(input.method);

            if (isArray(chars)) {
                return chars;
            } else if (isString(chars)) {
                return [chars];
            } else if (isArray(char)) {
                return char;
            } else if (isString(char)) {
                return [char];
            } else {
                if (!(isNull(input.key) && isNull(input.keys))) {
                    this._log.warn(this.type +
                        ' should be using the property key or keys to denote key codes or keys and not char codes or characters.');
                }
            }
        }

        /**
         * @name _onEvent
         * @memberof plat.controls.CharPress
         * @kind function
         * @access protected
         * 
         * @description
         * Matches the event's keyCode if necessary and then handles the event if 
         * a match is found or if there are no filter keyCodes.
         * 
         * @param {KeyboardEvent} ev The keyboard event object.
         * 
         * @returns {void}
         */
        protected _onEvent(ev: KeyboardEvent): void {
            var keyCodes = this.keyCodes,
                keyCode = ev.charCode || ev.which,
                isShifted: boolean,
                key: string;

            if (!keyCode) {
                key = ev.key;
                if (!key) {
                    return;
                }
            } else {
                key = String.fromCharCode(keyCode);
            }

            if (isEmpty(keyCodes) || keyCodes[key] === true) {
                super._onEvent(ev);
            }
        }

        /**
         * @name _compareKeys
         * @memberof plat.controls.CharPress
         * @kind function
         * @access protected
         * 
         * @description
         * Matches the event's keyCode if necessary.
         * 
         * @param {KeyboardEvent} ev The keyboard event object.
         * 
         * @returns {boolean} Whether or not there is a match.
         */
        protected _compareKeys(ev: KeyboardEvent): boolean {
            return true;
        }

        /**
         * @name _setKeyCodes
         * @memberof plat.controls.CharPress
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the defined key codes as they correspond to 
         * the {@link plat.controls.KeyCodes|KeyCodes} map.
         * 
         * @param {Array<string>} keys? The array of defined keys to satisfy the 
         * key press condition.
         * 
         * @returns {void}
         */
        protected _setKeyCodes(keys?: Array<string>): void {
            if (!isArray(keys)) {
                keys = [];
            }

            var length = keys.length,
                key: any,
                keyCodes = this.keyCodes,
                index: string;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                index = isNumber(key) ? String.fromCharCode(key) : key;
                keyCodes[index] = true;
            }
        }
    }

    register.control(__KeyDown, KeyDown);
    register.control(__KeyPress, KeyPress);
    register.control(__KeyUp, KeyUp);
    register.control(__CharPress, CharPress);
}
