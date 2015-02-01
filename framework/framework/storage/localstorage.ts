module plat.storage {
    'use strict';

    /**
     * @name LocalStorage
     * @memberof plat.storage
     * @kind class
     * 
     * @extends {plat.storage.BaseStorage}
     * @implements {plat.storage.LocalStorage}
     * 
     * @description
     * A class used to wrap HTML5 localStorage into an injectable.
     */
    export class LocalStorage extends BaseStorage {
        constructor() {
            super((<Window>plat.acquire(__Window)).localStorage);
        }
    }

    register.injectable(__LocalStorage, LocalStorage);
}
