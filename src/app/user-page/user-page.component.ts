import { Component, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userobj: any[] =[];
  retriveObj: [] = [];

  //search
  searchTerm: string = '';
  filterData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;


  faSave = faSave;
  allRoles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Viewer' },
    { id: 3, name: 'Editor' },
  ];
  allAccess = [
    { id: 1, name: 'View' },
    { id: 2, name: 'Edit' },
    { id: 3, name: 'Delete' },
    { id: 4, name: 'Create' },
  ];

  UserData: any = {
    UserID: '',
    Username: '',
    Email: '',
    Roles: [],
    Permissions: [{
      Module: '',
      Access: [],
    }],

  }

  tableArray: any[] = [];



  constructor() { }

  ngOnInit(): void {
    this.loadlocalstorage();


  }

  clearForm(UserForm: any) {
    UserForm.resetForm();
  }


  onSubmit(UserForm: any) {
    console.log(UserForm);
    if (UserForm.valid) {
      console.log(this.UserData.UserID);
      console.log(this.UserData.Username);
      console.log(this.UserData.Email);
      console.log(this.UserData.Roles);

      this.userobj.push({
         "UserID": this.UserData.UserID,
        "Username": this.UserData.Username,
        "Email": this.UserData.Email,
        "Roles": this.UserData.Roles,
        "Module": this.UserData.Permissions.Module,
        "Access": this.UserData.Permissions.Access,
      })

      this.tableArray.push({
        "UserID": this.UserData.UserID,
        "Username": this.UserData.Username,
        "Email": this.UserData.Email,
        "Roles": this.UserData.Roles,
        "Module": this.UserData.Permissions.Module,
        "Access": this.UserData.Permissions.Access,
      })

      console.log(this.tableArray);
      this.filterData = [...this.tableArray];



      console.log({
        "UserID": this.UserData.UserID,
        "UserName": this.UserData.Username,
        "Email": this.UserData.Email,
        "Roles": this.UserData.Roles,
        "Permission": {
          "Module": this.UserData.Permissions.Module,
          "Access": this.UserData.Permissions.Access,
        }
      });
      //store local storage
      const userdata = JSON.stringify(this.userobj);
      localStorage.setItem('Table Data', userdata);
      console.log(userdata);



      console.log(this.UserData);
    }
    UserForm.resetForm();
  }
  applyfilter() {
    if (!this.searchTerm) {
      this.filterData = [...this.userobj];
    } else {

      this.filterData = this.userobj.filter(item =>
        item.UserID.includes(this.searchTerm) ||
        item.Username.includes(this.searchTerm) ||
        item.Email.includes(this.searchTerm) ||
        item.Module.includes(this.searchTerm)
      );
      // console.log(this.searchTerm, 'searchterm');
      // console.log(this.filterData, 'filter');
      // console.log(this.tableArray, 'table');
      // console.log(this.UserData, 'user');


    }
  }



  loadlocalstorage() {
  const retrivedata = localStorage.getItem('Table Data');
  if (retrivedata) {
    this.userobj = JSON.parse(retrivedata);
    this.tableArray = [...this.userobj];      
    this.filterData = [...this.userobj];      
  } else {
    console.log('NoData');
  }
}








}
