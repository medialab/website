<header id="topbar">
	<input type="checkbox" id="toggle-menu" name="toggle-menu" value="visible" hidden>
	<label for="toggle-menu">
		<span class="span-nochecked"><?php include('assets/svg/menu-circle.svg'); ?></span>
		<span class="span-checked"><?php include('assets/svg/close-circle.svg'); ?></span>
	</label>


	<div id="topbar-content">
		<div id="logo-medialab">
			<a href="index.php">
			<?php include('assets/svg/logo_medialab_draft.svg'); ?>
			</a>
		</div>


		<nav id="nav-option">
			<ul id="nav-home">
				<li><a href="linkHome#now">À la une</a></li>
				<li><a href="linkHome#agenda">Les rendez-vous du labo</a></li>
				<li><a href="linkHome#flux">Flux</a></li>
			</ul>
			<ul id="nav-objet">

              	<li data-type="actualite"><a href="page_liste.php?type=actualite">Actualités</a></li>

              	<li data-type="production"><a href="page_liste.php?type=production">Productions</a></li>

              	<li data-type="activite"><a href="page_liste.php?type=activite">Activités</a></li>

			</ul>
			<ul id="nav-institution">
				<li><a href="#">Le Médialab</a></li>
				<li><a href="page_personne.php">L'équipe</a></li>
			</ul>
			<ul id="nav-archive">
				<li><a href="#">Outils</a></li>
				<li><a href="#">Archives</a></li>
			</ul>
		</nav>

		<div id="langue" class="menu langue">
			<p><span>FR</span><span> | </span><span>EN</span></p>
		</div>
	</div>
</header>
