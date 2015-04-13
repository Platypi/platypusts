module app.viewcontrols {
    export class ErrorViewControl extends BaseViewControl {
        templateUrl = 'viewcontrols/error/error.viewcontrol.html';
        context = {};
    }

    plat.register.viewControl('error', ErrorViewControl);
}
 