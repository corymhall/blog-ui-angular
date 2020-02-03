import { NgModule }                                      from '@angular/core';
import { BrowserModule }                                 from '@angular/platform-browser';
import { FlexLayoutModule }                              from '@angular/flex-layout';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { JsonpModule }                       from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }                           from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as firebase from 'firebase/app';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';
import { HeaderComponent }       from './header/header.component';
import { PostsService }          from './posts/posts.service';
import { PostComponent }         from './posts/post.component';
import { TinyComponent }         from './tiny/tiny.component';
import { PostDetailComponent }   from './posts/post-detail.component';
import { FireBaseAuthComponent } from './auth/firebase-auth.component';
import { FirebaseAuthService }   from './auth/firebase-auth.service';
import { CreatePostComponent }   from './posts/create-post.component';
import { CommentsComponent }     from './comments/comments.component';
import { AddCommentComponent }   from './comments/add-comment.component';
import { SafePipe }              from './posts/post-text.pipe';
import { EmailOctopusComponent } from './octopus/email-octopus.component';
import { ToasterService }        from './toaster/toaster.service';
import { ToasterComponent }      from './toaster/toaster.component';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { ReplyComponent } from './reply/reply.component';
import { AddReplyComponent } from './reply/add-reply.component';
import { EditPostComponent } from './posts/edit-post.component';


const myFirebaseConfig = {
    apiKey: 'REPLACE_ME',
    authDomain: 'REPLACE_ME',
    databaseURL: 'REPLACE_ME',
    storageBucket: 'REPLACE_ME',
    messagingSenderId: 'REPLACE_ME'
};





@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
      //       MaterialModule,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
      MatMenuModule,
      MatSidenavModule,
MatToolbarModule,
MatListModule,
MatGridListModule,
MatCardModule,
MatIconModule,
MatSnackBarModule,
        HttpClientModule,
        JsonpModule,
        AngularFireModule.initializeApp(myFirebaseConfig),
        AngularFireAuthModule,
        FlexLayoutModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        PostComponent,
        TinyComponent,
        PostDetailComponent,
        FireBaseAuthComponent,
        CreatePostComponent,
        CommentsComponent,
        AddCommentComponent,
        SafePipe,
        EmailOctopusComponent,
        ToasterComponent,
        ReplyComponent,
        AddReplyComponent,
        EditPostComponent
    ],
    providers: [
        PostsService,
        FirebaseAuthService,
        ToasterService,
        GoogleAnalyticsEventsService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
