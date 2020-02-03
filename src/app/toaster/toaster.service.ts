import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ToasterComponent } from './toaster.component';
import { Subject} from 'rxjs';

@Injectable()
export class ToasterService {

    public subj_notification: Subject<string> = new Subject();

    constructor(public snackBar: MatSnackBar, public toasterComponent: MatSnackBar) {
    }

    showToaster(message:string) {
        this.snackBar.open(message, null, {
            duration: 3000,
        });
    }
}
