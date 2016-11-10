/**
 *@create by Leo
 *@mail 984018099@qq.com
 *@all right reserved
 * */
$(function() {
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	$(".game canvas").attr({
		"height": winHeight,
		"width": winWidth
	});
	var manifest = [{
			src: "images/man.png",
			id: "man"
		}, {
			src: "images/compressor.png",
			id: "compressor"
		}, {
			src: "images/nipple.png",
			id: "nipple"
		}, {
			src: "images/leftBottle.png",
			id: "leftBottle"
		}, {
			src: "images/rightBottle.png",
			id: "rightBottle"
		}, {
			src: "images/overline.png",
			id: "overline"
		}, {
			src: "images/a.png",
			id: "a"
		}, {
			src: "images/add.png",
			id: "add"
		}, {
			src: "images/X.png",
			id: "X"
		}, {
			src: "images/pp.png",
			id: "pp"
		}, {
			src: "images/bomb.png",
			id: "bomb"
		}, {
			src: "images/down1.png",
			id: "down1"
		}, {
			src: "images/down2.png",
			id: "down2"
		}, {
			src: "images/milk.png",
			id: "milk"
		}, {
			src: "images/no.png",
			id: "no"
		}, {
			src: "images/nod.png",
			id: "nod"
		}, {
			src: "images/down_tips.png",
			id: "down_tips"
		}
		//music

		//{src:"images/music/Game-Break.ogg", id:"Game-Break"},

	];

	window.gameOver = function() {
		window.location.href = '../gameOver.html';
	}

	//createjs.Sound.alternateExtensions = ["mp3"];

	loader = new createjs.LoadQueue(false);
	//loader.installPlugin(createjs.Sound);
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("progress", progress);

	loader.loadManifest(manifest);
	if (!createjs.Sound.initializeDefaultPlugins()) {

	}

	var timer;
	//设置游戏
	var gameTime = 60;
	var game1;

	function handleComplete() {
		$(".loading").hide();

		//
		$('#bgAudio')[0].play(); //背景音乐

		//初始化游戏
		var gameObj1 = {
			parent: $('#game1'),
			stageId: 'stage1'
		}
		game1 = new Game(gameObj1);
		game1.leftGameTime = gameTime;
		game1.gameTime = gameTime;
		game1.start();


		timer = setInterval(function() {
			gameTime--;
			game1.addBuCount++;
			game1.leftGameTime = gameTime;


			if (gameTime == 0) {

				window.gameOver();

				clearInterval(timer);
			}
		}, 1000)

		//背景音乐
		//console.log(createjs.Sound.play("music_bg"))
		//createjs.Sound.play("Game-Break", {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
		//createjs.Sound.play("Game-Break", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1);
		createjs.Ticker.setFPS(60);
	}


	//气泡
	var Bubble = function(data) {
		this.data = {
			x: 0,
			y: 0,
			MAP_EL_W: 100,
			MAP_EL_H: 100,
			type: -1,
		};
		$.extend(this.data, data);

		this.init();
	}

	Bubble.prototype = {
		init: function() {
			var pngArr = [
				[0, 1, 'pp1', 0.02],
				[2, 3, 'pp2', 0.02],
				[4, 5, 'pp3', 0.02],
				[6, 6, 'X', 0.008]
			];
			var aniName = ['pp1', 'pp2', 'pp3', 'X'];
			if (this.data.type == -1) { //因为有可能是0，所以不能用boolean判断
				this.data.type = Math.floor(Math.random() * 4);
			}

			var spriteSheet;
			var sprite;
			if (this.data.isBullet) {
				spriteSheet = new createjs.SpriteSheet({
					'images': [loader.getResult('milk')],
					'frames': {
						'width': 100,
						'height': 100,
						'count': 3,
						'regX': 0,
						'regY': 0
					},
					'animations': {
						'state1': {
							frames: [0]
						},
						'state2': {
							frames: [1]
						},
						'state3': {
							frames: [2]
						},
					}
				})
				this.sprite = new createjs.Sprite(spriteSheet, 'state' + (this.data.type + 1));
			} else {
				spriteSheet = new createjs.SpriteSheet({
					'images': [loader.getResult('pp'), loader.getResult('X'), loader.getResult('bomb')], //,
					//"frames": {"width": 100, "height": 100, "count": 7, "regX": 0,"regY": 0 },
					//'frames':[[0,0,100,100,0,0,0],[100,0,100,100,1,]], //[0,0,234,194,7] //,[0,0,100,100,6]
					'frames': [
						[0, 0, 100, 100, 0, ],
						[100, 0, 100, 100, 0],
						[200, 0, 100, 100, 0],
						[300, 0, 100, 100, 0],
						[400, 0, 100, 100, 0],
						[500, 0, 100, 100, 0],
						[0, 0, 100, 100, 1], //第二张图片
						[0, 0, 116, 93, 2, 0, 0], //第三张图片
						[116, 0, 116, 93, 2, 0, 0],
						[232, 0, 116, 93, 2, 0, 0],
						[348, 0, 116, 93, 2, 0, 0],
						[348, 0, 116, 93, 2, 0, 0]
					],
					'animations': {
						'pp1': pngArr[0],
						'pp2': pngArr[1],
						'pp3': pngArr[2],
						'X': pngArr[3],
						'bomb': [7, 11, 'bomb', 0.1], //爆炸动画坐标设置在中间，要注意这一点
						/*'ppX':{frames:[6,6,false,0.5]},
						'bomb':{frames:[7,9,false,0.5]},*/
					}
				});
				this.sprite = new createjs.Sprite(spriteSheet, aniName[this.data.type]); //aniName[this.data.type]
			}
			this.el = this.sprite;
			this.el.x = this.get('x');
			this.el.y = this.get('y');

			/*var bombSheet  =  new createjs.SpriteSheet({
				'images':[loader.getResult('bomb')],//,loader.getResult('bomb')
				"frames": {"width": 100, "height": 100, "count": 7, "regX": 0,"regY": 0 },
				'frames':[[0,0,100,100,0,0,0],[100,0,100,100,1,]], //[0,0,234,194,7] //,[0,0,100,100,6]
				'animations':{
						'pp1':[0,1,'pp1',0.02],
						'pp2':[2,3,'pp2',0.04],
						'pp3':[4,5,'pp3',0.008],
						'X':[7,7,'X',0.008]
					}
			});
			this.sprite = new createjs.Sprite(spriteSheet,aniName[this.data.type]);
			this.el = this.sprite;
			this.el.x = this.get('x');
			this.el.y = this.get('y');*/


		},
		getSuroundPosition: function() {
			var X = this.get('x');
			var Y = this.get('y');
			var arr0 = [X - 50, Y - 90];
			var arr1 = [X + 50, Y - 90];
			var arr2 = [X + 100, Y];
			var arr3 = [X + 50, Y + 90];
			var arr4 = [X - 50, Y + 90];
			var arr5 = [X - 100, Y];
			var arr = [arr0, arr1, arr2, arr3, arr4, arr5];
			return arr;

		},

		//获取距离
		getDistance: function(arr) {
			var dx = arr[0] - this.get('x');
			var dy = arr[1] - this.get('y');
			var dis = Math.sqrt(dx * dx + dy * dy);
			return dis;
		},

		clone: function() {
			var bubble = new Bubble(this.data);
			bubble.el.x = bubble.data.x = this.el.x;
			bubble.el.y = bubble.data.y = this.el.y;
			return bubble;

		},
		get: function(pro) {
			return this.data[pro];
		},
		set: function(pro, value) {
			this.data[pro] = value;
			this.el.x = this.get('x');
			this.el.y = this.get('y');
		},
		getAroundBub: function() {
			var obj = this.data;
			var row = obj.row;
			var col = obj.col;
			var TOTALCOL = obj.TOTALCOL;

			var bubbleArray = this.data.bubbleArray;
			var arr = [];
			if (obj.row % 2 == 0) { //偶行

				if (obj.row == 0) { //第一行
					if (obj.col == 0) //第一列
					{
						arr = [bubbleArray[row][col + 1], bubbleArray[row + 1][col]];
					} else if (obj.col == TOTALCOL - 1) {
						arr = [bubbleArray[row + 1][col - 1], bubbleArray[row][col - 1]];
					} else {
						arr = [bubbleArray[row][col + 1], bubbleArray[row + 1][col], bubbleArray[row + 1][col - 1], bubbleArray[row][col - 1]];
					}
				} else {
					if (obj.col == 0) //第一列
					{
						arr = [bubbleArray[row - 1][col], bubbleArray[row][col + 1], bubbleArray[row + 1][col]];
					} else if (obj.col == TOTALCOL - 1) {

						arr = [bubbleArray[row - 1][col - 1], bubbleArray[row + 1][col - 1], bubbleArray[row][col - 1]];
					} else {

						arr = [bubbleArray[row - 1][col - 1], bubbleArray[row - 1][col], bubbleArray[row][col + 1], bubbleArray[row + 1][col], bubbleArray[row + 1][col - 1], bubbleArray[row][col - 1]];

					}
				}
			} else {
				if (obj.col == 0) {
					arr = [bubbleArray[row - 1][col], bubbleArray[row - 1][col + 1], bubbleArray[row][col + 1], bubbleArray[row + 1][col + 1], bubbleArray[row + 1][col]];
				} else if (obj.col == TOTALCOL - 2) {
					arr = [bubbleArray[row - 1][col], bubbleArray[row - 1][col + 1], bubbleArray[row + 1][col + 1], bubbleArray[row + 1][col], bubbleArray[row][col - 1]];
				} else {
					arr = [bubbleArray[row - 1][col], bubbleArray[row - 1][col + 1], bubbleArray[row][col + 1], bubbleArray[row + 1][col + 1], bubbleArray[row + 1][col], bubbleArray[row][col - 1]];

				}
			}
			return arr;
		},
		getAroundBubPos: function() {
			var obj = this.data;
			var row = obj.row;
			var col = obj.col;
			var TOTALCOL = obj.TOTALCOL;

			var bubbleArray = this.data.bubbleArray;
			var arrRC = [];
			if (row % 2 == 0) { //偶行

				if (row == 0) { //第一行
					if (col == 0) //第一列
					{
						arrRC = [
							[row, col + 1],
							[row + 1, col]
						]
					} else if (col == TOTALCOL - 1) {
						arrRC = [
							[row + 1, col - 1],
							[row, col - 1]
						]
					} else {
						arrRC = [
							[row, col + 1],
							[row + 1, col],
							[row + 1, col - 1],
							[row, col - 1]
						];
					}
				} else {
					if (col == 0) //第一列
					{
						arrRC = [
							[row - 1, col],
							[row, col + 1],
							[row + 1, col]
						];
					} else if (col == TOTALCOL - 1) {
						arrRC = [
							[row - 1, col - 1],
							[row + 1, col - 1],
							[row, col - 1]
						];
					} else {
						arrRC = [
							[row - 1, col - 1],
							[row - 1, col],
							[row, col + 1],
							[row + 1, col],
							[row + 1, col - 1],
							[row, col - 1]
						];
					}
				}
			} else {
				if (col == 0) {

					arrRC = [
						[row - 1, col],
						[row - 1, col + 1],
						[row, col + 1],
						[row + 1, col + 1],
						[row + 1, col]
					];
				} else if (col == TOTALCOL - 2) {
					arrRC = [
						[row - 1, col],
						[row - 1, col + 1],
						[row + 1, col + 1],
						[row + 1, col],
						[row, col - 1]
					];
				} else {
					arrRC = [
						[row - 1, col],
						[row - 1, col + 1],
						[row, col + 1],
						[row + 1, col + 1],
						[row + 1, col],
						[row, col - 1]
					];
				}
			}
			return arrRC;
		}

	}


	var Game = function(obj) {
		this.stageW = winWidth;
		this.stageH = winHeight;

		this.p = obj.parent;
		this.stageId = obj.stageId;

		this.leftTime = 0; //游戏剩余时间
		this.gameTime = 0;

		this.decScore = 0; //减分
		this.addScore = 0;

		this.el = {};
		this.bubbleW = 100;
		this.bubbleH = 100;
		this.bubbleV = 25;
		//this.bubbleList = [];
		//this.compressorOffset = 0;
		//this.compressorV = 15;
		//this.compressorIdx = 0;
		//this.compressorD = 10;
		this.gameTime = 0;
		this.ball_cols = 13;
		this.bubbleAnim = !1;
		this.stoneEnable = !1;
		this.stoneOdds = .1;
		this.stone_max = 5,
			this.stone_cur = 0,
			this._pause = !1;
		this.bubbleToDisappear = [];

		this.lenArra = []; //递归标尺

		this._vx = 0;
		this._vy = 0;

		this.row = 0; //碰撞球位置
		this.col = 0; //碰撞球位置

		this.core_r; //搜索网络的起始球的row
		this.core_c; //搜索网络的起始球的col

		this.initX = 0; //子弹的初始位置，会在game中实例化
		this.initY = 0; //子弹的初始位置，会在game中实例化

		this.shoot = false;

		this.ROW = 3; //初始球的row
		this.RADIUS = 100; //球
		this.MAP_UNIT = 100; //地图元素尺
		this.MAP_EL_W = 100; //地图元素尺寸宽
		this.MAP_EL_H = 90; //地图元素尺寸高
		this.TOTALROW = 15; //总行数
		this.TOTALCOL = 8; //总列数

		this.sameBubbleTotal = []; //相同颜色的数组

		this.dropArr = []; //放置待消除的数组
		this.temDropArr = []; //临时放置待消除的数组
		this.dropLenArr = [];

		this.bubbleArray = [];

		this.score = 0;
		this.aniCount = 0;

		this.addEnterFrame = false;

		this.bulletArr = [];

		this.addBuCount = 0; //每隔几秒加小球

		var _this = this;
		this.init();
	}


	Game.prototype = {
		init: function() {

			var canvas = document.getElementById(this.stageId);
			this.el.canvas = canvas;
			this.stage = new createjs.Stage(canvas);

			createjs.Touch.enable(this.stage, !0);
			var _this = this;
			if (!this.addEnterFrame) {
				createjs.Ticker.addEventListener("tick", function() {
					_this.tick();
				});
			}
			//createjs.Touch.enable(this.stage, !0);
		},
		createEls: function() {
			//背景
			this.bgShape = new createjs.Shape();
			this.bgShape.graphics.beginFill("#1b4e83").drawRect(74, 0, winWidth, winHeight);
			this.stage.addChild(this.bgShape);

			//进度条
			this.barBg = new createjs.Shape();
			this.barBg.graphics.beginFill("#00a0e9").drawRect(97, 24, 500, 18);
			this.stage.addChild(this.barBg);

			this.bar = new createjs.Shape();
			this.bar.graphics.beginFill("#fff").drawRect(97, 24, 500, 18);
			this.stage.addChild(this.bar);



			//overline
			this.overline = new createjs.Bitmap(loader.getResult("overline"));
			this.overline.x = 0;
			this.overline.y = winHeight - 336;
			this.overline.setTransform(0, winHeight - 336, 1.35, 1);
			this.stage.addChild(this.overline);

			//左边瓶子
			this.leftBottle = new createjs.Bitmap(loader.getResult("leftBottle"));
			this.leftBottle.x = 30;
			this.leftBottle.y = winHeight - 270;
			this.stage.addChild(this.leftBottle);
			//左边瓶子提示
			this.leftNo = new createjs.Bitmap(loader.getResult("no"));
			this.leftNo.x = 70;
			this.leftNo.y = winHeight - 180;

			this.leftNod = new createjs.Bitmap(loader.getResult("nod"));
			this.leftNod.x = 45;
			this.leftNod.y = winHeight - 115;
			this.leftNod.alpha = 0;
			this.stage.addChild(this.leftNo);
			this.stage.addChild(this.leftNod);
			//ani
			//this.addAni = new createjs.Bitmap(loader.getResult("leftBottle"));
			var aniSpriteSheet = new createjs.SpriteSheet({
				'images': [loader.getResult('down1'), loader.getResult('down2')], //,
				'frames': [
					[0, 0, 52, 110, 0, 26, 110],
					[0, 0, 42, 174, 1, 21, 174],
				],
				'animations': {
					'down1': {
						frames: [0],
						next: 'down1',
						speed: 0.05
					},
					'down2': {
						frames: [1],
						next: 'down2',
						speed: 0.05
					},
				}
			});
			this.downSprite = new createjs.Sprite(aniSpriteSheet, 'down2'); //aniName[this.data.type]
			this.downSprite.x = 685;
			this.downSprite.y = winHeight - 756;
			this.downSprite.visible = false;
			this.stage.addChild(this.downSprite);
			//右边的x掉落
			var aniSpriteSheet2 = new createjs.SpriteSheet({
				'images': [loader.getResult('X')], //,
				'frames': [
					[0, 0, 100, 100, 0, 26, 110],
				],
				'animations': {
					'down3': {
						frames: [0],
						next: 'down3',
						speed: 0.05
					},
				}
			});
			this.downSprite2 = new createjs.Sprite(aniSpriteSheet2, 'down3'); //aniName[this.data.type]
			this.downSprite2.x = 95;
			this.downSprite2.y = winHeight - 756;
			this.downSprite2.visible = false;
			this.stage.addChild(this.downSprite2);

			//右边瓶子
			//man
			var rightBottleSheet = new createjs.SpriteSheet({
				'images': [loader.getResult('rightBottle')],
				'frames': {
					'width': 152,
					'height': 260,
					'count': 4,
					'regX': 72,
					'regY': 0
				},
				'animations': {
					'state1': {
						frames: [0]
					},
					'state2': {
						frames: [1]
					},
					'state3': {
						frames: [2]
					},
					'state4': {
						frames: [3]
					},
				}
			});
			this.rightBottle = new createjs.Sprite(rightBottleSheet, "state1");
			this.rightBottle.x = 680;
			this.rightBottle.y = winHeight - 270;
			this.stage.addChild(this.rightBottle);

			//奶嘴
			var nipple = new createjs.Bitmap(loader.getResult("nipple"));
			var nippleBounds = nipple.getBounds();
			nipple.x = -nippleBounds.width / 2;
			nipple.y = -nippleBounds.height;

			this.nippleCon = new createjs.Container();
			this.nippleCon.x = 300;
			this.nippleCon.y = winHeight - 186;
			this.nippleCon.rotation = 13; //要加13度对是正中间
			//nipple.setTransform  (0,0,this.stageW/613,0.2);
			this.nippleCon.addChild(nipple);
			this.stage.addChild(this.nippleCon);

			//man
			var manSpriteSheet = new createjs.SpriteSheet({
				'images': [loader.getResult('man')],
				'frames': {
					'width': 245,
					'height': 330,
					'count': 3,
					'regX': 132,
					'regY': 330
				},
				'animations': {
					'state1': {
						frames: [0],
						next: 'state2',
						speed: 0.05
					},
					'state2': {
						frames: [1],
						next: 'state2',
						speed: 0.05
					},
					'state3': {
						frames: [2],
						next: 'state2',
						speed: 0.05
					},
				}
			});
			this.manSprite = new createjs.Sprite(manSpriteSheet, "state2");
			this.manSprite.x = 450;
			this.manSprite.y = winHeight - 20;
			this.stage.addChild(this.manSprite);
			//右边文字提示
			var tipsSpriteSheet = new createjs.SpriteSheet({
				'images': [loader.getResult('down_tips')],
				'frames': {
					'width': 44,
					'height': 150,
					'count': 3,
					'regX': 0,
					'regY': 0
				},
				'animations': {
					'state1': {
						frames: [0],
						next: 'state1',
						speed: 0.05
					},
					'state2': {
						frames: [1],
						next: 'state2',
						speed: 0.05
					},
					'state3': {
						frames: [2],
						next: 'state3',
						speed: 0.05
					},
				}
			});
			this.tipsSprite = new createjs.Sprite(tipsSpriteSheet, "state1");
			this.tipsSprite.x = 650;
			this.tipsSprite.scaleX = 1.5;
			this.tipsSprite.scaleY = 1.5;
			this.tipsSprite.visible = false;
			this.tipsSprite.y = winHeight - 600;
			this.stage.addChild(this.tipsSprite);
			//-
			var decBitmap = new createjs.Bitmap(loader.getResult("a"));
			var decBitmapBounds = decBitmap.getBounds();
			decBitmap.x = -decBitmapBounds.width / 2;
			decBitmap.y = -decBitmapBounds.height / 2;
			this.dec = new createjs.Container();
			this.dec.x = 175;
			this.dec.y = winHeight - 51;
			this.dec.addChild(decBitmap);
			this.stage.addChild(this.dec);
			//+
			var addBitmap = new createjs.Bitmap(loader.getResult("add"));
			var addBitmapBounds = addBitmap.getBounds();
			addBitmap.x = -addBitmapBounds.width / 2;
			addBitmap.y = -addBitmapBounds.height / 2;
			this.add = new createjs.Container();;
			this.add.x = 620;
			this.add.y = winHeight - 51;
			this.add.addChild(addBitmap);
			this.stage.addChild(this.add);

			//减分 Txt
			this.decTxt = new createjs.Text(this.decScore.toString(), "bold 55px Arial", '#898989');
			this.decTxt.x = 100;
			this.decTxt.y = winHeight - 110;
			this.decTxt.textAlign = 'center';
			this.stage.addChild(this.decTxt);

			//加分 Txt
			this.addTxt = new createjs.Text("0", "bold 55px Arial", '#ff9700');
			this.addTxt.x = 680;
			this.addTxt.y = winHeight - 110;
			this.addTxt.textAlign = 'center';
			this.stage.addChild(this.addTxt);


			//压缩器
			/*this.compressor =  new createjs.Bitmap(loader.getResult("compressor"));
			this.compressor.x = 0;
			this.compressor.y = 0;
			this.compressor.setTransform  (0,0,this.stageW/613,0.2);
			this.stage.addChild(this.compressor);	*/


			//time Txt
			var timeTxt = new createjs.Text("time", "bold 30px Arial", '#fff')
			timeTxt.x = 28;
			timeTxt.y = 13;
			this.stage.addChild(timeTxt);

			//气泡容器
			this.bubbleContainer = new createjs.Container;
			this.bubbleContainer.x = 0;
			this.bubbleContainer.y = 65;
			this.stage.addChild(this.bubbleContainer);


			this.stage.update();
		},
		initBubbles: function() {
			for (var i = 0; i < this.TOTALROW; i++) {
				this.bubbleArray[r] = [];
				for (var j = 0; j < this.TOTALCOL; j++) {
					this.bubbleArray[r][j] = null;
				}
			}

			for (var r = 0; r < this.TOTALROW; r++) {
				this.bubbleArray[r] = [];
				if (r < this.ROW) {
					for (var c = 0; c < this.TOTALCOL; c++) {
						var obj = {};
						obj.bubbleArray = this.bubbleArray;
						if (r % 2 == 0) {
							obj.x = c * this.MAP_EL_W;
							obj.y = r * this.MAP_EL_H;
							obj.row = r;
							obj.col = c;
							obj.TOTALCOL = this.TOTALCOL;
							obj.MAP_EL_W = this.MAP_EL_W;
							obj.MAP_EL_H = this.MAP_EL_H;
							this.bubbleArray[r][c] = new Bubble(obj);
							this.bubbleContainer.addChild(this.bubbleArray[r][c].el);
						} else {
							if (c == this.TOTALCOL - 1) { //偶行少一个
								this.bubbleArray[r][c] = null;
							} else {
								obj.x = c * this.MAP_EL_W + this.MAP_EL_W / 2;
								obj.y = r * this.MAP_EL_H;
								obj.row = r;
								obj.col = c;
								obj.TOTALCOL = this.TOTALCOL;
								obj.MAP_EL_W = this.MAP_EL_W;
								obj.MAP_EL_H = this.MAP_EL_H;
								this.bubbleArray[r][c] = new Bubble(obj);
								this.bubbleContainer.addChild(this.bubbleArray[r][c].el);
							}
							//}
						}
					}
				} else {
					this.bubbleArray[r] = [];
				}
			}
			this.setBullet();
			this.stage.update();
			this.bubbleArray.length = this.TOTALROW;

		},
		createBubble: function(obj) {


		},
		//小球准备
		setBullet: function() {
			var _this = this;
			if (!this.bulletArr[0]) {
				this.bulletArr[0] = this.createSecondBullet(250, this.stageH - 300);
				this.bubbleContainer.addChild(this.bulletArr[0].el);
			}
			if (!this.bulletArr[1]) {
				this.bulletArr[1] = this.createSecondBullet(200, this.stageH - 200);
				this.bubbleContainer.addChild(this.bulletArr[1].el);
			}
			this.bullet = this.bulletArr[0];
			this.stage.update();

			this.el.canvas.addEventListener('touchstart', function(e) {
				if (_this.shoot) { //发射中
					return;
				}
				$('#shootAudio')[0].play(); //
				$('#bgAudio')[0].play();
				_this.clickHandler();
				_this.bulletArr[1].data.x = 250; //不用是set防止el直接刷新
				_this.bulletArr[1].data.y = _this.stageH - 300; //不用是set防止el直接刷新
				createjs.Tween.get(_this.bulletArr[1].el).to({
					y: _this.stageH - 300,
					x: 250
				}, 200, createjs.Ease.linear);
				_this.bulletArr.shift();
			});
		},
		createSecondBullet: function(x, y) {

			var obj = {};
			obj.x = x;
			obj.y = y;
			obj.bubbleArray = this.bubbleArray;
			obj.TOTALCOL = this.TOTALCOL;
			obj.MAP_EL_W = this.MAP_EL_W;
			obj.MAP_EL_H = this.MAP_EL_H;
			obj.isBullet = true;
			obj.type = Math.floor(Math.random() * 3);
			return new Bubble(obj);;
		},
		//舞台点击
		clickHandler: function(pos) {
			//子弹的初始位置，会在game中实例化
			this.initX = this.bullet.get('x');
			this.initY = this.bullet.get('y');
			this.initMouseX = this.stage.mouseX;
			this.initMouseY = this.stage.mouseY;
			if (this.initMouseY > winHeight - 536) {
				this.initMouseY = winHeight - 536;
			}

			var rot = Math.atan2(this.initMouseY - this.nippleCon.y, this.initMouseX - this.nippleCon.x) * 180 / Math.PI + 13 + 90;
			this.nippleCon.rotation = rot;

			var w = Math.cos(rot * (Math.PI / 180)) * 175;
			var h = Math.sin(rot * (Math.PI / 180)) * 175;
			//this.bullet.set('x',this.bullet.get('x')+w);
			//	this.bullet.set('y',this.bullet.get('y')-200);

			//射击速度
			var speed = 30;
			//this.bullet.el.x +=20;
			this._vx = speed * Math.cos(Math.atan((this.initMouseY - (this.initY + this.RADIUS / 2)) / (this.initMouseX - (this.initX + this.RADIUS / 2))));
			this._vy = speed * Math.sin(Math.atan((this.initMouseY - (this.initY + this.RADIUS / 2)) / (this.initMouseX - (this.initX + this.RADIUS / 2))));
			this.shoot = true;
			//this.stage.update();
		},

		start: function() {
			this.createEls();
			this.initBubbles();

		},
		checkHit: function() {
			if (!this.shoot || !this.bullet) {
				return;
			}
			for (var r = 0; r < this.TOTALROW; r++) {
				for (var c = 0; c < this.TOTALCOL; c++) {
					if (this.bubbleArray[r][c]) {

						//算两具圆心距
						var dx1 = this.bullet.get('x') + this.bubbleW / 2;
						var dy1 = this.bullet.get('y') + this.bubbleH / 2;

						var hit1 = this.bubbleArray[r][c].get('x') + this.bubbleW / 2;
						var hit2 = this.bubbleArray[r][c].get('y') + this.bubbleH / 2;

						if (Math.sqrt(Math.pow(hit1 - dx1, 2) + Math.pow(hit2 - dy1, 2)) < this.bubbleW) {
							$('#hitAudio')[0].play(); //

							if (this.bubbleArray[r][c].get('type') == 3) { //第三个是X,

								this.manSprite.gotoAndPlay('state1');
								//减分和加
								this.decScore++;
								if (this.decScore < 0) {
									this.decScore = 0;
								}
								createjs.Tween.get(this.dec).to({
									scaleX: 1.5,
									scaleY: 1.5
								}, 300, createjs.Ease.linear).to({
									scaleX: 1,
									scaleY: 1
								}, 300, createjs.Ease.linear);
								this.decTxt.text = this.decScore.toString();
								this.leftNod.alpha += 0.2;
								var totalScore = this.addScore - this.decScore;
								this.downAni2();
								$(".score-inner").text(totalScore);
							} else {
								this.manSprite.gotoAndPlay('state3');
							}
							this._vx = 0;
							this._vy = 0;
							this.row = r;
							this.col = c;

							this.setPosition();
							this.setBullet();
							break;
						}
					}
				}
			}

		},

		setPosition: function() {
			this.shoot = false;
			var row = this.row;
			var col = this.col;
			var i = 0;

			var core_r = this.core_r;
			var core_c = this.core_c;
			var TOTALCOL = this.TOTALCOL;
			var TOTALROW = this.TOTALROW;
			var bubbleArray = this.bubbleArray;
			var suroundPositionArr = this.bubbleArray[row][col].getSuroundPosition();

			var distanceArr = [];

			var roundArr = this.bubbleArray[row][col].getAroundBub();
			var arr;
			var arrRC = []; //记录位置

			if (row % 2 == 0) { //偶行

				if (row == 0) { //第一行
					if (col == 0) //第一列
					{
						arrRC = [
							[row, col + 1],
							[row + 1, col]
						]
						arr = [2, 3];
					} else if (col == TOTALCOL - 1) {
						arrRC = [
							[row + 1, col - 1],
							[row, col - 1]
						]
						arr = [4, 5];
					} else {
						arrRC = [
							[row, col + 1],
							[row + 1, col],
							[row + 1, col - 1],
							[row, col - 1]
						];
						arr = [2, 3, 4, 5];
					}
				} else {
					if (col == 0) //第一列
					{
						arrRC = [
							[row - 1, col],
							[row, col + 1],
							[row + 1, col]
						];
						arr = [1, 2, 3];
					} else if (col == TOTALCOL - 1) {
						arrRC = [
							[row - 1, col - 1],
							[row + 1, col - 1],
							[row, col - 1]
						];
						arr = [0, 4, 5];
					} else {
						arrRC = [
							[row - 1, col - 1],
							[row - 1, col],
							[row, col + 1],
							[row + 1, col],
							[row + 1, col - 1],
							[row, col - 1]
						];
						arr = [0, 1, 2, 3, 4, 5];

					}
				}
			} else {
				if (col == 0) {

					arrRC = [
						[row - 1, col],
						[row - 1, col + 1],
						[row, col + 1],
						[row + 1, col + 1],
						[row + 1, col]
					];
					arr = [0, 1, 2, 3, 4];
				} else if (col == TOTALCOL - 2) {

					arrRC = [
						[row - 1, col],
						[row - 1, col + 1],
						[row + 1, col + 1],
						[row + 1, col],
						[row, col - 1]
					];
					arr = [0, 1, 3, 4, 5];
				} else {
					arrRC = [
						[row - 1, col],
						[row - 1, col + 1],
						[row, col + 1],
						[row + 1, col + 1],
						[row + 1, col],
						[row, col - 1]
					];
					arr = [0, 1, 2, 3, 4, 5];
				}
			}

			//roundArr对应bubble，arr对应各个位置
			for (i = 0; i < roundArr.length; i++) {

				if (roundArr[i] == undefined || roundArr[i] == null) { //已经有球了
					distanceArr.push([this.bullet.getDistance(suroundPositionArr[i]), arrRC[i], arr[i]]);
				}
			}
			//大小排序
			distanceArr.sort(function(a, b) {
				return a[0] - b[0];
			});

			this.core_r = distanceArr[0][1][0];
			this.core_c = distanceArr[0][1][1];

			var obj = {};
			obj.bubbleArray = this.bubbleArray;
			obj.x = suroundPositionArr[distanceArr[0][2]][0];
			obj.y = suroundPositionArr[distanceArr[0][2]][1];
			obj.row = this.core_r;
			obj.col = this.core_c;
			obj.TOTALCOL = this.TOTALCOL;
			obj.MAP_EL_W = this.MAP_EL_W;
			obj.MAP_EL_H = this.MAP_EL_H;
			obj.type = this.bullet.get('type');
			bubbleArray[this.core_r][this.core_c] = new Bubble(obj);
			this.bubbleContainer.addChild(bubbleArray[this.core_r][this.core_c].el);

			this.bubbleContainer.removeChild(this.bullet.el);
			this.bullet = null;


			//先手动搜索子弹的周围
			var firstArr = this.firstSearch(bubbleArray[this.core_r][this.core_c]);
			//trace("firstArr=",firstArr);

			var sameBubbleTotal = this.sameBubbleTotal;
			if (firstArr.lenth == 0) {
				sameBubbleTotal = null;

			} else {
				//如果有，继续搜索
				sameBubbleTotal = this.searchSameColor(firstArr);
				//trace(sameBubbleTotal);
			}
			//消除普通气泡
			if (sameBubbleTotal.length > 2) {
				for (var k = 0; k < sameBubbleTotal.length; k++) {
					//舞台消除
					var sameBubble = sameBubbleTotal[k];
					var elParent = sameBubble.el.parent;

					var dropEl = sameBubble.el;
					this.bombBubble(dropEl, sameBubble.get('type'));
					bubbleArray[sameBubble.get('row')][sameBubble.get('col')] = null;
					sameBubbleTotal[k] = null;
				}

				//递归2 ,消除悬空的气泡
				this.search1();
			} else {
				//消除击中的X
				var wrongBubble = this.searchWrongBuble(bubbleArray[this.core_r][this.core_c])[0];
				if (wrongBubble) {
					var dropEl = wrongBubble.el;
					this.bombBubble(dropEl, wrongBubble.get('type'));
					bubbleArray[wrongBubble.get('row')][wrongBubble.get('col')] = null;
					//递归2 ,消除悬空的气泡
					this.search1();
				}
			}

			//检查是否gameover
			this.checkGameOver();
		},

		firstSearch: function(obj) {
			var temArray;
			/*		var r = obj.get('row');
					var c = obj.get('col');*/
			var bubbleArray = this.bubbleArray;
			//分几种情况
			temArray = obj.getAroundBub();
			//检查颜色类型是否一致，不一致要除掉
			for (var i = temArray.length - 1; i > -1; i--) {
				if (!temArray[i] || (temArray[i] && temArray[i].get('type') != obj.get('type'))) {
					temArray.splice(i, 1);
				}
			}
			return temArray;

		},
		searchWrongBuble: function(obj) {
			var temArray;
			var bubbleArray = this.bubbleArray;
			//分几种情况
			temArray = obj.getAroundBub();
			//检查颜色类型是否一致，不一致要除掉
			for (var i = temArray.length - 1; i > -1; i--) {
				if (!temArray[i] || (temArray[i] && temArray[i].get('type') != 3)) {
					temArray.splice(i, 1);
				}
			}
			return temArray;
		},
		searchSameColor: function(arr) {
			for (var i = 0; i < arr.length; i++) {
				//结果再加入自己的数组
				arr = arr.concat(this.searchAroundSameColor(this.bubbleArray, arr[i].get('row'), arr[i].get('col')));
				//trace("get=",getRow(arr[i]));
				//祛除重复
				var temp = [];
				for (var g = 0; g < arr.length; g++) {
					if (temp.indexOf(arr[g]) == -1) {
						temp.push(arr[g]);
					}
				}
				arr = temp;
			}
			//加入标尺
			var lenArra = this.lenArra;
			lenArra.push(arr.length);
			//出口
			if (lenArra[lenArra.length - 1] == lenArra[lenArra.length - 2]) {
				return arr;
			} else {
				this.searchSameColor(arr);
				return arr;
			}
		},

		//递归入口
		searchAroundSameColor: function(arr, r, c) {
			var temArr = [];
			temArr = arr[r][c].getAroundBub();
			for (var i = temArr.length - 1; i > -1; i--) {
				if (!temArr[i] || (temArr[i] && temArr[i].get('type') != arr[r][c].get('type'))) {
					temArr.splice(i, 1);
				}
			}
			return temArr;
		},

		//先从最顶层个一个开始
		search1: function() {
			var bubbleArray = this.bubbleArray;
			var arr = [];
			var g;
			var temp = [];
			for (var c = 0; c < this.TOTALCOL; c++) {
				var obj = bubbleArray[0][c];
				if (obj) {
					var arrayT = this.searchAround(obj);

					//还是去掉重复的
					for (g = 0, temp = []; g < arrayT.length; g++) {
						if (temp.indexOf(arrayT[g]) == -1) {
							temp.push(arrayT[g]);
						}
					}
					arr = arr.concat(temp);
				}
			}

			for (g = 0, temp = []; g < arr.length; g++) {
				if (temp.indexOf(arr[g]) == -1) {
					temp.push(arr[g]);
				}
			}
			arr = temp;

			//var temDropArr = [];
			//把剩下的放入数组
			for (var i = 0; i < this.TOTALROW; i++) {
				for (var j = 0; j < this.TOTALCOL; j++) {
					if ((bubbleArray[i][j]) && arr.indexOf(bubbleArray[i][j]) == -1) {
						this.bombBubble(bubbleArray[i][j].el, bubbleArray[i][j].get('type'));
						bubbleArray[i][j] = null;
					}
				}
			}
		},
		searchAround: function(obj) {
			var bubbleArray = this.bubbleArray;
			var arrayD;
			var array1 = obj.getAroundBub();
			//祛除空对象
			for (var i = array1.length - 1; i > -1; i--) {
				if (!array1[i]) {
					array1.splice(i, 1);
				}
			}

			//如果没有，要返回它自己到数组
			if (array1.length == 0) {
				return [obj];
			} else {
				//跟找相同颜色的方法相似，少了个检查颜色
				arrayD = this.searchSlings(array1);
			}
			return arrayD;
		},
		searchSlings: function(arr) {
			for (var ii = 0; ii < arr.length; ii++) {
				arr = arr.concat(arr[ii].getAroundBub());
				for (var iii = arr.length - 1; iii > -1; iii--) {
					if (!(arr[iii])) {
						arr.splice(iii, 1);
					}
				}
				for (var g = 0, temp = []; g < arr.length; g++) {
					if (temp.indexOf(arr[g]) == -1) {
						temp.push(arr[g]);
					}
				}
				arr = temp;
			}

			var dropLenArr = this.dropLenArr;
			dropLenArr.push(arr.length);
			if (dropLenArr[dropLenArr.length - 1] == dropLenArr[dropLenArr.length - 2]) {

				return arr;
			} else {
				this.searchSlings(arr);
				return arr;
			}
		},
		//第二个递归的基础，找连接的
		searchAroundNear: function(arr, r, c) {
			var temArr = [];
			temArr = arr[r][c].getAroundBub();
			for (var i = temArr.length - 1; i > -1; i--) {
				if (!temArr[i]) {
					temArr.splice(i, 1);
				}
			}
			return temArr;
		},

		//算出该点的位置及他的距离
		getAroundBubDis: function(row, col, bub1) {
			var obj = {};
			if (row % 2 == 0) {
				obj.x = col * this.get('MAP_EL_W');
				obj.y = row * this.get('MAP_EL_H');
			} else {
				obj.x = col * this.get('MAP_EL_W') + this.get('MAP_EL_W') / 2;
				obj.y = row * this.get('MAP_EL_H');
			}
			obj.col = col;
			obj.row = row;
			var dx = bub1.get('x') - obj.x;
			var dy = bub1.get('y') - obj.y;
			obj.dis = Math.sqrt(dx * dx, dy * dy);

			return obj;
		},

		downBubbles: function() {
			var bubbleArray = this.bubbleArray;
			for (var r = 0; r < this.bubbleArray.length; r++) {
				for (var c = 0; c < this.TOTALCOL; c++) {}

			}

		},
		bombBubble: function(obj, type) {
			var dropEl = obj;
			var _this = this;
			if (type == 3) { //此为x

			} else {
				this.addScore++;
				this.aniCount++;
				createjs.Tween.get(this.add).to({
					scaleX: 1.5,
					scaleY: 1.5
				}, 300, createjs.Ease.linear).to({
					scaleX: 1,
					scaleY: 1
				}, 300, createjs.Ease.linear)
				if (this.addScore >= 40) {
					this.rightBottle.gotoAndStop('state4');
				} else if (this.addScore >= 30) {
					this.rightBottle.gotoAndStop('state3');
				} else if (this.addScore >= 20) {
					this.rightBottle.gotoAndStop('state2');
				}
				if (this.aniCount >= 5) {
					this.aniCount = 0;
					this.downAni();
					setTimeout(function() {
						_this.tipsAni();
					}, 800)
				}

				this.addTxt.text = this.addScore.toString();
				var totalScore = this.addScore - this.decScore;
				$(".score-inner").text(totalScore);
			}
			obj.gotoAndPlay('bomb'); //爆炸动画坐标居中的,本来要加下位置,但由于原型的关系，都在同一个位置了，草
			var _this = this;
			obj.addEventListener('tick', function(e) {
				if (e.currentTarget.currentFrame == 11) {
					setTimeout(function() {
						e.currentTarget.stop();
						if (_this.bubbleContainer.contains(e.currentTarget)) {
							_this.bubbleContainer.removeChild(e.currentTarget)
						}
						e.currentTarget.removeEventListener('tick');
					}, 300);
				}
			})
		},
		checkGameOver: function() {
			//检测是否gameover
			//计算第几行触线
			var overline = Math.ceil(winHeight / 150);
			for (i = 0; i < this.TOTALCOL; i++) {
				if (this.bubbleArray[overline][i]) { //13行有就gameOVER
					var finalScore = this.addScore - this.decScore;
					if (finalScore < 0) {
						window.localStorage.score = 0;
					} else {
						window.localStorage.score = finalScore;
					}
					window.gameOver();
				}
			}
		},
		//下落动画
		downAni: function() {
			var a = Math.random() * 1 > 0.5 ? 'down1' : 'down2';
			this.downSprite.visible = true;
			this.downSprite.scaleX = this.downSprite.scaleY = 2;
			this.downSprite.gotoAndStop(a);
			createjs.Tween.get(this.downSprite).to({
				y: winHeight - 200,
				scaleX: 0.8,
				scaleY: 0.8,
				alpha: 0.4
			}, 1100, createjs.Ease.linear).set({
				visible: false,
				x: 685,
				y: winHeight - 756,
				scaleX: 1,
				scaleY: 1,
				alpha: 1
			});
		},
		tipsAni: function() {
			var a = Math.ceil(Math.random() * 3);
			this.tipsSprite.visible = true;
			this.tipsSprite.scaleX = this.downSprite.scaleY = 2;
			this.tipsSprite.gotoAndPlay("state" + a);
			createjs.Tween.get(this.tipsSprite).to({
				scaleX: 1.6,
				scaleY: 1.6
			}, 1000, createjs.Ease.linear).set({
				visible: false,
				scaleX: 1.5,
				scaleY: 1.5
			});
		},
		//左边下落动画
		downAni2: function() {
			this.downSprite2.visible = true;
			this.downSprite2.scaleX = this.downSprite.scaleY = 1;
			this.downSprite2.gotoAndStop("down3");
			createjs.Tween.get(this.downSprite2).to({
				y: winHeight - 200,
				scaleX: 0.4,
				scaleY: 0.4,
				alpha: 0.4
			}, 1100, createjs.Ease.linear).set({
				visible: false,
				x: 95,
				y: winHeight - 756,
				scaleX: 1,
				scaleY: 1,
				alpha: 1
			});
		},
		//flash中的enterFrame
		tick: function() {
			var i;
			var j;
			var obj;
			if (this.shoot && this.bullet) {
				var x;
				var y;
				var rat; //角度
				//子弹运动规则
				if (this.initMouseX - this.MAP_EL_W / 2 >= this.initX) {
					x = this.bullet.get('x') + this._vx;
					y = this.bullet.get('y') + this._vy;

					this.bullet.set('x', x);
					this.bullet.set('y', y);

					//rat = Math.atan2(this._vy,this._vx)*180/Math.PI+90;
					//this.bullet.el.rotation = rat;

				} else if (this.initMouseX - this.MAP_EL_W / 2 < this.initX) {

					x = this.bullet.get('x') - this._vx;
					y = this.bullet.get('y') - this._vy;

					this.bullet.set('x', x);
					this.bullet.set('y', y);
					//rat = Math.atan2(-this._vy,-this._vx)*180/Math.PI+90;
					//this.bullet.el.rotation = rat;

				}
				if (this.bullet.get('x') < 0) {
					this.bullet.set('x', 0);
					this._vx *= -1;
				} else if (this.bullet.get('x') > this.stageW - this.MAP_EL_W) {
					this.bullet.set('x', this.stageW - this.MAP_EL_W);
					this._vx *= -1;
				}
				if (this.bullet.get('y') < 0) { //出界
					var bulletX = Math.abs(this.bullet.get('x'));

					var dis = bulletX;
					var index = 0;
					for (var i = 0; i < this.TOTALCOL; i++) {
						var d = Math.abs(bulletX - i * this.MAP_EL_W);
						if (d < dis && !this.bubbleArray[0][i]) {
							//console.log(d+':'+dis);
							dis = d;
							index = i;
						}
					}
					obj = {};
					obj.bubbleArray = this.bubbleArray;
					obj.x = index * this.MAP_EL_W;
					obj.y = 0;
					obj.row = 0;
					obj.col = index;
					obj.TOTALCOL = this.TOTALCOL;
					obj.MAP_EL_W = this.MAP_EL_W;
					obj.MAP_EL_H = this.MAP_EL_H;
					obj.type = this.bullet.get('type');
					this.bubbleArray[0][index] = new Bubble(obj);
					this.bubbleContainer.addChild(this.bubbleArray[0][index].el);
					this.bubbleContainer.removeChild(this.bullet.el);
					this.bullet = null;
					this.shoot = false;
					this.setBullet();
				}

				this.checkHit();
			}
			var scaleX = this.leftGameTime / this.gameTime;
			this.bar.graphics.clear();
			this.bar.graphics.beginFill("#fff").drawRect(97, 24, 500 * scaleX, 18);

			var buCount;
			//随机加气泡
			if (this.addBuCount >= 15 && !this.shoot) {//不能在发射中添加，不然会出错位
				this.addBuCount = 0;

				//每次随机最多添加5个
				var addBub = 0;
				for (i = this.TOTALROW - 2; i >= 0; i--) {
					for (j = 0; j < this.TOTALCOL; j++) {
						var obj = this.bubbleArray[i][j];

						if (obj) {
							var arr = obj.getAroundBub();
							var arrRC = obj.getAroundBubPos();

							for (var k = 0; k < arr.length; k++) {
								var ranAdd = Math.random() * 1 < 0.2 ? true : false;
								if (!arr[k] && ranAdd && addBub < 6) {
									obj = {};
									obj.bubbleArray = this.bubbleArray;
									if (arrRC[k][0] % 2 == 0) {
										obj.x = arrRC[k][1] * this.MAP_EL_W;
										obj.y = arrRC[k][0] * this.MAP_EL_H;
										obj.row = arrRC[k][0];
										obj.col = arrRC[k][1];
										obj.TOTALCOL = this.TOTALCOL;
										obj.MAP_EL_W = this.MAP_EL_W;
										obj.MAP_EL_H = this.MAP_EL_H;
										this.bubbleArray[arrRC[k][0]][arrRC[k][1]] = new Bubble(obj);
										this.bubbleContainer.addChild(this.bubbleArray[arrRC[k][0]][arrRC[k][1]].el);
										addBub++;
									} else {
										if (arrRC[k][1] == this.TOTALCOL - 1) { //偶行少一个
											this.bubbleArray[arrRC[k][0]][arrRC[k][1]] = null;
										} else {
											obj.x = arrRC[k][1] * this.MAP_EL_W + this.MAP_EL_W / 2;
											obj.y = arrRC[k][0] * this.MAP_EL_H;
											obj.row = arrRC[k][0];
											obj.col = arrRC[k][1];
											obj.TOTALCOL = this.TOTALCOL;
											obj.MAP_EL_W = this.MAP_EL_W;
											obj.MAP_EL_H = this.MAP_EL_H;
											this.bubbleArray[arrRC[k][0]][arrRC[k][1]] = new Bubble(obj);
											this.bubbleContainer.addChild(this.bubbleArray[arrRC[k][0]][arrRC[k][1]].el);
											addBub++;
										}
									}
									//}
								}
								this.checkGameOver();
							}
						}

					}
				}

			}

			this.stage.update();
		},
	}


	function progress(event) {
		var pro = event.loaded / event.total * 100;
		$(".loading_span").html("Loading " + parseInt(pro) + "%");

	}
});
