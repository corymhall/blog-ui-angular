import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Posts } from './posts';
import { UploadService } from '../services/upload.service';
import { PostsService } from './posts.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { TinyComponent } from '../tiny/tiny.component';
import { FirebaseAuthService } from '../auth/firebase-auth.service';

declare var tinymce: any;


@Component({
    selector: 'app-create-posts',
    templateUrl: './create-post.component.html',
    providers: [UploadService, PostsService, UserService]

})

export class CreatePostComponent  implements OnInit {

    errorMessage: string;
    newPost: Posts[] = [];
    user: User[];
    mode = 'Observable';
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();



    form: FormGroup;

    constructor(private fb: FormBuilder, private uploadService: UploadService, private postsService: PostsService, private router: Router,
        private route: ActivatedRoute, private userService: UserService, public afService: FirebaseAuthService ) {
        this.createForm();
        // console.log(afService.authState);
    }

    createForm() {
        this.form = this.fb.group({
            title: ['', Validators.required],
            postText: '',
            imageLocation: new FormControl({ value: '', disabled: true }, Validators.required),
            homeText: ['', Validators.required]
        });
    }

    onChange(event: any) {
        console.log(event.srcElement.files[0]);
        this.uploadService.fileUpload(event.srcElement.files).subscribe(posts => {
            // console.log('sent');
            // console.log(posts);
            this.form.patchValue({ imageLocation: posts.location });
        });
    }


    addPosts(post: Posts) {
        if (!post.title || !post.post_text || !post.home_text) { console.log('no data'); return; }
        this.postsService.create(post)
            .subscribe(
            error => this.errorMessage = <any>error);
        this.router.navigate(['']);
    }

    getUser(id: string) {
        this.userService.getUser(id)
            .subscribe(
            user => this.user = user,
            error => this.errorMessage = <any>error);
    }


    keyupHandlerFunction($event) {

    }


    onSubmit() {

      const user = new User(
        this.afService.authState.uid,
        'Pleasant Places',
        this.afService.authState.photoURL,
        '',
        '',
        '',
      );
        this.form.patchValue({ postText: tinymce.activeEditor.getContent() });
        const newPost = new Posts(
          user,
          this.form.get('id').value,
          this.form.get('post_text').value,
          '',
          'Pleasant Places',
          this.form.get('title').value,
          this.form.get('image_location').value,
          this.form.get('home_text').value,
        );
        this.addPosts(newPost);
    }


    ngOnInit() {
        // console.log(this.afService.authState);
        const id = this.afService.authState.uid;
        this.getUser(id);
    }

}
