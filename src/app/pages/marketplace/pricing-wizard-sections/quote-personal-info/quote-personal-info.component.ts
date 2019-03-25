import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-personal-info',
  templateUrl: './quote-personal-info.component.html',
  styleUrls: ['./quote-personal-info.component.scss']
})
export class QuotePersonalInfoComponent implements OnInit {

  @Input() parentForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      companyName: ['',],
      teleNum: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      website: ['',],
      referredBy: [''],
      comments: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)');
  }

  getFullName(): String {
    return this.registerForm.controls['fullName'].value;
  }


  getCompanyName(): String {
    return this.registerForm.controls['companyName'].value;
  }

  getTeleNum(): String {
    return this.registerForm.controls['teleNum'].value;
  }

  getEmail(): String {
    return this.registerForm.controls['email'].value;
  }

  getWebsite(): String {
    return this.registerForm.controls['website'].value;
  }

  getRefferedBy(): String {
    return this.registerForm.controls['referredBy'].value;
  }

  getComments(): String {
    return this.registerForm.controls['comments'].value;
  }

  onSubmitPersnalInfo() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    (<FormGroup>this.parentForm.controls['personalInfo']).controls['fullName'].patchValue(this.getFullName());
    (<FormGroup>this.parentForm.controls['personalInfo']).controls['companyName'].patchValue(this.getCompanyName());
    (<FormGroup>this.parentForm.controls['personalInfo']).controls['teleNum'].patchValue(this.getTeleNum());
    (<FormGroup>this.parentForm.controls['personalInfo']).controls['email'].patchValue(this.getEmail());
    (<FormGroup>this.parentForm.controls['personalInfo']).controls['website'].patchValue(this.getWebsite());
    (<FormGroup>this.parentForm.controls['personalInfo']).controls['referredBy'].patchValue(this.getRefferedBy());
    (<FormGroup>this.parentForm.controls['personalInfo']).controls['comments'].patchValue(this.getComments());
  }

  hasError(isError) {

  }

  outputNumber(value) {

  }

  onCountryChange() {

  }

  telInputObject(obj) {
    console.log(obj);
    obj.intlTelInput('setCountry', 'in');
  }
}
