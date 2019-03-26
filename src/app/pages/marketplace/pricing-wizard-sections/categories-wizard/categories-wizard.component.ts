import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PricingWizardManagerService } from '../../marketplace.service';

@Component({
  selector: 'app-categories-wizard',
  templateUrl: './categories-wizard.component.html',
  styleUrls: ['./categories-wizard.component.scss',
    '../../pricing-wizard/pricing-wizard.component.scss']
})
export class CategoriesWizardComponent implements OnInit {

  @Input() parentForm: FormGroup;

  categories = [
    { id: 100, name: 'Athleta' },
    { id: 200, name: 'Banana Republic' },
    { id: 300, name: 'Bergdorf Goodman' },
    { id: 400, name: 'Betsey Johnson' },
    { id: 500, name: 'Bloomingdale\'s' },
  ];

  selectAllCategoriesChecked: boolean = false;
  selectAllSuggestedCategoriesChecked: boolean = false;

  suggestedCategories = [
    { id: 100, name: 'Kids' },
    { id: 101, name: 'Women' },

  ];

  categoriesListWCheck = [];
  suggestedCategoriesListWCheck = [];

  imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  @Input() currStepNumber = 1;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
    private pricingWizardManagerService: PricingWizardManagerService) {

    this.categories.forEach(item => {
      this.categoriesListWCheck.push({ ...item, isChecked: false as boolean });
    });
    this.suggestedCategories.forEach(item => {
      this.suggestedCategoriesListWCheck.push({ ...item, isChecked: false as boolean });
    });
  }

  addCategory() { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(CategoryDialogComponent, dialogConfig);
  }

  submitCategories() {
    let checkedValues = [];
    this.categoriesListWCheck.forEach(item => {
      if (item.isChecked === true) {
        checkedValues.push(item);
      }
    });
    this.suggestedCategoriesListWCheck.forEach(item => {
      if (item.isChecked === true) {
        checkedValues.push(item);
      }
    });
    this.pricingWizardManagerService.selectedCategories.setValue(checkedValues);
  }

  onTriggerSelectAllCategories() {
    this.selectAllCategoriesChecked = this.categoriesListWCheck.every(function (item: any) {
      return item.isChecked === true;
    });

    for (let i = 0; i < this.categoriesListWCheck.length; i++) {
      this.categoriesListWCheck[i].isChecked = !this.selectAllCategoriesChecked;
    }

    this.selectAllCategoriesChecked = !this.selectAllCategoriesChecked;
  }
  onTriggerSelectAllSuggestedCategories() {
    this.selectAllSuggestedCategoriesChecked = this.suggestedCategoriesListWCheck.every(function (item: any) {
      return item.isChecked === true;
    });

    for (let i = 0; i < this.suggestedCategoriesListWCheck.length; i++) {
      this.suggestedCategoriesListWCheck[i].isChecked = !this.selectAllSuggestedCategoriesChecked;
    }
    this.selectAllSuggestedCategoriesChecked = !this.selectAllSuggestedCategoriesChecked;
  }
}
