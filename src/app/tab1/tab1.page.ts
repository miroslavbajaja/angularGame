import { Component } from '@angular/core';
import * as Phaser from 'phaser';
import { ViewChild, ElementRef } from '@angular/core';
import { IonItem } from '@ionic/angular';
import { global } from '../app.module';

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
		var scene = this.game.scene.getScene('default');
		play.call(scene);
	}
}

var coinDropDuration = 2000;

function play()
{
	coinDropDuration = 2000;
	this.score = 0;
	this.scoreboard.setText('Score: 0');
	this.gameOverBoard.setVisible(false);
	throwCoin.call(this);
}

function throwCoin()
{
	var self = this;
	var coins = this.coins, coin:any;
	for(var i = 0, l = coins.length; i < l; i++)
	{
		if(!coins[i].active)
		{
			coin = coins[i];
			break;
		}
	}
	if(coinDropDuration > 500)
	{
		coinDropDuration -= 100;
	}
	coin.setActive(true).setVisible(true);
	coin.setPosition(Phaser.Math.Between(coin.width / 2, this.res.width - coin.width / 2), - coin.height);
	this.tweens.add({
		targets: coin,
		duration: coinDropDuration,
		y: this.res.height + coin.height,
		onComplete: function(){
			// end game
			self.gameOverBoard.setVisible(true);
			self.tab.isPlayed = false;
		}
	});
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
	this.load.audio('coin', [
        'coin.wav'
    ]);
}

var noCoin:number = 5;

function create()
{
	var self = this;

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

	this.coinSound = this.sound.add('coin');

	this.coins = [];
	for(var i = 0; i < noCoin; i++)
	{
		var coin = this.add.sprite(0, 0, 'images').play('coin').setInteractive().setActive(false).setVisible(false);
		coin.on('pointerdown', function(pointer, gameObject){
			var coin = this;
			if(global.sound) self.coinSound.play();
			self.tweens.killTweensOf(coin);
			self.tweens.add({
				targets: this,
				duration: 100,
				x: self.res.width,
				y: 0,
				onComplete: function(){
					coin.setActive(false).setVisible(false);
					self.score++;
					self.scoreboard.setText('Score: ' + self.score);
					throwCoin.call(self);
				}
			});
		});
		this.coins.push(coin);
	}

	// scoreboard
	this.score = 0;
	this.scoreboard = this.add.text(700, 250, 'Score: 0', { fontFamily: '"Roboto Condensed"', fontSize: '80px' });

	this.gameOverBoard = this.add.text(this.res.width / 2 - 250, this.res.height / 2 - 50, 'Game Over', { fontFamily: '"Roboto Condensed"', fontSize: '120px', align: 'center', color: 'red' });
	this.gameOverBoard.setVisible(false);
}

function update()
{

}
