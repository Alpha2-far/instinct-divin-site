---
name: seo-discovery-standard
description: Standard obligatoire de conception web, SEO On-Page (Brand First), données structurées Schema.org et fichiers de découverte IA (llms.txt, sitemap.md, rss.xml, sitemap.xml, robots.txt).
trigger: always_on
---

# Règle Permanente : Standard Web SEO & Découverte IA

Toute création de nouveau site web ou modification majeure de structure DOIT respecter ce protocole en 5 points clés :

## 1. Priorité Absolue au Nom de Marque (Brand First)
- **`<title>` de l'accueil** : Le nom de marque DOIT figurer dans les 2 premiers mots. Ne jamais commencer par des mots-clés génériques qui diluent l'entité.
  *Modèle* : `<title>[MARQUE] — [Activité & Spécialité] à [Ville]</title>`
- **`<h1>` de l'accueil** : Le nom de marque DOIT être explicite dans le titre `<h1>`.
  *Modèle* : `<h1 class="...">[MARQUE] : [Promesse principale]</h1>`

## 2. Données Structurées & Désambiguïsation (JSON-LD)
Pour éviter qu'un moteur de recherche ne confonde la marque avec une homonymie littéraire, philosophique ou commerciale :
- Déclarer `@type`: `["LocalBusiness", "[SousTypeCommerce]"]`.
- Déclarer `alternateName` avec la version collée, avec espace et régionale.
- Déclarer `disambiguatingDescription` pour situer précisément le commerce local.
- Lier la fiche Google Business Profile avec `hasMap`.

## 3. Pack Obligatoire de Découverte IA
Chaque site généré doit comporter à sa racine :
- **`llms.txt`** : Résumé d'identité, itinéraires, tarifs précis, modalités de commande et contact pour modèles de langage.
- **`sitemap.md`** : Plan de site complet en Markdown avec description des sections et exemples curl.
- **`rss.xml`** : Flux RSS 2.0 valide (namespace Atom) contenant les 4 à 5 actualités/créations de référence.
- **`sitemap.xml`** : Sitemap XML avec `lastmod` récent et priorités cohérentes.
- **`robots.txt`** : Directives `Allow: /`, déclaration de `sitemap.xml` et commentaires pointant vers `llms.txt`, `sitemap.md`, `rss.xml`.

## 4. Maillage dans les Pages HTML
- Balise `<link rel="alternate" type="application/rss+xml" ...>` dans `<head>`.
- Liens textuels directs dans le pied de page (`<footer>`) vers `sitemap.xml`, `sitemap.md`, `rss.xml` et `llms.txt`.

## 5. Validation Automatique
Avant de finaliser :
- Valider le format XML de `rss.xml` et `sitemap.xml`.
- Valider le format JSON du balisage Schema.org JSON-LD.
