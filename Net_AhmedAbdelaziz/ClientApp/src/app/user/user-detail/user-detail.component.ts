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
    id:any;
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
        private router: Router) { }

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
            name: [this.user.name,[Validators.required, Validators.minLength(3)]],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(3)]],
            username: [this.user.username,[Validators.required, Validators.minLength(5)]],
            password: [this.user.password,[Validators.required, Validators.minLength(6)]],
            email: [this.user.email, [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            phoneNumber: [this.user.phoneNumber,Validators.pattern("^((\\+-?)|0)?[0-9]{10}$")],
        })
    }
    onSubmit() {
        if (this.newRecord) {
            // hit create api
            this._service.addUser(this.perpareUser()).subscribe(v => {
                this.router.navigateByUrl("/")
            });
        } else {
            // hit update api 
            this._service.UpdateUser({id:this.id,user:this.perpareUser()}).subscribe(v=>{
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