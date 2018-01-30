/* tslint:disable:all */
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: {
        '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: string;
    navigatedTo: string = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}
/* tslint:enable:all */
