module plat.storage {
    'use strict';

    /**
     * @name SessionStorage
     * @memberof plat.storage
     * @kind class
     * 
     * @extends {plat.storage.BaseStorage}
     * 
     * @description
     * A class for wrapping SessionStorage as an injectable.
     */
    export class SessionStorage extends BaseStorage {
        constructor() {
            super((<Window>plat.acquire(__Window)).sessionStorage);
        }
    }

    register.injectable(__SessionStorage, SessionStorage);
}
