module app.viewcontrols {
    export class Two extends plat.ui.ViewControl {
        templateUrl = 'viewcontrols/two/two.viewcontrol.html';
        context = {};
    }

    plat.register.viewControl('two', Two);
}
 