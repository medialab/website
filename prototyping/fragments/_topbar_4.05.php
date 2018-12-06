<header id="topbar">
	<div id="topbar-content">
		<div id="logo-medialab">
			<a href="#">
				<img src="assets/images/Medialab_Embleme_RVB.svg">
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
				<li><a href="#">Archives</a></li>
			</ul>


		</nav>

		<div id="langue" class="menu langue">
			<p><span>FR</span><span>|</span><span>EN</span></p>
		</div>
	</div>
</header>
