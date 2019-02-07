import React from 'react';
import {Link} from 'gatsby';

import FilterActivity from './fragments/pageListe/FilterActivity.js';

/* import {templateMembership} from './helpers.js';  */ 
import './scss/page_liste.scss';

export default function ActivityListing({lang, list}) {
  console.log(lang, list);

  	return (
    	<> 
    		<FilterActivity />
	       	<ul class="liste_objet" id="liste-objet-activite">
		        <li id="year-2018" class="list-year">
		            2018
		        </li>
		        {/*list.map(p => (      
					<>
					<li key={p.id} data-item={p.id} data-domaine={p.type} class={p.type}>
					
						<Link to="">
							<h1 data-level-1="title">{p.title}</h1>
			                <h2 data-level-2="authors">
			                    <span>FirstName LastName</span>,
			                    <span>FirstName Last</span>
			            	</h2>
			            </Link>
			            
			            <p class="date">{p.lastUpdated}</p>
						<p class="type">{p.type}</p>
					</li>
					<li class="item_accroche description" data-item-accroche="0"><Link to="">{p.description}</Link></li>
					</>
				))*/}

				<li class="item_accroche accroche-titre">Description en une phrase de la catégorie.</li>
			</ul> 
	    </>
	 );
}


