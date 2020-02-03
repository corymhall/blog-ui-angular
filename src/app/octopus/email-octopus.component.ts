import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';

import { EmailOctopusService } from './email-octopus.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
    selector: 'email-octopus',
    templateUrl: './email-octopus.component.html',
    providers: [EmailOctopusService]
})

export class EmailOctopusComponent implements OnInit {

    form: FormGroup;
    errorMessage: string;

    constructor(private fb: FormBuilder, 
        private router: Router, private emailOctopusService: EmailOctopusService, private route: ActivatedRoute,
        private toasterService: ToasterService) {
        this.createForm()
        
        //console.log(afService.authState);


    }

    createForm() {
        this.form = this.fb.group({
            emailAddress: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ''
        });
    }

    subscribe(api_key:string, email_address:string, first_name: string, last_name: string) {
        if (!email_address ) { console.log("no data"); return; }
        this.emailOctopusService.subscribe(api_key, email_address, first_name, last_name)
            .subscribe(
                status => {
                    this.toasterService.subj_notification.next("Subscribed Successfully");
                },
                error => {
                    //console.log("Failed");
                    this.toasterService.subj_notification.next("Subscribed Successfully");
                    this.errorMessage = <any>error;});
        this.router.navigate(['']);
    }

    onSubmit() {

        
        let emailAddress = this.form.get('emailAddress');
        let firstName = this.form.get('firstName');
        let lastName = this.form.get('lastName');
        let successRedirectUrl = this.form.get('successRedirectUrl');
        let apiKey = 'REPLACE_ME'
        let subscribed = true
        this.subscribe("REPLACE_ME", emailAddress.value, firstName.value, lastName.value);
    }

    ngOnInit() {


    }
}
