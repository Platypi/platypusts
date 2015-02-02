module app.viewcontrols {
    export class One extends BaseViewControl {
        templateUrl = 'viewcontrols/one/one.viewcontrol.html';
        context = {};
        loaded() {
            this.head.title('Page One');
            this.head.description('This is the first page');
        }
    }

    plat.register.viewControl('one', One);
}
