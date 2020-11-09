import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './users.component.html',
  styleUrls:["./users.component.css"]
})
export class UsersComponent implements OnInit {
  
  users:any[]=[];
  title= 'toaster-not';
  constructor(private _userservice:UserService,
    private router: Router){

  }
  ngOnInit(): void {
    this.loadUsers();
    
  }

  deleteUser(id){
    this._userservice.deleteUserById(id).subscribe(v=>{
      this.loadUsers();

    })
  }
  loadUsers(){
    this._userservice.getUser().subscribe((e)=>{
      this.users=e;
    })
  }

  
}
