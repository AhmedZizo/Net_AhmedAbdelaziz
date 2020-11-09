import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
    userForm: FormGroup;
    user: any = {
        // name: "",
        email: "",
        password: "",
        lastName: "",
        phoneNumber: "",
        username: ""

    };

    newRecord: boolean = true;
    constructor(
        private activatedRoute: ActivatedRoute,
        private _service: UserService,
        private _fb: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        const routSub = this.activatedRoute.params.subscribe(params => {
            const id = params && params['id'];
            this.newRecord = id === "new";
            if (!this.newRecord) {
                //get the user by id 
                this._service.getUserById(id).subscribe(v => {
                    this.user = v;
                    this.userForm.patchValue(this.user);

                })
            }
        })
        this.createForm();
    }
    createForm() {
        this.userForm = this._fb.group({
            name: [this.user.name],
            email: [this.user.email],
            password: [this.user.password],
            lastName: [this.user.lastName],
            phoneNumber: [this.user.phoneNumber],
            username: [this.user.username],
        })
    }
    onSubmit() {
        if (this.newRecord) {
            // hit create api
            this._service.addUser(this.perpareUser()).subscribe(v => {
                console.log(v)
            });
        } else {
            // hit update api 
        }
    }
    perpareUser() {
        debugger
        let user = {};
        const controls = this.userForm.controls;
        for (const key in controls) {
            user[key] = controls[key].value;
        }
        return user;
    }

}