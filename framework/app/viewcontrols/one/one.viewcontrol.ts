module app.viewcontrols {
    export class One extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/one/one.viewcontrol.html';
        context = {};
    }

    plat.register.viewControl('one', One);
}
