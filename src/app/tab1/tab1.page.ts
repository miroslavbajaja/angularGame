import { Component } from '@angular/core';
import * as Phaser from 'phaser';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	//@ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
	@ViewChild('myCanvas', {static: false} ) myCanvas;

	constructor() {
		console.log(this.myCanvas);
	}

	ngAfterViewInit() {
		console.log(this.myCanvas);
	}

}
