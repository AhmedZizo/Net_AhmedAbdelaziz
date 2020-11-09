import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
  users:any[]=[];
  constructor(private _service:UserService,
    private router: Router,
    ){

  }
  ngOnInit(): void {
    this._service.getUser().subscribe((e)=>{
      this.users=e;
    })
  }
}
