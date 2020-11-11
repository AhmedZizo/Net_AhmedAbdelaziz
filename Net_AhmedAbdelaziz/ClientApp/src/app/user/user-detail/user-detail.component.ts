import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
    userForm: FormGroup;
    id: any;
    user: any = {
        name: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: ""

    };

    newRecord: boolean = true;
    constructor(
        private activatedRoute: ActivatedRoute,
        private _service: UserService,
        private _fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService) { }

    ngOnInit(): void {

        const routSub = this.activatedRoute.params.subscribe(params => {
            this.id = params && params['id'];
            this.newRecord = this.id === "new";
            if (!this.newRecord) {
                //get the user by id 
                this._service.getUserById(this.id).subscribe(v => {
                    this.user = v;
                    this.userForm.patchValue(this.user);

                })
            }
        })
        this.createForm();
    }
    createForm() {
        this.userForm = this._fb.group({
            name: [this.user.name, [Validators.required, Validators.pattern("^((\\+-?)|0)?[A-Za-z0-9]{3,12}$")]],
            lastName: [this.user.lastName, [Validators.required, Validators.pattern("^((\\+-?)|0)?[A-Za-z0-9]{3,12}$")]],
            username: [this.user.username, Validators.required],
            password: [this.user.password, this.newRecord ? [Validators.required, Validators.pattern("^((\\+-?)|0)?[A-Za-z0-9_$#]{6,50}$")] : []],
            email: [this.user.email, [Validators.required, Validators.email]],
            phoneNumber: [this.user.phoneNumber, [Validators.required,Validators.pattern("^((\\+-?)|0)?[0-9]{10}$")]],
        })
    }
    onSubmit() {
        debugger
        const controls = this.userForm.controls;
        /** check form */

        if (!this.userForm.valid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        const data = this.perpareUser();

        if (this.newRecord) {
            // hit create api
            this._service.addUser(data).subscribe(v => {
                this.toastr.success('Success ', 'create new user successfully');
                this.router.navigateByUrl("/")

            });
        } else {
            // hit update api 
            this._service.UpdateUser({ id: this.id, user: data }).subscribe(v => {
                debugger
                this.toastr.success('Success ', 'Update  user successfully');
                this.router.navigateByUrl("/")
            });
        }
    }
    perpareUser() {
        let user = {};
        const controls = this.userForm.controls;
        for (const key in controls) {
            user[key] = controls[key].value;
        }
        return user;
    }

}