module plat.processing {
    export class AttributeManager {
        static getInstance() {
            var manager = new AttributeManager();
            manager._NodeManager = <INodeManagerStatic>acquire(__NodeManagerStatic);
            manager._markupRegex = (<expressions.Regex>acquire(__Regex)).markupRegex;
            return manager;
        }

        protected _NodeManager: INodeManagerStatic;
        protected _markupRegex: RegExp;

        element: HTMLElement;
        node: INode;
        parent: ui.TemplateControl;
        controls: Array<Control>;
        replace: boolean;
        attributeChanged: () => void;
        bindingExpressions: Array<expressions.IParsedExpression>;
        lastClasses: IObject<boolean> = {};

        initialize(element: Element, node: INode, parent: ui.TemplateControl, controls: Array<Control>, replace?: boolean): void {
            this.element = <HTMLElement>element;
            this.node = node;
            this.parent = parent;
            this.controls = controls;
            this.replace = replace;
            
            if (node.nodeName !== 'class') {
                this.attributeChanged = this.anyAttributeChanged;
            } else {
                this.attributeChanged = this.classAttributeChanged;
                this.bindingExpressions = this.getBindingExpressions(node.expressions);
            }
        }

        getBindingExpressions(expressions: Array<expressions.IParsedExpression>) {
            return filter((expression: expressions.IParsedExpression) => {
                return expression.identifiers.length > 0 || expression.aliases.length > 0 || expression.expression.trim() === '';
            }, expressions);
        }

        classAttributeChanged(): void {
            var node = this.node,
                attr: Attr = <Attr>node.node,
                value = this._NodeManager.build(this.bindingExpressions, this.parent),
                classes = value.split(/\s/),
                last = this.lastClasses,
                element: HTMLElement = this.element,
                c: string,
                length: number,
                i: number;

            if (this._NodeManager.hasMarkup(attr.nodeValue)) {
                attr.nodeValue = attr.nodeValue.replace(this._markupRegex, '');
            }

            length = classes.length;

            for (i = 0; i < length; ++i) {
                last[classes[i]] = true;
            }

            classes = Object.keys(last);
            length = classes.length;

            for (i = 0; i < length; ++i) {
                c = classes[i];
                if (last[c]) {
                    addClass(element, c);
                    last[c] = false;
                } else {
                    deleteProperty(last, c);
                    removeClass(element, c);
                }
            }

            value = attr.nodeValue;

            this.notifyAttributes(node.nodeName, value);
        }

        anyAttributeChanged(): void {
            var controls = this.controls,
                node = this.node,
                length = controls.length,
                key = camelCase(node.nodeName),
                value = this._NodeManager.build(node.expressions, this.parent),
                attributes: ui.Attributes;

            this.notifyAttributes(key, value);

            if (!this.replace) {
                node.node.nodeValue = value;
            }
        }

        notifyAttributes(key: string, value: any): void {
            var controls = this.controls,
                length = controls.length,
                attributes: ui.Attributes,
                oldValue: any;

            for (var i = 0; i < length; ++i) {
                attributes = <ui.Attributes>controls[i].attributes;
                oldValue = attributes[key];
                attributes[key] = value;

                (<any>attributes)._attributeChanged(key, value, oldValue);
            }
        }
    }
}
