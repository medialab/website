
<h1 class="type_title" id="activite_title">Activités</h1>



<!-- Filtre for phone -->
<input type="checkbox" class="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible"  hidden>
<label class="toggle-filtre-phone filtre_title" for="toggle-filtre-phone" title="Découvrir les options de filtrage">
	<p>Filtre<span>⋀</span>	</p>
</label>
<!-- End Filtre for phone -->


<!-- Trois possibilité dans le build
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
-->

<!-- Active (par défaut) -->
<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_active" value="activite_active" hidden checked>
<label class="filtre_objet filtre_activite" for="filtre_activite_active"><a class="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives">Actives</a></label>

<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_passe" value="activite_passe" hidden >
<label class="filtre_objet filtre_activite" for="filtre_activite_passe"><a class="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives+Passees">Passées</a></label>


<!-- Active + Passees
<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_active" value="activite_active" hidden checked>
<label class="filtre_objet filtre_activite" for="filtre_activite_active"><a class="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesPassees">Actives</a></label>

<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_passe" value="activite_passe" hidden checked>
<label class="filtre_objet filtre_activite" for="filtre_activite_passe"><a class="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives">Passées</a></label>
 -->

<!-- Passees 
<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_active" value="activite_active" hidden>
<label class="filtre_objet filtre_activite" for="filtre_activite_active"><a class="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives+Passees">Actives</a></label>

<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_passe" value="activite_passe" hidden checked>
<label class="filtre_objet filtre_activite" for="filtre_activite_passe"><a class="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives">Passées</a></label>
-->


<!-- Filtrer par type
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
-->

<h2 class="filtre_objet filtre_activite_title">Filtrer par type</h2>

<input type="checkbox" id="filtre_recherche" name="filtre_recherche" value="recherche" hidden >
<label class="filtre_objet filtre_activite checkbox-medialab" for="filtre_recherche">Recherche</label>


<input type="checkbox" id="filtre_enseignement" name="filtre_enseignement" value="enseignement" hidden >
<label class="filtre_objet filtre_activite checkbox-medialab" for="filtre_enseignement">Enseignement</label>

<input type="checkbox" id="filtre_methode" name="filtre_methode" value="methode" hidden >
<label class="filtre_objet filtre_activite checkbox-medialab" for="filtre_methode">Méthode</label>