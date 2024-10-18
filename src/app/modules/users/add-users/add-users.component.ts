import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss',
})
export class AddUsersComponent {
  constructor(private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll();
  }
}
