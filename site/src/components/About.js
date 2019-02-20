import React from 'react';
import {Link} from 'gatsby';

import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';
/*import './scss/apropos.scss';  */

export default function About({lang}) {
  console.log(lang);

  return (
    <>
    <Nav />
    <main id="main-objet">
      <hgroup>
        <h1>Le medialab</h1>
        <h2>Dire quelque chose d'intelligent</h2>
      </hgroup>
      <div className="contenu">
        <h3>Blabla</h3>
        <p>Dixième centre de recherche de <span className="totip">Sciences Po<span className="tip">Science Po est la maison Mère.</span></span>, le médialab a été créé en 2009 pour aider les sciences sociales et humaines à tirer le meilleur profit de la masse de données rendues disponibles par la numérisation.
        Il a trois missions principales fortement intégrées: méthodologie, analyse, théorie.</p>
        <p> La première est d’être au service des différents centres de Sciences Po pour aider les chercheurs qui se trouvent aux prises avec des données nouvelles pour lesquelles il n’existe pas encore de méthodologie bien établie.
        La deuxième mission consiste à analyser en quoi la numérisation modifie les médias et les médiations qui sont l’objet des sciences sociales et humaines, particulièrement en économie, en sciences politiques, en histoire et en sociologie.
        La troisième est de repérer en quoi la numérisation ne se contente pas de multiplier les données et de modifier les pratiques existantes, mais quelle nouvelle prise elle apporte sur les questions fondamentales de la théorie sociale .
        Méthodes numériques (digital methods), études des médias (media studies), théorie sociale (social theory) forment ainsi les trois piliers du médialab. C’est cette combinaison exceptionnelle entre méthode, analyse et théorie, qui explique l’originalité de son organisation. En effet, contrairement aux autres centres de Sciences Po, il est composé d’un petit nombre d’universitaires et d’un nombre important d’ingénieurs, qui sont tous considérés comme publiants (qu’il s’agisse d’articles, de logiciels, ou de méthodes). En ce sens, il emprunte davantage son modèle d’organisation à un laboratoire d’istrumentation entifique.</p>
        <section>
          <input type="checkbox" id="section_a" className="minify"/>
            <label for="section_a"><h3>Il existe aussi un contenu contingent</h3></label>
          <div className="minified">
            <p> L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers: sciences du social, ingénierie des données numériques et design de l’information, ce dernier métier étant devenu indispensable du fait de la masse et de l’hétérogénéité des données qui bouleversent les habitudes de lecture.
            Le médialab s’est particulièrement consacré au cours des années passées à domestiquer les données numériques pour qu’elles deviennent utilisables pour les trois missions qu’il s’était fixé au départ</p>
          </div>
        </section>
        <section>
          <input type="checkbox" id="section_b" className="minify"/>
            <label for="section_b"><h3>Il existe aussi un contenu contingent</h3></label>
          <div className="minified">
            <p> L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers: sciences du social, ingénierie des données numériques et design de l’information, ce dernier métier étant devenu indispensable du fait de la masse et de l’hétérogénéité des données qui bouleversent les habitudes de lecture.
            Le médialab s’est particulièrement consacré au cours des années passées à domestiquer les données numériques pour qu’elles deviennent utilisables pour les trois missions qu’il s’était fixé au départ</p>
          </div>
        </section>
        <section>
          <input type="checkbox" id="section_c" className="minify"/>
            <label for="section_c"><h3>Il existe aussi un contenu contingent</h3></label>
          <div className="minified">
            <p> L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers: sciences du social, ingénierie des données numériques et design de l’information, ce dernier métier étant devenu indispensable du fait de la masse et de l’hétérogénéité des données qui bouleversent les habitudes de lecture.
            Le médialab s’est particulièrement consacré au cours des années passées à domestiquer les données numériques pour qu’elles deviennent utilisables pour les trois missions qu’il s’était fixé au départ</p>
          </div>
        </section>
        
      </div>
      <aside id="inshort">
        <h3>Side chose</h3>
        <p>L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers</p>
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      </aside>    
    </main>
    </>
  );
}

