import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  switchbuttons() {
    const home = document.getElementById('home');
    const manage = document.getElementById('manage');
  }

  toggle(event: any) {
    const button = event.currentTarget;
    const btns = document.querySelectorAll('.panel button');
    // const home = document.getElementById('home');
    // const manage = document.getElementById('manage');

    if (!button.classList.contains('active-btn')) {
      btns.forEach((btn) => {
        btn.classList.toggle('active-btn');
      });
    }

    // if (!home?.classList.contains('active')) {
    //   manage?.classList.toggle('active');
    // }

    // home?.classList.toggle('active');
  }
}
