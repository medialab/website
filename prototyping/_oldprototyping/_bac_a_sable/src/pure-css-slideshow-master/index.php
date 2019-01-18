<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Pure CSS slideshow</title>
	<meta name="description" content="Pure CSS slideshow">
	<meta name="author" content="Jochen Vandendriessche">
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/default.css">
	<link rel="stylesheet" href="css/slideshow.css">
</head>
<body>

<div class="page">

	<h1>Pure CSS slideshow</h1>

	<p>A proof of concept to have an image slideshow without javascript</p>

	<h2>No animation:</h2>
	<div class="slideshow">
		<input type="radio" name="ss1" id="ss1-item-1" class="slideshow--bullet" checked="checked" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/1" />
			<label for="ss1-item-3" class="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
			<label for="ss1-item-2" class="slideshow--nav slideshow--nav-next">Go to slide 2</label>
		</div>
	
		<input type="radio" name="ss1" id="ss1-item-2" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/2" />
			<label for="ss1-item-1" class="slideshow--nav slideshow--nav-previous">Go to slide 1</label>
			<label for="ss1-item-3" class="slideshow--nav slideshow--nav-next">Go to slide 3</label>
		</div>
	
		<input type="radio" name="ss1" id="ss1-item-3" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/3" />
			<label for="ss1-item-2" class="slideshow--nav slideshow--nav-previous">Go to slide 2</label>
			<label for="ss1-item-4" class="slideshow--nav slideshow--nav-next">Go to slide 4</label>
		</div>
		
		<input type="radio" name="ss1" id="ss1-item-4" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/people/3" />
			<label for="ss1-item-3" class="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
			<label for="ss1-item-1" class="slideshow--nav slideshow--nav-next">Go to slide 1</label>
		</div>

	</div>
	
	<h2>Fading:</h2>
	<div class="slideshow" data-transition="fade">
		<input type="radio" name="ss2" id="ss2-item-1" class="slideshow--bullet" checked="checked" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/1" />
			<label for="ss2-item-3" class="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
			<label for="ss2-item-2" class="slideshow--nav slideshow--nav-next">Go to slide 2</label>
		</div>
	
		<input type="radio" name="ss2" id="ss2-item-2" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/2" />
			<label for="ss2-item-1" class="slideshow--nav slideshow--nav-previous">Go to slide 1</label>
			<label for="ss2-item-3" class="slideshow--nav slideshow--nav-next">Go to slide 3</label>
		</div>
	
		<input type="radio" name="ss2" id="ss2-item-3" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/3" />
			<label for="ss2-item-2" class="slideshow--nav slideshow--nav-previous">Go to slide 2</label>
			<label for="ss2-item-4" class="slideshow--nav slideshow--nav-next">Go to slide 4</label>
		</div>
		
		<input type="radio" name="ss2" id="ss2-item-4" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/people/3" />
			<label for="ss2-item-3" class="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
			<label for="ss2-item-1" class="slideshow--nav slideshow--nav-next">Go to slide 1</label>
		</div>

	</div>
	
	<h2>Zoom in:</h2>
	<div class="slideshow" data-transition="zoom">
		<input type="radio" name="ss3" id="ss3-item-1" class="slideshow--bullet" checked="checked" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/1" />
			<label for="ss3-item-3" class="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
			<label for="ss3-item-2" class="slideshow--nav slideshow--nav-next">Go to slide 2</label>
		</div>
	
		<input type="radio" name="ss3" id="ss3-item-2" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/2" />
			<label for="ss3-item-1" class="slideshow--nav slideshow--nav-previous">Go to slide 1</label>
			<label for="ss3-item-3" class="slideshow--nav slideshow--nav-next">Go to slide 3</label>
		</div>
	
		<input type="radio" name="ss3" id="ss3-item-3" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/sports/3" />
			<label for="ss3-item-2" class="slideshow--nav slideshow--nav-previous">Go to slide 2</label>
			<label for="ss3-item-4" class="slideshow--nav slideshow--nav-next">Go to slide 4</label>
		</div>
		
		<input type="radio" name="ss3" id="ss3-item-4" class="slideshow--bullet" />
		<div class="slideshow--item">
			<img src="http://lorempixel.com/640/360/people/3" />
			<label for="ss3-item-3" class="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
			<label for="ss3-item-1" class="slideshow--nav slideshow--nav-next">Go to slide 1</label>
		</div>

	</div>
	
	<p>By <a href="http://twitter.com/joggink">@joggink</a> | <a href="https://github.com/joggink/pure-css-slideshow">View on github</a></p>
	
</div>

</body>
</html>