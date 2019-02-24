import { Component } from '@angular/core';

enum Plan {
  Annual = 0,
  Monthly = 1
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'mcartpricing';
  selectedPlan: Plan = Plan.Annual;
  annualStyle = { 'background-color': '#94ded8', 'color': '#fff' };
  monthlyStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };

  onClickPlan(val: number) {
    if (val === Plan.Annual) {
      this.annualStyle = {
        'background-color': '#94ded8', 'color': '#fff'
      };
      this.monthlyStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
    } else if (val === Plan.Monthly) {
      this.annualStyle = { 'background-color': '#f6f6f6', 'color': '#515151' };
      this.monthlyStyle = { 'background-color': '#94ded8', 'color': '#fff' };
    }
  }

  getTotalProfit(){
    return 'TBD';
  }

  getPriceRange(){
    return 'TBD';
  }
  
}
