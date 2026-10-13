# AGENTS.md — Directives & Standards d'Ingénierie Web, SEO & Découverte IA

Ce document constitue la **base de règles permanente** du projet. Il consigne les erreurs passées, les solutions validées et la méthodologie systématique à appliquer lors de la création ou la modification de tout site web.

---

## 1. Retour d'Expérience : Erreurs Historiques vs Solutions Éprouvées

| Erreur Observée dans le Passé | Conséquence sur Google & l'Indexation | Solution Validée & Obligatoire |
| :--- | :--- | :--- |
| **Marque reléguée en fin de `<title>`**<br>*(ex: "Pâtisserie & formation... \| MARQUE")* | Google dilue la marque et classe en priorité des requêtes littéraires (ex: citation de Rousseau) ou des sous-pages. | **Marque en position 1 absolue** :<br>`<title>NOM DE MARQUE — Activité & Localisation</title>` *(max 55-60 car)* |
| **Marque absente du titre `<h1>`**<br>*(ex: `<h1>La pâtisserie d'instinct...</h1>`)* | Absence de concordance sémantique forte entre la requête utilisateur exacte et l'en-tête principal. | **Marque explicite dans le `<h1>`** :<br>`<h1 class="display">NOM DE MARQUE : promesse métier...</h1>` |
| **Absence de désambiguïsation d'entité** | En cas d'homonymie avec un concept philosophique ou culturel, Google hésite et met en avant une page Facebook tiers. | **Schema.org enrichi** :<br>Ajouter `alternateName` (collé, avec espace, régional) et `disambiguatingDescription`. |
| **Aucune surface de découverte pour les IA** | Les assistants (ChatGPT Search, Perplexity, Gemini, Claude) ignorent la carte et les tarifs réels. | **Création systématique du pack IA** :<br>`llms.txt`, `sitemap.md`, `rss.xml` + liens footer. |
| **`robots.txt` et `sitemap.xml` non synchronisés** | Bots d'exploration et moteurs IA ne découvrent pas rapidement les nouvelles sections. | Pointeur vers le sitemap XML et les fichiers IA déclarés dans `robots.txt`. |

---

## 2. Standard Obligatoire de Création de Site (Checklist Automatique)

Dès qu'un nouveau site web ou une refonte est initié, **l'agent DOIT implémenter systématiquement** les éléments suivants :

### A. Structure On-Page SEO
1. **Balise `<title>`** :
   - Format : `[NOM DE MARQUE] — [Activité Principale] à [Ville]`
   - Règle : La marque exacte doit constituer les 2 premiers mots.
2. **Balise `<h1>`** :
   - Présente une et une seule fois par page.
   - Contient le nom de marque exact dès le début de l'en-tête.
3. **Balise `<meta name="description">`** :
   - Commence par le nom de l'entreprise et synthétise les points forts, coordonnées et appel à l'action.
4. **Balise `<link rel="canonical">`** :
   - URL canonique stricte déclarée sur chaque page (éviter les conflits avec/sans www ou avec/sans trailing slash).

### B. Balisage Sémantique Schema.org (JSON-LD)
Sur la page d'accueil (`index.html`), intégrer un script JSON-LD complet :
- Types : `["LocalBusiness", "Bakery"]` (ou type pertinent selon l'activité).
- `name` : Nom officiel en majuscules.
- `alternateName` : Déclinaisons en un seul mot (ex: `instinctdivin`), avec espace, avec localisation.
- `disambiguatingDescription` : Préciser le statut de commerce local pour éviter toute collision lexicale.
- `hasMap`, `telephone`, `address`, `openingHoursSpecification`.

### C. Le Pack de Découverte IA & Web (Standard aihero.dev)
Chaque projet web doit obligatoirement inclure ces 4 fichiers à la racine :
1. **`llms.txt`** :
   - Rédigé pour les LLMs (ChatGPT, Gemini, Perplexity, Claude).
   - Décrit l'identité, les URL clés, la carte des produits/services, les prix précis et les modalités de commande.
2. **`sitemap.md`** :
   - Plan de site en Markdown détaillant chaque page, ses ancrages (#) et des exemples de requêtes curl.
3. **`rss.xml`** :
   - Flux RSS 2.0 valide (avec namespace Atom) contenant les 4 à 5 actualités/nouveautés majeures de l'entreprise.
4. **`sitemap.xml` & `robots.txt`** :
   - Sitemap XML à jour avec dates récentes (`lastmod`) et priorités d'exploration.
   - `robots.txt` pointant vers `sitemap.xml` et référençant `llms.txt`, `sitemap.md` et `rss.xml`.

### D. Maillage Interne de Découverte
Sur chaque page HTML du site :
- Dans `<head>` : `<link rel="alternate" type="application/rss+xml" href="https://domaine.com/rss.xml">`
- Dans `<footer>` : Liens textuels vers `sitemap.xml`, `sitemap.md`, `rss.xml` et `llms.txt`.

---

## 3. Protocole d'Amélioration Continue (Mise à Jour du Système)

À chaque fois qu'une nouvelle anomalie est corrigée ou qu'une nouvelle optimisation est découverte :
1. **Consigner l'erreur et sa solution** dans la table de la Section 1 de ce document (`AGENTS.md`).
2. **Mettre à jour la règle correspondante** dans `.agents/rules/seo-discovery-standard.md`.
3. **Vérifier la conformité** via les parseurs de syntaxe (XML, JSON-LD).
