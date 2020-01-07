import { Component } from '@angular/core';
import * as Phaser from 'phaser';
import { ViewChild, ElementRef } from '@angular/core';
import { IonItem } from '@ionic/angular';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

	parent: any;
	@ViewChild('canvasBackground', {static: false} ) background: any;

	CANVAS_HEIGHT:number = 1920;
	CANVAS_WIDTH:number = 1080;

	isPlayed: boolean = false;

	game: Phaser.Game;

	constructor() {}

	ngAfterViewInit() {
		this.parent = this.background.nativeElement;
		this.prepareCanvas();
	}

	prepareCanvas()
	{
		var config: Phaser.Types.Core.GameConfig = {
			type: Phaser.WEBGL,
			width: this.CANVAS_WIDTH,
			height: this.CANVAS_HEIGHT,
			backgroundColor: '#2d2d2d',
			parent: this.parent,
			scene: {
				init: init,
				preload: preload,
				create: create,
				update: update,
				extend: {
					tab: this,
					res: {
						width: this.CANVAS_WIDTH,
						height: this.CANVAS_HEIGHT
					}
				}
			}
		};

		this.game = new Phaser.Game(config);
	}

	play()
	{
		if(this.isPlayed) return;
		this.isPlayed = true;
		console.log(this);
	}


}

function init()
{
	var canvas = this.game.canvas;
	
	var scale:number, top:number, left:number;
    scale = window.innerWidth / this.res.width;
    top = -((this.res.height - window.innerHeight) / 2);
	left = -((this.res.width - window.innerWidth) / 2);
	
	canvas.style.position = 'absolute';
	canvas.style.transform = 'scale(' + scale + ')';
	canvas.style.width = this.res.width + 'px';
	canvas.style.height = this.res.height + 'px';
	canvas.style.top = (top - 73) + 'px';
	canvas.style.left = left + 'px';
}

function preload()
{
	this.load.setPath('assets');

	this.load.multiatlas('images', 'images.json');
	this.load.image('cloud', 'cloud1.png');
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

	var coin = this.add.sprite(400, 300, 'images').play('coin').setInteractive();
	coin.on('pointerdown', function(pointer, gameObject){
		console.log(this);
	});

	//this.add.image(400, 600, 'cloud').setOrigin(0).setInteractive();

	//this.input.on('gameobjectdown', function (pointer, gameObject) {
		//console.log(gameObject);
	//}, this);

	/*
    this.tweens.add({
        targets: gameObject,
        alpha: 0,
        scaleX: 0,
        scaleY: 0
	});
    gameObject.disableInteractive();
	*/
}

function update()
{

}
