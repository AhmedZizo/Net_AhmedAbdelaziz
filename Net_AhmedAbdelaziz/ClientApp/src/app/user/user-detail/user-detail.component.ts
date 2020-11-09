import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls:["./user-detail.component.css"]
  })
export class UserDetailComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private _service: UserService,
        private router: Router) { }

    ngOnInit(): void {
        const routSub = this.activatedRoute.params.subscribe(params => {
            const id =params&& params['id'];
            console.log(id)
        }
        )
    }

}