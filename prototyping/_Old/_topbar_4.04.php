<header id="topbar">
	<div id="topbar-content">
		<div id="logo-medialab">
			<a href="#">
				<img src='assets/images/Medialab_Embleme_RVB.svg' />
			</a>
		</div>
		<nav id="nav-option">
			<ul id="nav-objet">
				<!--
				<li id="actualites">
					<a href="#">Actualités</a>
				</li>
				<li id="publications" >
					<a href="#">Publications</a>
				</li>
				<li id="activites">
					<a href="#">Activités</a>
				</li>
			-->
					<input id="actualites" type="radio" name="n1"> 
	              	<label class="collapse" for="actualites">Actualités</label>

					<input id="publications" type="radio" name="n1"> 
	              	<label class="collapse" for="publications">Publications</label>

					<input id="activites" type="radio" name="n1"> 
	              	<label class="collapse" for="activites">Activités</label>

					<input id="clear" type="radio" name="n1"> 
	              	<label class="collapse" for="clear">✖ Fermer ✖</label>

					<input id="clearzone" type="radio" name="n1"> 
	              	<label id="clearzone_label" class="collapse" for="clearzone">✖</label>

				<?php include('fragments/_liste_objet_3.php'); ?>

			</ul>
			<ul id="nav-institution">
				<li><a href="#">Le Médialab</a></li>
				<li><a href="#">L'équipe</a></li>
			</ul>
			<ul id="nav-archive">
				<input id="fluxx" type="radio" name="n1"> 
	            <label id="fluxx_label" class="collapse" for="fluxx">flux</label>
				<li><a href="#">Archives</a></li>

				<!--<section id="flux">
					<h3>Flux</h3>
					<p><span class="date">20 min ago</span class="date"> ◍ <span class="name">Medialab</span class="name"><span> tweet : “knowledge democracy”, wed. Nov. 7th - 2pm at médialab’s seminar : @Noortje-Marres explains “[why] we need to recover the central role in public life of experimental facts: statements whose truth value is unstable » Registrations on… <span class="date">22 hours ago</span class="date"> <span class="name">◉ Bruno</span class="name"><span>pushed</span> to master at medialab/website <span class="date">14 oct.</span class="date"> ◍ <span class="name">Medialab</span class="name"> <span>a Retweeté</span> : @Optichiasm #ModesOfExistence + #ResetModernity: A design laboratory for the Humanities se-lected by the @ADIassodesign Permanent Observatory for the Design Index 2018. Thanks to @BrunoLatourAIME & @medi-alab_ScPo for having made this possible! <span class="date">13 oct.</span class="date"> ◉ <span class="name">Alfred</span class="name"> <span>commit to</span> to master at medialab/website</p>
				</section>-->
			</ul>


		</nav>

		<div id="langue" class="menu langue">
			<p><span>FR</span><span>|</span><span>EN</span></p>
		</div>
	</div>
</header>
