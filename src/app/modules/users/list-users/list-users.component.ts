import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../add-users/add-users.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent {
  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(AddUsersComponent, {
      centered: true,
      keyboard: false,
    });
  }
}
