module plat.processing {
    export class AttributeManager {
        static getInstance() {
            return new AttributeManager();
        }

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
                this.attributeChanged = this.attributeChanged2.bind(this);
            } else {
                this.bindingExpressions = this.getBindingExpressions(node.expressions);
                var first = true;
                this.attributeChanged = this.classAttributeChanged.bind(this);
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
                value = NodeManager.build(this.bindingExpressions, this.parent),
                classes = value.split(/\s/),
                last = this.lastClasses,
                element: HTMLElement = this.element;

            if (NodeManager.hasMarkup(attr.nodeValue)) {
                attr.nodeValue = attr.nodeValue.replace((<any>NodeManager)._markupRegex, '');
            }

            forEach((c: string) => {
                last[c] = true;
            }, classes);

            forEach((keep: boolean, c: string) => {
                if (keep) {
                    addClass(element, c);
                    last[c] = false;
                } else {
                    deleteProperty(last, c);
                    removeClass(element, c);
                }
            }, last);

            value = attr.nodeValue;

            this.notifyAttributes(node.nodeName, value);
        }

        attributeChanged2(): void {
            var controls = this.controls,
                node = this.node,
                length = controls.length,
                key = camelCase(node.nodeName),
                value = NodeManager.build(node.expressions, this.parent),
                attributes: ui.Attributes;

            this.notifyAttributes(key, value);

            if (!this.replace) {
                node.node.nodeValue = value;
            }
        }

        notifyAttributes(key: string, value: any) {
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
