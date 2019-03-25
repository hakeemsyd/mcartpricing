import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

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

  constructor(private modalService: NgbModal,
    public dialogRef: MatDialogRef<CategoryDialogComponent>) { }

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

  close() {
    this.dialogRef.close();
  }

  onSelectRegion(region: any) {
    this.selectedRegion = region;
  }

}
