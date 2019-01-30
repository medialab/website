<!-- Elements liées -->
<aside class="container" id="elements-associes-liste">
    <h1>Éléments associés</h1>
    <input type="checkbox" id="filtre_equipe" class="filtre_objet"/>
    <label for="filtre_equipe">Équipe</label>
    <input type="checkbox" id="filtre_production" class="filtre_objet"/>
    <label for="filtre_production">Production</label>
	<input type="checkbox" id="filtre_activite" class="filtre_objet"/>
	<label for="filtre_activite">Activité</label>
	
    <div class="contenu">
        <ul class="liste_objet" id="liste-objet-activite">

        <li data-type="people">
            <a href="page_objet.php">
                <h1 data-level-1="name">Dominique Cardon</h1>
                <h2 data-level-2="role">Directeur du médialab</h2>
                <p class="type">Activité / Pédagogie</p>
                <div class="image-pre">
                    <?php include('assets/images/patterns/pattern-1.html'); ?>
                </div>            
            </a>
        </li>
        <li data-type="activite">
            <a href="page_objet.php">
                <h1 data-level-1="baseline">Marchés financiers : que sont les “bonnes” relations sociales
                        d’échange?</h1>
                <h2 data-level-2="title">How not to be a bad trader</h2>
                <p class="type">Production / Communication</p>
                <div class="image-pre">
                    <?php include('assets/images/sample_txt/naturpradi_xs.html'); ?>
                </div>
            </a>
        </li>
        <li data-type="production">
            <a href="page_objet.php">
                <h1 data-level-="baseline">Hyperlink is not dead!</h1>
                <h2 data-level-="title">Nom de l'objet</h2>
                <p class="type">Production / Communication</p>
                <div class="image-pre">
                    <?php include('assets/images/sample_txt/naturpradi_xs.html'); ?>
                </div>
            </a>
        </li>
    </div>
</aside>
