		var cv = document.getElementById("cnv");
		var ctx = cv.getContext('2d');
        var mouseX = 0;
        var mouseY = 0;
        var rect = cv.getBoundingClientRect();
        var score = 0;
        var bestscore = 0;
        var player = {};
		
		window.onload = function()
		{
			cv.width = window.innerWidth;
			cv.height = window.innerHeight;
			ctx.fillStyle="black";
			ctx.fillRect(0,0,cv.width,cv.height);
			var centerX = cv.width /2 - 45;
			var centerY = cv.height / 2 - 90;
            player = new Player();
           
            
            function Player()
            {
                 this.x = mouseX;
                 this.y = mouseY;
                 this.radius = 10;
            }
            
            Player.prototype.draw = function() {
                
                ctx.beginPath();
                ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
                ctx.fill();
                ctx.closePath();
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
                this.collide = false;
                
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
                if (Math.abs(Math.floor(this.x) - Math.floor(player.x)) < player.radius 
					&& Math.abs(Math.floor(this.y) - Math.floor(player.y)) < player.radius)
				{
					this.collide = true;
                }
			}
			
			function getRndColor() {
				var r = 255*Math.random()|0,
					g = 255*Math.random()|0,
					b = 255*Math.random()|0;
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			}
            
            cv.addEventListener('mousemove',function(evt){ 
                mouseX = evt.clientX - rect.left;
                mouseY = evt.clientY - rect.top;
                
            },false);
			
            
			setInterval(function() { 
					for (var i = 0; i < particleNum; i++)
					{
						new Particle(Math.random() * 2000,Math.random() * 1000,Math.random() * 10 -5,Math.random() * 10 - 5,getRndColor(),50);
					}
					
					ctx.globalCompositeOperation = "source-over";
					ctx.fillStyle="rgba(0,0,0,0.2)";
					ctx.fillRect(0,0,cv.width,cv.height);
                    ctx.fillStyle="rgba(255,0,0,0.4)";
                    player.draw();
					for (var i in particles)
					{
						particles[i].draw();
                        
					}
                    ctx.fillStyle = "white";
                    ctx.font = "30px Arial";
                    ctx.fillText("Size: "+score+" | Best: "+bestscore,50,900);
				},30);
            
            setInterval(function() {
                player.x=mouseX;
                player.y=mouseY;
                for (var i in particles)
                    {
                        if (particles[i].collide)
                        {
                          score++;
                          if (score > bestscore) bestscore++;
                          if (player.radius <= 100) player.radius++;
                          delete particles[i];   
                        }
                    }            
            },30);
				
            setInterval(function() {
                if (score > 0) score--;
                if (player.radius > 10) player.radius--;            
            },1000);
		}