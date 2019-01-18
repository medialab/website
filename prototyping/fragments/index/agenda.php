	<section id="agenda">

		<h1>Les rendez-vous du Labo</h1>

		<div id="agenda-container">

           
            <input type="radio" name="move-agenda" value="agenda_moving_left" id="input_agenda_moving_left_1" hidden>
            <label class="agenda_moving_left" id="agenda_moving_left_1" for="input_agenda_moving_left_1">
                <span>〉</span>
            </label>

            <input type="radio" name="move-agenda" value="agenda_moving_left" id="input_agenda_moving_left_2" hidden>
            <label class="agenda_moving_left" id="agenda_moving_left_2" for="input_agenda_moving_left_2">
                <span>〉</span>
            </label>

            <input type="radio" name="move-agenda" value="agenda_moving_left" id="input_agenda_moving_left_3" hidden>
            <label class="agenda_moving_left" id="agenda_moving_left_3" for="input_agenda_moving_left_3">
                <span>〉</span>
            </label>

            <input type="radio" name="move-agenda" value="agenda_moving_left" id="input_agenda_moving_left_4" hidden>
            <label class="agenda_moving_left" id="agenda_moving_left_4" for="input_agenda_moving_left_4">
                <span>〉</span>
            </label>

            <input type="radio" name="move-agenda" value="agenda_moving_left" id="input_agenda_moving_left_5" hidden>
            <label class="agenda_moving_left" id="agenda_moving_left_5" for="input_agenda_moving_left_5">
                <span>〉</span>
            </label>

            <input type="radio" name="move-agenda" value="agenda_moving_left" id="input_agenda_moving_left_6" hidden>
            <label class="agenda_moving_left" id="agenda_moving_left_6" for="input_agenda_moving_left_6">
                <span>〉</span>
            </label>

            <div class="agenda_moving_left" id="agenda_moving_left_cache"></div>

            <input type="radio" name="move-agenda" value="agenda_moving_right" id="input_agenda_moving_right" hidden>
            <label class="agenda_moving_right" id="agenda_moving_right" for="input_agenda_moving_right">
                <span>〈〈</span>
            </label>

            <input type="radio" name="move-agenda" value="agenda_moving_right" id="input_agenda_moving_right_1" hidden>
            <label class="agenda_moving_right" id="agenda_moving_right_1" for="input_agenda_moving_right_1">
                <span>〈</span>
            </label>



			<div id="agenda-contenu" data-attribute="agenda">


                <article class="past" data-count="2">
					<p>Voir les rendez-vous déjà passés dans <a href="#linkPageActualites">Actualités</a></p>
                </article>

                

                <!--
                    case1 == une seule journée
                    case2 == plusieurs jours sur le même mois
                    case 3 == plusieurs jours sur des mois différents (cas rare)
                -->

                <article>
                    <p class="year-main">2018 </p>

                    <p class="internal" data-internal="yes"><span>M</span></p>

                    <!-- if case 1 -->
                    <time class="time time-case1" data-time="2018-01-01">
                    <a href="#linkObjet">
                        <span class="week">Mardi</span>
                        <span class="day">12 </span>
                        <span class="month">janvier </span>
                        <span class="year">2018 </span> 
                    </a>
                    </time>              
                    
                    <h1 data-level-1="title"><a href="#linkObjet">How not to be a bad designer</a></h1>
                    <h2 data-level-2="label"><a href="#linkObjet">Le séminaire du mardi</a></h2>  
                    
                    <!-- if case 1 --><p class="hours">◷  10:00 ⇥ 18:00</p>
                    <p class="place">✻ 14 rue de l'université, salle 809</p>
							
                </article>




                <article>
                    <p class="year-main">2018 </p>

                    <p class="internal" data-internal="no"></p>

                    <!-- if case 2 -->
                    <time class="time time-case2" data-time="2018-01-01">
                    <a href="#linkObjet">
                        <span class="start">
                            <span class="day">10 </span>
                        </span>
                        <span class="between">⇥ </span>
                        <span class="end">
                            <span class="day">12 </span>
                            <span class="month">janvier</span>
                        </span>
                        <span class="year">2018</span>
                    </a>
                    </time>                   

                    <h1 data-level-1="title"><a href="#linkObjet">Privacy by design</a></h1>
                    <h2 data-level-2="label"><a href="#linkObjet">Colloque organisé par le voisin</a></h2>

                    <p class="place">✻ EHESS, Paris</p>
                   
                </article>

                <article>
                    <p class="year-main">2018 </p>
                    <p class="internal" data-internal="no"></p>

                    <!-- if case 3 -->
                    <time class="time time-case3" data-time="2018-01-01">
                    <a href="#linkObjet">
                        <span class="start">
                            <span class="day">30 </span>
                            <span class="month">mars </span>
                        </span>
                        <span class="between">⇥ </span>
                        <span class="end">
                            <span class="day">2 </span>
                            <span class="month">avril </span>
                        </span>
                        <span class="year">2018 </span>
                    </a>
                    </time>
                    
                    <h1 data-level-1="title"><a href="#linkObjet">Privacy by design</a></h1>
                    <h2 data-level-2="label"><a href="#linkObjet">Colloque organisé par le voisin</a></h2>

                    <p class="place">✻ EHESS, Paris</p>
                   
                </article>





                <article>
                    <p class="year-main">2018 </p>

                    <p class="internal" data-internal="yes"><span>M</span></p>

                    <!-- if case 1 -->
                    <time class="time time-case1" data-time="2018-01-01">
                    <a href="#linkObjet">
                        <span class="week">Mardi </span>
                        <span class="day">6 </span>
                        <span class="month">février </span>
                        <span class="year">2018 </span>
                    </a>
                    </time>
                    
                    <h1 data-level-1="title"><a href="#linkObjet">Protocoles et data-carotte</a></h1>
                    <h2 data-level-2="label"><a href="#linkObjet">Le séminaire du mardi</a></h2>
                    
                    <!-- if case 1 --><p class="hours">◷  10:00 ⇥ 18:00</p>
                    <p class="place">✻ 14 rue de l'université, salle 809</p>			
					
                </article>



                <article>
                    <p class="year-main">2018 </p>

                    <p class="internal" data-internal="yes"><span>M</span></p>

                    <!-- if case 1 -->
                    <time class="time time-case1" data-time="2018-01-01">
                    <a href="#linkObjet">
                        <span class="week">Mardi </span>
                        <span class="day">6 </span>
                        <span class="month">février </span>
                        <span class="year">2018 </span>
                    </a>
                    </time>

                    <h1 data-level-1="title"><a href="#linkObjet">La fabrique de la loi</a></h1>
                    <h2 data-level-2="label"><a href="#linkObjet">Le séminaire du mardi, un label plus long que les autres</a></h2>

                    <!-- if case 1 --><p class="hours">◷  10:00 ⇥ 18:00</p>
                    <p class="place">✻ 14 rue de l'université, salle 809</p>

                    
                </article>



                


                <article>
                    <p class="year-main">2018 </p>

                    <p class="internal" data-internal="yes"><span>M</span></p>

                    <!-- if case 1 -->
                    <time class="time time-case1" data-time="2018-01-01">
                    <a href="#linkObjet">
                        <span class="week">Mardi</span>
                        <span class="day">6 </span>
                        <span class="month">février </span>
                        <span class="year">2018 </span>
                    </a>
                    </time>

                    
                    <h1 data-level-1="title"><a href="#linkObjet">La fabrique de la loi</a></h1>
                    <h2 data-level-2="label"><a href="#linkObjet">Le séminaire du mardi, un label plus long que les autres</a></h2>

                    <!-- if case 1 --><p class="hours">◷ 10:00 ⇥ 18:00</p>
                    <p class="place">✻ 14 rue de l'université, salle 809</p>


                    
                </article>



                


                                                



			</div>
		</div>


		</section> 