/// <reference path="../../references.d.ts" />

module app.viewcontrols {
    export class Two extends BaseViewControl {
        templateUrl = 'viewcontrols/two/two.viewcontrol.html';
        context = {};
        loaded() {
            this.head.title('Page Two');
            this.head.description('This is the second page');
        }
    }

    plat.register.viewControl('two', Two);
}
 