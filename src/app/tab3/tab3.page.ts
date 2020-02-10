import { Component } from '@angular/core';

import { global } from '../app.module';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  soundEnabled(e): void {
    var isChecked = e.currentTarget.checked;
    global.sound = !isChecked;
  }

}
