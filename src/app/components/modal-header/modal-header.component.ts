import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss',
})
export class ModalHeaderComponent {
  @Input() title: string;
  @Output() closeModals = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll();
  }
}
