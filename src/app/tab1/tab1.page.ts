import { Component } from '@angular/core';
import * as Phaser from 'phaser';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

	canvas: any;
	@ViewChild('myCanvas', {static: false} ) myCanvas: any;
	//background: any;
	//@ViewChild('canvasBackground', {static: false} ) canvasBackground: any;

	constructor() {}

	ngAfterViewInit() {
		this.canvas = this.myCanvas.nativeElement;
		//this.background = this.canvasBackground.nativeElement;
		this.prepareCanvas();
	}

	prepareCanvas()
	{
		var CANVAS_HEIGHT:number = 1920;
		var CANVAS_WIDTH:number = 1080;
		var config: Phaser.Types.Core.GameConfig = {
			type: Phaser.WEBGL,
			width: CANVAS_WIDTH,
			height: CANVAS_HEIGHT,
			backgroundColor: '#2d2d2d',
			canvas: this.canvas,
			scene: {
				preload: preload,
				create: create,
				update: update
			}
		};
		var game: Phaser.Game = new Phaser.Game(config);

		var scale:number, top:number, left:number;
        scale = window.innerWidth / CANVAS_WIDTH;
        top = -((CANVAS_HEIGHT - window.innerHeight) / 2);
		left = -((CANVAS_WIDTH - window.innerWidth) / 2);
		
		this.canvas.style.transform = 'scale(' + scale + ')';
		this.canvas.style.width = CANVAS_WIDTH + 'px';
		this.canvas.style.height = CANVAS_HEIGHT + 'px';
		this.canvas.style.top = (top - 73) + 'px';
		this.canvas.style.left = left + 'px';

		//this.background.style.backgroundColor = '#2d2d2d';
		//this.background.style.width = '100%';
		//this.background.style.height = '100%';
	}
}

function preload()
{
	this.load.setPath('assets');

	this.load.multiatlas('images', 'images.json');
}

function create()
{
	var frames = this.anims.generateFrameNames('images', {
		prefix: 'coin_',
		end: 60,
		zeroPad: 2,
		suffix: '.png'
	});
	
	this.anims.create({
		key: 'coin',
		frames: frames,
		repeat: -1 
	});

	var coin = this.add.sprite(400, 300, 'images').play('coin').setActive(false);
	coin.setInteractive();
	coin.on('pointerclick', function(){
		console.log('click');
	});
}

function update()
{

}
