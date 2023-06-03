import { Component } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  pageNumber: any;
  constructor(private translateService: TranslateService) {
    this.fetchData(1);
  }
  show_success: boolean = false;
  show_fail: boolean = false;
  show_cancel: boolean = false;
  success_message_text: string = '';
  fail_message_text: string = '';
  cancel_message_text: string = '';

  users: any[] = []; // Assuming the fetched data is an array

  // Assume you have a method that fetches the data from the API
  fetchData(nbr: number = 1) {
    this.pageNumber = nbr;

    fetch(`${environment.apiLink}/users?page=${this.pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        this.users = data.data; // Assign the fetched data to the component property
        console.log(this.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteUser(id: string) {
    const confirmation_message = this.translateService.instant('confirmation');
    let user_input = window.confirm(confirmation_message);

    if (user_input) {
      fetch(`${environment.apiLink}/users/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('User deleted successfully');
            this.show_success = true;
            this.success_message_text = 'success';
            NgbAlert;
          } else {
            console.error('Failed to delete user');
            this.show_fail = true;
            this.fail_message_text = 'fail';
          }
        })
        .catch((error) => {
          console.error('Error occurred while deleting user:', error);
          this.show_fail = true;
          this.fail_message_text =
            'Error occurred while deleting user: ' + error;
        });
    } else {
      const cancel_message = this.translateService.instant('cancel');
      this.show_cancel = true;
      this.cancel_message_text = 'cancel';
    }
  }

  refresh_users(pageNumber: number) {
    this.fetchData(pageNumber);
  }

  success_closed() {
    this.show_success = false;
  }

  fail_closed() {
    this.show_fail = false;
  }

  cancel_closed() {
    this.show_cancel = false;
  }
}
