module plat.controls {
    // Keyboard events
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

    export class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
        /**
         * An object keyed by keyCode with options as key values.
         */
        keyCodes: IObject<{ shifted?: boolean; }>;

        /**
         * Checks if the IKeyboardEventInput is an expression object 
         * and sets the necessary listener.
         */
        _setListener() {
            var attr = this.attribute;
            if (isEmpty(this.event) || isEmpty(attr)) {
                return;
            }

            var expression = this.attributes[attr].trim();
            
            if (expression[0] === '{') {
                var eventObject: IKeyboardEventInput = this.evaluateExpression(expression) ||
                    { method: '', key: null },
                    key = eventObject.key,
                    keys = eventObject.keys;

                this._parseArgs(eventObject.method);

                if (isNull(key) && isNull(keys)) {
                    this.attributes[attr] = eventObject.method;

                    this._setKeyCodes();
                    super._setListener();
                    return;
                }

                keys = isArray(keys) ? keys : [key];
                this._setKeyCodes(keys);
                this.addEventListener(this.element, this.event, this._listener, false);

                return;
            }

            this._setKeyCodes();
            super._setListener();
        }

        /**
         * Matches the event's keyCode if necessary and then handles the event if 
         * a match is found or if there are no filter keyCodes.
         * 
         * @param ev The keyboard event object.
         */
        _onEvent(ev: KeyboardEvent) {
            var keyCodes = this.keyCodes;

            if (isEmpty(keyCodes) || !isUndefined(keyCodes[ev.keyCode])) {
                super._onEvent(ev);
            }
        }

        /**
         * Sets the defined key codes as they correspond to 
         * the KeyCodes map.
         * 
         * @param keys The array of defined keys to satisfy the 
         * key press condition.
         */
        _setKeyCodes(keys: Array<string> = []) {
            var length = keys.length,
                key,
                keyCodes = this.keyCodes;

            if (!isArray(keyCodes)) {
                keyCodes = this.keyCodes = {};
            }

            for (var i = 0; i < length; ++i) {
                key = keys[i];

                keyCodes[isNumber(key) ? key : KeyCodes[key]] = {};
            }
        }
    }

    /**
     * Describes an attribute object that binds to specified key code scenarios.
     */
    export interface IKeyCodeEventControl extends ISimpleEventControl {
        /**
         * An object keyed by keyCode with options as key values.
         */
        keyCodes: IObject<{ shifted?: boolean; }>;
    }

    /**
     * The available options for plat.controls.KeyCodeEventControl.
     */
    export interface IKeyboardEventInput {
        /**
         * The method to call when the 
         * condition is satisfied.
         */
        method: string;

        /**
         * The key to satisfy the press 
         * condition. Can be specified 
         * either as a numeric key code 
         * or a string representation 
         * as seen by the KeyCodes mapping.
         */
        key?: string;

        /**
         * An optional array of keys 
         * if more than one key can 
         * satisfy the condition.
         */
        keys?: Array<string>;
    }

    export class KeyDown extends KeyCodeEventControl {
        /**
         * The event name.
         */
        event: string = 'keydown';
    }

    export class KeyPress extends KeyCodeEventControl {
        /**
         * The event name.
         */
        event: string = 'keydown';

        /**
         * Filters only 'printing keys' (a-z, 0-9, and special characters)
         * 
         * @param ev The keyboard event object.
         */
        _onEvent(ev: KeyboardEvent) {
            var keyCode = ev.keyCode;

            if ((keyCode >= 48 && keyCode <= 90) ||
                (keyCode >= 186) ||
                (keyCode >= 96 && keyCode <= 111)) {
                super._onEvent(ev);
            }
        }
    }

    export class KeyUp extends KeyCodeEventControl {
        /**
         * The event name.
         */
        event: string = 'keyup';
    }

    register.control('plat-keydown', KeyDown);
    register.control('plat-keypress', KeyPress);
    register.control('plat-keyup', KeyUp);
}
