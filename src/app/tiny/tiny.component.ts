import { Component, Input, OnDestroy, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { environment } from '../../environments/environment';

import { UploadService } from '../services/upload.service';

declare var tinymce: any;

@Component({
  selector: 'tiny-editor',
  templateUrl: './tiny.component.html',
  providers: [ UploadService ]
})

export class TinyComponent implements AfterViewInit, OnDestroy {

  editor: any;

  @Input() group: FormGroup;
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  constructor(private uploadService: UploadService) {
    
  }






  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height: "300",
      theme: "modern",
      skin_url: 'assets/lightgray',
      plugins: ['link paste autolink image imagetools insertdatetime lists preview textcolor code media'],
      menubar: ['insert view edit tools'],
      toolbar: ['code undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent image insertdatetime link paste preview forecolor backcolor'],
      paste_data_images: true,
      //image_title: true,
      //images_upload_url: "http://localhost:5000/posts/fileupload",
      images_upload_url: environment.API_URL + '/api/posts/fileupload',
      automatic_uploads: true,
      setup: (editor:any) => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
          //this.form.setValue({postText: tinymce.activeEditor.getContent()});
        })
      }

    });
  }



  ngOnDestroy() {
    tinymce.remove(this.editor);
  }


}
