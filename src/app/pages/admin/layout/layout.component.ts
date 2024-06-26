import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule,],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  searchTxt: string = '';

 // constructor(private loginSrv: LoginService) { }

  onFilter() {
  //  this.loginSrv.searchBox.next(this.searchTxt);
  }

  onInput(event: any) {
    if (event.target.value.trim() === '') {
      this.onFilter();
    }
  }

}