import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-store-modal',
  templateUrl: './add-store-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-store-modal.component.scss',
    '../store-wizard.component.scss',
    '../../../pricing-wizard/pricing-wizard.component.scss'
  ]
})
export class AddStoreModalComponent implements OnInit {

  closeResult: string;
  regions = [
    { id: 1, name: 'All regions' },
    { id: 2, name: 'Asia' },
    { id: 3, name: 'Europe' },
    { id: 4, name: 'Asia' },
    { id: 5, name: 'US/Canada' },
    { id: 6, name: 'South America' },
    { id: 7, name: 'Africa' },
    { id: 8, name: 'Australia' },
  ];

  selectedRegion = this.regions[0];

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

  RowSelected() {
    alert('row');
  }

  onSelectRegion(region: any) {
    this.selectedRegion = region;
  }
}
