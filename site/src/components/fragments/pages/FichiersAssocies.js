import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const FichiersAssocies = (person) => {
	return (
		<aside className="container" id="fichiers-associes">
		<h1>Fichiers associés</h1>
			<ul>
				<li>
					<Link to="/" className="item">
						<p className="icon">⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚<span>&nbsp;</span><span>PDF</span></p>
						<p className="name">Girard_Shinrai_20181210.pdf</p>
					</Link>
				</li>
			</ul>
		</aside>	
	)
}

export default FichiersAssocies;
