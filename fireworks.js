var cv = document.getElementById("cnv");
var ctx = cv.getContext('2d');
		
		window.onload = function()
		{
			cv.width = window.innerWidth;
			cv.height = window.innerHeight;
			ctx.fillStyle="black";
			ctx.fillRect(0,0,cv.width,cv.height);
			var centerX = cv.width /2 - 45;
			var centerY = cv.height / 2 - 90;
			
			
			function drawCircle() {
				
			}
			
			var particles = {};
			var particleIndex = 0;
			var particleNum = 3;
			
			function Particle(x,y,vx,vy,c,l)
			{
				this.x = x;
				this.y = y;
				this.vx = vx;
				this.vy = vy;
				particleIndex++;
				particles[particleIndex] = this;
				this.id = particleIndex;
				this.life = 0;
				this.max_life=l;
				this.color = c;
			}
			
			Particle.prototype.draw = function()
			{
				this.x += this.vx;
				this.y += this.vy;
				this.life++;
				if (this.life == this.max_life)
				{
					delete particles[this.id];
				}
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x,this.y,10,10);
			}
			
			function getRndColor() {
				var r = 255*Math.random()|0,
					g = 255*Math.random()|0,
					b = 255*Math.random()|0;
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			}
			
			setInterval(function() { 
					for (var i = 0; i < particleNum; i++)
					{
						new Particle(centerX,centerY,Math.random() * 10 -5,Math.random() * 10 - 5,getRndColor(),50);
						new Particle(centerX-200,centerY-200,Math.random()*10 -5,Math.random() * 10 -5,"red",200);
						new Particle(centerX+200,centerY+200,Math.random()*10 -5,Math.random() * 10 -5,"#996600",200);
						new Particle(centerX-200,centerY+200,Math.random()*10-5,Math.random() * 10 -5,"teal",200);
						new Particle(centerX+200,centerY-208,Math.random()*10-5,Math.random() * 10 -5,"green",200);
						new Particle(centerX-500,centerY,Math.random()*10-5,Math.random() * 10-5,"blue",200);
						new Particle(centerX+500,centerY,Math.random()*10-5,Math.random() * 10-5,"purple",200);
					}
					
					ctx.globalCompositeOperation = "source-over";
					ctx.fillStyle="rgba(0,0,0,0.2)";
					ctx.fillRect(0,0,cv.width,cv.height);
					drawCircle();
					ctx.globalCompositeOperation = "lighter";
					for (var i in particles)
					{
						particles[i].draw();
					}
				},30);
			
			
				
		}