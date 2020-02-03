import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './posts/post.component';
import { CreatePostComponent } from './posts/create-post.component';
import { PostDetailComponent } from './posts/post-detail.component';
import { FirebaseAuthService } from './auth/firebase-auth.service';
import { EmailOctopusComponent } from './octopus/email-octopus.component';
import { EditPostComponent } from './posts/edit-post.component';


const appRoutes: Routes = [
    { path: '', component: PostComponent },
    { path: 'subscribe', component: EmailOctopusComponent },
    { path: 'detail/:id', component: PostDetailComponent },
    { path: 'edit/:id', component: EditPostComponent, canActivate: [FirebaseAuthService] },
    { path: 'create', component: CreatePostComponent, canActivate: [FirebaseAuthService] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
