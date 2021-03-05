import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-forgot-passwerd',
  templateUrl: './forgot-passwerd.component.html',
  styleUrls: ['./forgot-passwerd.component.css']
})
export class ForgotPasswerdComponent implements OnInit {

  forgetPasswerdForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
  }

  ngOnInit() {
    this.forgetPasswerdForm = this.formBuilder.group({
      email: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

    // convenience getter for easy access to form fields
    get f() { return this.forgetPasswerdForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetPasswerdForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.forgotPasswerd(this.f.email.value)
        .subscribe((response) => {
          if (response) {
                    this.message = 'Email Sent Successfully';
                    this.router.navigate(['/login'])
                  } else {
                    this.message = 'Email Not Sent';
                  }
        },
            error => {
                this.loading = false;
            });
}

}
