module plat.controls {
    export class Options extends ObservableAttributeControl {
        /**
         * The property to set on the associated template control.
         */
        property: string = 'options';
    }

    register.control('plat-options', Options);
}
