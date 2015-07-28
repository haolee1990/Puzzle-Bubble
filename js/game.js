/**
 *@author Leo
 *@mail 984018099@qq.com
 *@all right reserved
 * */
$(function() {
	function g() {
		$(".loading").hide(),
		$("#bgAudio")[0].play();
		var a = {
			parent: $("#game1"),
			stageId: "stage1"
		};
		f = new j(a),
		f.leftGameTime = e,
		f.gameTime = e,
		f.start(),
		d = setInterval(function() {
			if (e--, f.addBuCount++, f.leftGameTime = e, f.timeTxt.text = e.toString(), 0 == e) {
				var a = f.addScore - f.decScore;
				window.localStorage.score = 0 > a ? 0 : a,
				window.gameOver(),
				clearInterval(d)
			}
		},
		1e3),
		createjs.Ticker.setFPS(60)
	}
	function k(a) {
		var b = 100 * (a.loaded / a.total);
		$(".loading_span").html("Loading " + parseInt(b) + "%")
	}
	var a = $(window).height(),
	b = $(window).width();
	$(".game canvas").attr({
		height: a,
		width: b
	});
	var c = [{
		src: "images/man.png",
		id: "man"
	},
	{
		src: "images/compressor.png",
		id: "compressor"
	},
	{
		src: "images/nipple.png",
		id: "nipple"
	},
	{
		src: "images/leftBottle.png",
		id: "leftBottle"
	},
	{
		src: "images/rightBottle.png",
		id: "rightBottle"
	},
	{
		src: "images/overline.png",
		id: "overline"
	},
	{
		src: "images/a.png",
		id: "a"
	},
	{
		src: "images/add.png",
		id: "add"
	},
	{
		src: "images/X.png",
		id: "X"
	},
	{
		src: "images/pp.png",
		id: "pp"
	},
	{
		src: "images/bomb.png",
		id: "bomb"
	},
	{
		src: "images/down1.png",
		id: "down1"
	},
	{
		src: "images/down2.png",
		id: "down2"
	},
	{
		src: "images/milk.png",
		id: "milk"
	},
	{
		src: "images/no.png",
		id: "no"
	},
	{
		src: "images/nod.png",
		id: "nod"
	},
	{
		src: "images/down_tips.png",
		id: "down_tips"
	},
	{
		src: "images/ring.png",
		id: "ring"
	}];
	window.gameOver = function() {
		window.location.href = "../over.html"
	},
	loader = new createjs.LoadQueue(!1),
	loader.addEventListener("complete", g),
	loader.addEventListener("progress", k),
	loader.loadManifest(c),
	!createjs.Sound.initializeDefaultPlugins();
	var d, f, e = 60,
	h = function(a) {
		this.data = {
			x: 0,
			y: 0,
			MAP_EL_W: 100,
			MAP_EL_H: 100,
			type: -1
		},
		$.extend(this.data, a),
		this.init()
	};
	h.prototype = {
		init: function() {
			var a = [[0, 1, "pp1", .02], [2, 3, "pp2", .02], [4, 5, "pp3", .02], [6, 6, "X", .008]],
			b = ["pp1", "pp2", "pp3", "X"]; - 1 == this.data.type && (this.data.type = Math.floor(4 * Math.random()));
			var c;
			this.data.isBullet ? (c = new createjs.SpriteSheet({
				images: [loader.getResult("milk")],
				frames: {
					width: 100,
					height: 100,
					count: 3,
					regX: 0,
					regY: 0
				},
				animations: {
					state1: {
						frames: [0]
					},
					state2: {
						frames: [1]
					},
					state3: {
						frames: [2]
					}
				}
			}), this.sprite = new createjs.Sprite(c, "state" + (this.data.type + 1))) : (c = new createjs.SpriteSheet({
				images: [loader.getResult("pp"), loader.getResult("X"), loader.getResult("bomb")],
				frames: [[0, 0, 100, 100, 0], [100, 0, 100, 100, 0], [200, 0, 100, 100, 0], [300, 0, 100, 100, 0], [400, 0, 100, 100, 0], [500, 0, 100, 100, 0], [0, 0, 100, 100, 1], [0, 0, 116, 93, 2, 0, 0], [116, 0, 116, 93, 2, 0, 0], [232, 0, 116, 93, 2, 0, 0], [348, 0, 116, 93, 2, 0, 0], [348, 0, 116, 93, 2, 0, 0]],
				animations: {
					pp1: a[0],
					pp2: a[1],
					pp3: a[2],
					X: a[3],
					bomb: [7, 11, "bomb", .1]
				}
			}), this.sprite = new createjs.Sprite(c, b[this.data.type])),
			this.el = this.sprite,
			this.el.x = this.get("x"),
			this.el.y = this.get("y")
		},
		getSuroundPosition: function() {
			var a = this.get("x"),
			b = this.get("y"),
			c = [a - 50, b - 90],
			d = [a + 50, b - 90],
			e = [a + 100, b],
			f = [a + 50, b + 90],
			g = [a - 50, b + 90],
			h = [a - 100, b],
			i = [c, d, e, f, g, h];
			return i
		},
		getDistance: function(a) {
			var b = a[0] - this.get("x"),
			c = a[1] - this.get("y"),
			d = Math.sqrt(b * b + c * c);
			return d
		},
		clone: function() {
			var a = new h(this.data);
			return a.el.x = a.data.x = this.el.x,
			a.el.y = a.data.y = this.el.y,
			a
		},
		get: function(a) {
			return this.data[a]
		},
		set: function(a, b) {
			this.data[a] = b,
			this.el.x = this.get("x"),
			this.el.y = this.get("y")
		},
		getAroundBub: function() {
			var a = this.data,
			b = a.row,
			c = a.col,
			d = a.TOTALCOL,
			e = this.data.bubbleArray,
			f = [];
			return f = 0 == a.row % 2 ? 0 == a.row ? 0 == a.col ? [e[b][c + 1], e[b + 1][c]] : a.col == d - 1 ? [e[b + 1][c - 1], e[b][c - 1]] : [e[b][c + 1], e[b + 1][c], e[b + 1][c - 1], e[b][c - 1]] : 0 == a.col ? [e[b - 1][c], e[b][c + 1], e[b + 1][c]] : a.col == d - 1 ? [e[b - 1][c - 1], e[b + 1][c - 1], e[b][c - 1]] : [e[b - 1][c - 1], e[b - 1][c], e[b][c + 1], e[b + 1][c], e[b + 1][c - 1], e[b][c - 1]] : 0 == a.col ? [e[b - 1][c], e[b - 1][c + 1], e[b][c + 1], e[b + 1][c + 1], e[b + 1][c]] : a.col == d - 2 ? [e[b - 1][c], e[b - 1][c + 1], e[b + 1][c + 1], e[b + 1][c], e[b][c - 1]] : [e[b - 1][c], e[b - 1][c + 1], e[b][c + 1], e[b + 1][c + 1], e[b + 1][c], e[b][c - 1]]
		},
		getAroundBubPos: function() {
			var a = this.data,
			b = a.row,
			c = a.col,
			d = a.TOTALCOL;
			this.data.bubbleArray;
			var f = [];
			return f = 0 == b % 2 ? 0 == b ? 0 == c ? [[b, c + 1], [b + 1, c]] : c == d - 1 ? [[b + 1, c - 1], [b, c - 1]] : [[b, c + 1], [b + 1, c], [b + 1, c - 1], [b, c - 1]] : 0 == c ? [[b - 1, c], [b, c + 1], [b + 1, c]] : c == d - 1 ? [[b - 1, c - 1], [b + 1, c - 1], [b, c - 1]] : [[b - 1, c - 1], [b - 1, c], [b, c + 1], [b + 1, c], [b + 1, c - 1], [b, c - 1]] : 0 == c ? [[b - 1, c], [b - 1, c + 1], [b, c + 1], [b + 1, c + 1], [b + 1, c]] : c == d - 2 ? [[b - 1, c], [b - 1, c + 1], [b + 1, c + 1], [b + 1, c], [b, c - 1]] : [[b - 1, c], [b - 1, c + 1], [b, c + 1], [b + 1, c + 1], [b + 1, c], [b, c - 1]]
		}
	};
	var j = function(c) {
		this.stageW = b,
		this.stageH = a,
		this.p = c.parent,
		this.stageId = c.stageId,
		this.leftTime = 0,
		this.gameTime = 0,
		this.decScore = 0,
		this.addScore = 0,
		this.el = {},
		this.bubbleW = 100,
		this.bubbleH = 100,
		this.bubbleV = 25,
		this.gameTime = 0,
		this.ball_cols = 13,
		this.bubbleAnim = !1,
		this.stoneEnable = !1,
		this.stoneOdds = .1,
		this.stone_max = 5,
		this.stone_cur = 0,
		this._pause = !1,
		this.bubbleToDisappear = [],
		this.lenArra = [],
		this._vx = 0,
		this._vy = 0,
		this.row = 0,
		this.col = 0,
		this.core_r,
		this.core_c,
		this.initX = 0,
		this.initY = 0,
		this.shoot = !1,
		this.ROW = 3,
		this.RADIUS = 100,
		this.MAP_UNIT = 100,
		this.MAP_EL_W = 100,
		this.MAP_EL_H = 90,
		this.TOTALROW = 15,
		this.TOTALCOL = 8,
		this.sameBubbleTotal = [],
		this.dropArr = [],
		this.temDropArr = [],
		this.dropLenArr = [],
		this.bubbleArray = [],
		this.score = 0,
		this.aniCount = 0,
		this.addEnterFrame = !1,
		this.bulletArr = [],
		this.addBuCount = 0,
		this.init()
	};
	j.prototype = {
		init: function() {
			var a = document.getElementById(this.stageId);
			this.el.canvas = a,
			this.stage = new createjs.Stage(a),
			createjs.Touch.enable(this.stage, !0);
			var b = this;
			this.addEnterFrame || createjs.Ticker.addEventListener("tick",
			function() {
				b.tick()
			})
		},
		createEls: function() {
			this.bgShape = new createjs.Shape,
			this.bgShape.graphics.beginFill("#1b4e83").drawRect(74, 0, b, a),
			this.stage.addChild(this.bgShape),
			this.barBg = new createjs.Shape,
			this.barBg.graphics.beginFill("#00a0e9").drawRect(97, 24, 500, 18),
			this.barBg.visible = !1,
			this.stage.addChild(this.barBg),
			this.bar = new createjs.Shape,
			this.bar.graphics.beginFill("#fff").drawRect(97, 24, 500, 18),
			this.bar.visible = !1,
			this.stage.addChild(this.bar),
			this.overline = new createjs.Bitmap(loader.getResult("overline")),
			this.overline.x = 0,
			this.overline.y = a - 336,
			this.overline.setTransform(0, a - 336, 1.35, 1),
			this.stage.addChild(this.overline),
			this.leftBottle = new createjs.Bitmap(loader.getResult("leftBottle")),
			this.leftBottle.x = 30,
			this.leftBottle.y = a - 270,
			this.stage.addChild(this.leftBottle),
			this.leftNo = new createjs.Bitmap(loader.getResult("no")),
			this.leftNo.x = 70,
			this.leftNo.y = a - 180,
			this.leftNod = new createjs.Bitmap(loader.getResult("nod")),
			this.leftNod.x = 45,
			this.leftNod.y = a - 115,
			this.leftNod.alpha = 0,
			this.stage.addChild(this.leftNo),
			this.stage.addChild(this.leftNod),
			this.ringIcon = new createjs.Bitmap(loader.getResult("ring")),
			this.ringIcon.x = 90,
			this.ringIcon.y = 25,
			this.stage.addChild(this.ringIcon);
			var c = new createjs.SpriteSheet({
				images: [loader.getResult("down1"), loader.getResult("down2")],
				frames: [[0, 0, 52, 110, 0, 26, 110], [0, 0, 42, 174, 1, 21, 174]],
				animations: {
					down1: {
						frames: [0],
						next: "down1",
						speed: .05
					},
					down2: {
						frames: [1],
						next: "down2",
						speed: .05
					}
				}
			});
			this.downSprite = new createjs.Sprite(c, "down2"),
			this.downSprite.x = 685,
			this.downSprite.y = a - 756,
			this.downSprite.visible = !1,
			this.stage.addChild(this.downSprite);
			var d = new createjs.SpriteSheet({
				images: [loader.getResult("X")],
				frames: [[0, 0, 100, 100, 0, 26, 110]],
				animations: {
					down3: {
						frames: [0],
						next: "down3",
						speed: .05
					}
				}
			});
			this.downSprite2 = new createjs.Sprite(d, "down3"),
			this.downSprite2.x = 95,
			this.downSprite2.y = a - 756,
			this.downSprite2.visible = !1,
			this.stage.addChild(this.downSprite2);
			var e = new createjs.SpriteSheet({
				images: [loader.getResult("rightBottle")],
				frames: {
					width: 152,
					height: 260,
					count: 4,
					regX: 72,
					regY: 0
				},
				animations: {
					state1: {
						frames: [0]
					},
					state2: {
						frames: [1]
					},
					state3: {
						frames: [2]
					},
					state4: {
						frames: [3]
					}
				}
			});
			this.rightBottle = new createjs.Sprite(e, "state1"),
			this.rightBottle.x = 680,
			this.rightBottle.y = a - 270,
			this.stage.addChild(this.rightBottle);
			var f = new createjs.Bitmap(loader.getResult("nipple")),
			g = f.getBounds();
			f.x = -g.width / 2,
			f.y = -g.height,
			this.nippleCon = new createjs.Container,
			this.nippleCon.x = 300,
			this.nippleCon.y = a - 186,
			this.nippleCon.rotation = 13,
			this.nippleCon.addChild(f),
			this.stage.addChild(this.nippleCon);
			var h = new createjs.SpriteSheet({
				images: [loader.getResult("man")],
				frames: {
					width: 245,
					height: 330,
					count: 3,
					regX: 132,
					regY: 330
				},
				animations: {
					state1: {
						frames: [0],
						next: "state2",
						speed: .05
					},
					state2: {
						frames: [1],
						next: "state2",
						speed: .05
					},
					state3: {
						frames: [2],
						next: "state2",
						speed: .05
					}
				}
			});
			this.manSprite = new createjs.Sprite(h, "state2"),
			this.manSprite.x = 450,
			this.manSprite.y = a - 20,
			this.stage.addChild(this.manSprite);
			var i = new createjs.SpriteSheet({
				images: [loader.getResult("down_tips")],
				frames: {
					width: 44,
					height: 150,
					count: 3,
					regX: 0,
					regY: 0
				},
				animations: {
					state1: {
						frames: [0],
						next: "state1",
						speed: .3
					},
					state2: {
						frames: [1],
						next: "state2",
						speed: .3
					},
					state3: {
						frames: [2],
						next: "state3",
						speed: .3
					}
				}
			});
			this.tipsSprite = new createjs.Sprite(i, "state1"),
			this.tipsSprite.x = 650,
			this.tipsSprite.scaleX = 1.5,
			this.tipsSprite.scaleY = 1.5,
			this.tipsSprite.visible = !1,
			this.tipsSprite.y = a - 600,
			this.stage.addChild(this.tipsSprite);
			var j = new createjs.Bitmap(loader.getResult("a")),
			k = j.getBounds();
			j.x = -k.width / 2,
			j.y = -k.height / 2,
			this.dec = new createjs.Container,
			this.dec.x = 175,
			this.dec.y = a - 51,
			this.dec.addChild(j),
			this.stage.addChild(this.dec);
			var l = new createjs.Bitmap(loader.getResult("add")),
			m = l.getBounds();
			l.x = -m.width / 2,
			l.y = -m.height / 2,
			this.add = new createjs.Container,
			this.add.x = 620,
			this.add.y = a - 51,
			this.add.addChild(l),
			this.stage.addChild(this.add),
			this.decTxt = new createjs.Text(this.decScore.toString(), "bold 55px Arial", "#898989"),
			this.decTxt.x = 100,
			this.decTxt.y = a - 110,
			this.decTxt.textAlign = "center",
			this.stage.addChild(this.decTxt),
			this.addTxt = new createjs.Text("0", "bold 55px Arial", "#ff9700"),
			this.addTxt.x = 680,
			this.addTxt.y = a - 110,
			this.addTxt.textAlign = "center",
			this.stage.addChild(this.addTxt),
			this.timeTxt = new createjs.Text("60", "bold 40px Microsoft Yahei", "#fff"),
			this.timeTxt.x = 28,
			this.timeTxt.y = 10,
			this.stage.addChild(this.timeTxt),
			this.bubbleContainer = new createjs.Container,
			this.bubbleContainer.x = 0,
			this.bubbleContainer.y = 65,
			this.stage.addChild(this.bubbleContainer),
			this.stage.update()
		},
		initBubbles: function() {
			for (var a = 0; a < this.TOTALROW; a++) {
				this.bubbleArray[c] = [];
				for (var b = 0; b < this.TOTALCOL; b++) this.bubbleArray[c][b] = null
			}
			for (var c = 0; c < this.TOTALROW; c++) if (this.bubbleArray[c] = [], c < this.ROW) for (var d = 0; d < this.TOTALCOL; d++) {
				var e = {};
				e.bubbleArray = this.bubbleArray,
				0 == c % 2 ? (e.x = d * this.MAP_EL_W, e.y = c * this.MAP_EL_H, e.row = c, e.col = d, e.TOTALCOL = this.TOTALCOL, e.MAP_EL_W = this.MAP_EL_W, e.MAP_EL_H = this.MAP_EL_H, this.bubbleArray[c][d] = new h(e), this.bubbleContainer.addChild(this.bubbleArray[c][d].el)) : d == this.TOTALCOL - 1 ? this.bubbleArray[c][d] = null: (e.x = d * this.MAP_EL_W + this.MAP_EL_W / 2, e.y = c * this.MAP_EL_H, e.row = c, e.col = d, e.TOTALCOL = this.TOTALCOL, e.MAP_EL_W = this.MAP_EL_W, e.MAP_EL_H = this.MAP_EL_H, this.bubbleArray[c][d] = new h(e), this.bubbleContainer.addChild(this.bubbleArray[c][d].el))
			} else this.bubbleArray[c] = [];
			this.setBullet(),
			this.stage.update(),
			this.bubbleArray.length = this.TOTALROW
		},
		createBubble: function() {},
		setBullet: function() {
			var a = this;
			this.bulletArr[0] || (this.bulletArr[0] = this.createSecondBullet(250, this.stageH - 300), this.bubbleContainer.addChild(this.bulletArr[0].el)),
			this.bulletArr[1] || (this.bulletArr[1] = this.createSecondBullet(200, this.stageH - 200), this.bubbleContainer.addChild(this.bulletArr[1].el)),
			this.bullet = this.bulletArr[0],
			this.stage.update(),
			this.el.canvas.addEventListener("touchstart",
			function() {
				a.shoot || ($("#shootAudio")[0].play(), $("#bgAudio")[0].play(), a.clickHandler(), a.bulletArr[1].data.x = 250, a.bulletArr[1].data.y = a.stageH - 300, createjs.Tween.get(a.bulletArr[1].el).to({
					y: a.stageH - 300,
					x: 250
				},
				200, createjs.Ease.linear), a.bulletArr.shift())
			})
		},
		createSecondBullet: function(a, b) {
			var c = {};
			return c.x = a,
			c.y = b,
			c.bubbleArray = this.bubbleArray,
			c.TOTALCOL = this.TOTALCOL,
			c.MAP_EL_W = this.MAP_EL_W,
			c.MAP_EL_H = this.MAP_EL_H,
			c.isBullet = !0,
			c.type = Math.floor(3 * Math.random()),
			new h(c)
		},
		clickHandler: function() {
			this.initX = this.bullet.get("x"),
			this.initY = this.bullet.get("y"),
			this.initMouseX = this.stage.mouseX,
			this.initMouseY = this.stage.mouseY,
			this.initMouseY > a - 536 && (this.initMouseY = a - 536);
			var c = 180 * Math.atan2(this.initMouseY - this.nippleCon.y, this.initMouseX - this.nippleCon.x) / Math.PI + 13 + 90;
			this.nippleCon.rotation = c,
			175 * Math.cos(c * (Math.PI / 180)),
			175 * Math.sin(c * (Math.PI / 180));
			var f = 30;
			this._vx = f * Math.cos(Math.atan((this.initMouseY - (this.initY + this.RADIUS / 2)) / (this.initMouseX - (this.initX + this.RADIUS / 2)))),
			this._vy = f * Math.sin(Math.atan((this.initMouseY - (this.initY + this.RADIUS / 2)) / (this.initMouseX - (this.initX + this.RADIUS / 2)))),
			this.shoot = !0
		},
		start: function() {
			this.createEls(),
			this.initBubbles()
		},
		checkHit: function() {
			if (this.shoot && this.bullet) for (var a = 0; a < this.TOTALROW; a++) for (var b = 0; b < this.TOTALCOL; b++) if (this.bubbleArray[a][b]) {
				var c = this.bullet.get("x") + this.bubbleW / 2,
				d = this.bullet.get("y") + this.bubbleH / 2,
				e = this.bubbleArray[a][b].get("x") + this.bubbleW / 2,
				f = this.bubbleArray[a][b].get("y") + this.bubbleH / 2;
				if (Math.sqrt(Math.pow(e - c, 2) + Math.pow(f - d, 2)) < this.bubbleW) {
					if (3 == this.bubbleArray[a][b].get("type")) {
						this.manSprite.gotoAndPlay("state1"),
						this.decScore++,
						this.decScore < 0 && (this.decScore = 0),
						createjs.Tween.get(this.dec).to({
							scaleX: 1.5,
							scaleY: 1.5
						},
						300, createjs.Ease.linear).to({
							scaleX: 1,
							scaleY: 1
						},
						300, createjs.Ease.linear),
						this.decTxt.text = this.decScore.toString(),
						this.leftNod.alpha += .2;
						var g = this.addScore - this.decScore;
						0 > g && (g = 0),
						this.downAni2(),
						$(".score-inner").text(g)
					} else this.manSprite.gotoAndPlay("state3");
					this._vx = 0,
					this._vy = 0,
					this.row = a,
					this.col = b,
					this.setPosition(),
					this.setBullet();
					break
				}
			}
		},
		setPosition: function() {
			this.shoot = !1;
			var a = this.row,
			b = this.col,
			c = 0;
			this.core_r,
			this.core_c;
			var f = this.TOTALCOL;
			this.TOTALROW;
			var m, i = this.bubbleArray,
			j = this.bubbleArray[a][b].getSuroundPosition(),
			k = [],
			l = this.bubbleArray[a][b].getAroundBub(),
			n = [];
			for (0 == a % 2 ? 0 == a ? 0 == b ? (n = [[a, b + 1], [a + 1, b]], m = [2, 3]) : b == f - 1 ? (n = [[a + 1, b - 1], [a, b - 1]], m = [4, 5]) : (n = [[a, b + 1], [a + 1, b], [a + 1, b - 1], [a, b - 1]], m = [2, 3, 4, 5]) : 0 == b ? (n = [[a - 1, b], [a, b + 1], [a + 1, b]], m = [1, 2, 3]) : b == f - 1 ? (n = [[a - 1, b - 1], [a + 1, b - 1], [a, b - 1]], m = [0, 4, 5]) : (n = [[a - 1, b - 1], [a - 1, b], [a, b + 1], [a + 1, b], [a + 1, b - 1], [a, b - 1]], m = [0, 1, 2, 3, 4, 5]) : 0 == b ? (n = [[a - 1, b], [a - 1, b + 1], [a, b + 1], [a + 1, b + 1], [a + 1, b]], m = [0, 1, 2, 3, 4]) : b == f - 2 ? (n = [[a - 1, b], [a - 1, b + 1], [a + 1, b + 1], [a + 1, b], [a, b - 1]], m = [0, 1, 3, 4, 5]) : (n = [[a - 1, b], [a - 1, b + 1], [a, b + 1], [a + 1, b + 1], [a + 1, b], [a, b - 1]], m = [0, 1, 2, 3, 4, 5]), c = 0; c < l.length; c++)(void 0 == l[c] || null == l[c]) && k.push([this.bullet.getDistance(j[c]), n[c], m[c]]);
			k.sort(function(a, b) {
				return a[0] - b[0]
			}),
			this.core_r = k[0][1][0],
			this.core_c = k[0][1][1];
			var o = {};
			o.bubbleArray = this.bubbleArray,
			o.x = j[k[0][2]][0],
			o.y = j[k[0][2]][1],
			o.row = this.core_r,
			o.col = this.core_c,
			o.TOTALCOL = this.TOTALCOL,
			o.MAP_EL_W = this.MAP_EL_W,
			o.MAP_EL_H = this.MAP_EL_H,
			o.type = this.bullet.get("type"),
			i[this.core_r][this.core_c] = new h(o),
			this.bubbleContainer.addChild(i[this.core_r][this.core_c].el),
			this.bubbleContainer.removeChild(this.bullet.el),
			this.bullet = null;
			var p = this.firstSearch(i[this.core_r][this.core_c]),
			q = this.sameBubbleTotal;
			if (q = 0 == p.lenth ? null: this.searchSameColor(p), q.length > 2) {
				for (var r = 0; r < q.length; r++) {
					var s = q[r];
					s.el.parent;
					var u = s.el;
					this.bombBubble(u, s.get("type")),
					i[s.get("row")][s.get("col")] = null,
					q[r] = null
				}
				this.search1()
			} else {
				var v = this.searchWrongBuble(i[this.core_r][this.core_c])[0];
				if (v) {
					var u = v.el;
					this.bombBubble(u, v.get("type")),
					i[v.get("row")][v.get("col")] = null,
					this.search1()
				}
			}
			this.checkGameOver()
		},
		firstSearch: function(a) {
			var b;
			this.bubbleArray,
			b = a.getAroundBub();
			for (var d = b.length - 1; d > -1; d--)(!b[d] || b[d] && b[d].get("type") != a.get("type")) && b.splice(d, 1);
			return b
		},
		searchWrongBuble: function(a) {
			var b;
			this.bubbleArray,
			b = a.getAroundBub();
			for (var d = b.length - 1; d > -1; d--)(!b[d] || b[d] && 3 != b[d].get("type")) && b.splice(d, 1);
			return b
		},
		searchSameColor: function(a) {
			for (var b = 0; b < a.length; b++) {
				a = a.concat(this.searchAroundSameColor(this.bubbleArray, a[b].get("row"), a[b].get("col")));
				for (var c = [], d = 0; d < a.length; d++) - 1 == c.indexOf(a[d]) && c.push(a[d]);
				a = c
			}
			var e = this.lenArra;
			return e.push(a.length),
			e[e.length - 1] == e[e.length - 2] ? a: (this.searchSameColor(a), a)
		},
		searchAroundSameColor: function(a, b, c) {
			var d = [];
			d = a[b][c].getAroundBub();
			for (var e = d.length - 1; e > -1; e--)(!d[e] || d[e] && d[e].get("type") != a[b][c].get("type")) && d.splice(e, 1);
			return d
		},
		search1: function() {
			for (var c, a = this.bubbleArray,
			b = [], d = [], e = 0; e < this.TOTALCOL; e++) {
				var f = a[0][e];
				if (f) {
					var g = this.searchAround(f);
					for (c = 0, d = []; c < g.length; c++) - 1 == d.indexOf(g[c]) && d.push(g[c]);
					b = b.concat(d)
				}
			}
			for (c = 0, d = []; c < b.length; c++) - 1 == d.indexOf(b[c]) && d.push(b[c]);
			b = d;
			for (var h = 0; h < this.TOTALROW; h++) for (var i = 0; i < this.TOTALCOL; i++) a[h][i] && -1 == b.indexOf(a[h][i]) && (this.bombBubble(a[h][i].el, a[h][i].get("type")), a[h][i] = null)
		},
		searchAround: function(a) {
			this.bubbleArray;
			for (var c, d = a.getAroundBub(), e = d.length - 1; e > -1; e--) d[e] || d.splice(e, 1);
			return 0 == d.length ? [a] : c = this.searchSlings(d)
		},
		searchSlings: function(a) {
			for (var b = 0; b < a.length; b++) {
				a = a.concat(a[b].getAroundBub());
				for (var c = a.length - 1; c > -1; c--) a[c] || a.splice(c, 1);
				for (var d = 0,
				e = []; d < a.length; d++) - 1 == e.indexOf(a[d]) && e.push(a[d]);
				a = e
			}
			var f = this.dropLenArr;
			return f.push(a.length),
			f[f.length - 1] == f[f.length - 2] ? a: (this.searchSlings(a), a)
		},
		searchAroundNear: function(a, b, c) {
			var d = [];
			d = a[b][c].getAroundBub();
			for (var e = d.length - 1; e > -1; e--) d[e] || d.splice(e, 1);
			return d
		},
		getAroundBubDis: function(a, b, c) {
			var d = {};
			0 == a % 2 ? (d.x = b * this.get("MAP_EL_W"), d.y = a * this.get("MAP_EL_H")) : (d.x = b * this.get("MAP_EL_W") + this.get("MAP_EL_W") / 2, d.y = a * this.get("MAP_EL_H")),
			d.col = b,
			d.row = a;
			var e = c.get("x") - d.x,
			f = c.get("y") - d.y;
			return d.dis = Math.sqrt(e * e, f * f),
			d
		},
		downBubbles: function() {
			this.bubbleArray;
			for (var b = 0; b < this.bubbleArray.length; b++) for (var c = 0; c < this.TOTALCOL; c++);
		},
		bombBubble: function(a, b) {
			var d = this;
			if (3 == b);
			else {
				this.addScore++,
				this.aniCount++,
				$("#hitAudio")[0].play(),
				createjs.Tween.get(this.add).to({
					scaleX: 1.5,
					scaleY: 1.5
				},
				300, createjs.Ease.linear).to({
					scaleX: 1,
					scaleY: 1
				},
				300, createjs.Ease.linear),
				this.addScore >= 40 ? this.rightBottle.gotoAndStop("state4") : this.addScore >= 30 ? this.rightBottle.gotoAndStop("state3") : this.addScore >= 20 && this.rightBottle.gotoAndStop("state2"),
				this.aniCount >= 5 && (this.aniCount = 0, this.downAni(), setTimeout(function() {
					d.tipsAni()
				},
				300)),
				this.addTxt.text = this.addScore.toString();
				var e = this.addScore - this.decScore;
				0 > e && (e = 0),
				$(".score-inner").text(e)
			}
			a.gotoAndPlay("bomb");
			var d = this;
			a.addEventListener("tick",
			function(a) {
				11 == a.currentTarget.currentFrame && setTimeout(function() {
					a.currentTarget.stop(),
					d.bubbleContainer.contains(a.currentTarget) && d.bubbleContainer.removeChild(a.currentTarget),
					a.currentTarget.removeEventListener("tick")
				},
				300)
			})
		},
		checkGameOver: function() {
			var b = Math.ceil(a / 150);
			for (i = 0; i < this.TOTALCOL; i++) if (this.bubbleArray[b][i]) {
				var c = this.addScore - this.decScore;
				window.localStorage.score = 0 > c ? 0 : c,
				window.gameOver()
			}
		},
		downAni: function() {
			var b = 1 * Math.random() > .5 ? "down1": "down2";
			this.downSprite.visible = !0,
			this.downSprite.scaleX = this.downSprite.scaleY = 2,
			this.downSprite.gotoAndStop(b),
			createjs.Tween.get(this.downSprite).to({
				y: a - 200,
				scaleX: .8,
				scaleY: .8,
				alpha: .4
			},
			1100, createjs.Ease.linear).set({
				visible: !1,
				x: 685,
				y: a - 756,
				scaleX: 1,
				scaleY: 1,
				alpha: 1
			})
		},
		tipsAni: function() {
			var a = Math.ceil(3 * Math.random());
			this.tipsSprite.visible = !0,
			this.tipsSprite.scaleX = this.downSprite.scaleY = 2,
			this.tipsSprite.gotoAndPlay("state" + a),
			createjs.Tween.get(this.tipsSprite).to({
				scaleX: 1.6,
				scaleY: 1.6
			},
			1e3, createjs.Ease.linear).set({
				visible: !1,
				scaleX: 1.5,
				scaleY: 1.5
			})
		},
		downAni2: function() {
			this.downSprite2.visible = !0,
			this.downSprite2.scaleX = this.downSprite.scaleY = 1,
			this.downSprite2.gotoAndStop("down3"),
			createjs.Tween.get(this.downSprite2).to({
				y: a - 200,
				scaleX: .4,
				scaleY: .4,
				alpha: .4
			},
			1100, createjs.Ease.linear).set({
				visible: !1,
				x: 95,
				y: a - 756,
				scaleX: 1,
				scaleY: 1,
				alpha: 1
			})
		},
		tick: function() {
			var a, b, c;
			if (this.shoot && this.bullet) {
				var d, e;
				if (this.initMouseX - this.MAP_EL_W / 2 >= this.initX ? (d = this.bullet.get("x") + this._vx, e = this.bullet.get("y") + this._vy, this.bullet.set("x", d), this.bullet.set("y", e)) : this.initMouseX - this.MAP_EL_W / 2 < this.initX && (d = this.bullet.get("x") - this._vx, e = this.bullet.get("y") - this._vy, this.bullet.set("x", d), this.bullet.set("y", e)), this.bullet.get("x") < 0 ? (this.bullet.set("x", 0), this._vx *= -1) : this.bullet.get("x") > this.stageW - this.MAP_EL_W && (this.bullet.set("x", this.stageW - this.MAP_EL_W), this._vx *= -1), this.bullet.get("y") < 0) {
					for (var g = Math.abs(this.bullet.get("x")), i = g, j = 0, a = 0; a < this.TOTALCOL; a++) {
						var k = Math.abs(g - a * this.MAP_EL_W);
						i > k && !this.bubbleArray[0][a] && (i = k, j = a)
					}
					c = {},
					c.bubbleArray = this.bubbleArray,
					c.x = j * this.MAP_EL_W,
					c.y = 0,
					c.row = 0,
					c.col = j,
					c.TOTALCOL = this.TOTALCOL,
					c.MAP_EL_W = this.MAP_EL_W,
					c.MAP_EL_H = this.MAP_EL_H,
					c.type = this.bullet.get("type"),
					this.bubbleArray[0][j] = new h(c),
					this.bubbleContainer.addChild(this.bubbleArray[0][j].el),
					this.bubbleContainer.removeChild(this.bullet.el),
					this.bullet = null,
					this.shoot = !1,
					this.setBullet()
				}
				this.checkHit()
			}
			var l = this.leftGameTime / this.gameTime;
			if (this.bar.graphics.clear(), this.bar.graphics.beginFill("#fff").drawRect(97, 24, 500 * l, 18), this.addBuCount >= 5 && !this.shoot) {
				this.addBuCount = 0;
				var n = 0;
				for (a = this.TOTALROW - 2; a >= 0; a--) for (b = 0; b < this.TOTALCOL; b++) {
					var c = this.bubbleArray[a][b];
					if (c) for (var o = c.getAroundBub(), p = c.getAroundBubPos(), q = 0; q < o.length; q++) {
						var r = 1 * Math.random() < .2 ? !0 : !1; ! o[q] && r && 6 > n && (c = {},
						c.bubbleArray = this.bubbleArray, 0 == p[q][0] % 2 ? (c.x = p[q][1] * this.MAP_EL_W, c.y = p[q][0] * this.MAP_EL_H, c.row = p[q][0], c.col = p[q][1], c.TOTALCOL = this.TOTALCOL, c.MAP_EL_W = this.MAP_EL_W, c.MAP_EL_H = this.MAP_EL_H, this.bubbleArray[p[q][0]][p[q][1]] = new h(c), this.bubbleContainer.addChild(this.bubbleArray[p[q][0]][p[q][1]].el), n++) : p[q][1] == this.TOTALCOL - 1 ? this.bubbleArray[p[q][0]][p[q][1]] = null: (c.x = p[q][1] * this.MAP_EL_W + this.MAP_EL_W / 2, c.y = p[q][0] * this.MAP_EL_H, c.row = p[q][0], c.col = p[q][1], c.TOTALCOL = this.TOTALCOL, c.MAP_EL_W = this.MAP_EL_W, c.MAP_EL_H = this.MAP_EL_H, this.bubbleArray[p[q][0]][p[q][1]] = new h(c), this.bubbleContainer.addChild(this.bubbleArray[p[q][0]][p[q][1]].el), n++)),
						this.checkGameOver()
					}
				}
			}
			this.stage.update()
		}
	}
});