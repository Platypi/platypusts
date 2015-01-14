module app.viewcontrols {
    export class One extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/one/one.viewcontrol.html';
        context = {};

        navigatedTo() {
            return plat.async.Promise.reject('test');
        }
    }

    plat.register.viewControl('one', One);
}
