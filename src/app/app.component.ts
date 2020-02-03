import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HeaderComponent } from './header/header.component';
import { ToasterService } from './toaster/toaster.service';

declare let ga: Function;

import 'tinymce';
import 'tinymce/themes/modern';

import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/imagetools/plugin';
import 'tinymce/plugins/insertdatetime/plugin';
import 'tinymce/plugins/lists/plugin';
//import 'tinymce/plugins/powerpaste/plugin';
import 'tinymce/plugins/preview/plugin';
import 'tinymce/plugins/textcolor/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/media/plugin';
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/skins/lightgray/content.min.css';

// Core - these two are required :-)
declare var tinymce: any;

import 'hammerjs';

import '../theme.scss';
//import '../main.scss';
import '../styles.css';





@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'Sarah\'s Blog';

    constructor(private toasterService: ToasterService, public router: Router) {
        this.toasterService.subj_notification.subscribe(message => {
            this.toasterService.showToaster(message);
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    /*constructor(private afService: FirebaseAuthService) { }*/

}
