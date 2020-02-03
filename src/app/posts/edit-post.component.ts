import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Posts } from './posts';
import { UploadService } from '../services/upload.service';
import { PostsService } from './posts.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { TinyComponent } from '../tiny/tiny.component';
import { FirebaseAuthService } from '../auth/firebase-auth.service';

declare var tinymce: any;


@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    providers: [UploadService, PostsService, UserService]

})

export class EditPostComponent implements OnInit {

    errorMessage: string;
    newPost: Posts[] = [];
    post: Posts;
    post$: Observable<Posts>;
    user: User[];
    mode = 'Observable';
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();



    form: FormGroup;

    constructor(private fb: FormBuilder, private uploadService: UploadService, private postsService: PostsService, private router: Router,
        private route: ActivatedRoute, private userService: UserService, public afService: FirebaseAuthService) {
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
            this.form.patchValue({ image_ocation: posts.location });
        });
    }


    updatePost(post: Posts) {
        if (!post.title || !post.post_text || !post.home_text) { console.log('no data'); return; }
        this.postsService.update(post)
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

    initForm() {
        this.form.patchValue(
          { post_text: this.post.post_text,
            title: this.post.title, image_location: this.post.image_location, homeText: this.post.home_text });
        tinymce.activeEditor.setContent(this.post.post_text);
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
        this.updatePost(newPost);
        // console.log(id, title.value, postText.value, imageLocation.value, homeText.value);
    }


    ngOnInit() {

        const id = this.afService.authState.uid;
        this.getUser(id);
        // console.log(this.afService.authState);
        this.post$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.postsService.getPost(params.get('id'))
            )
        );
        this.initForm();
    }
}
