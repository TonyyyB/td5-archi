# TP Noté architecture logicielle

## Membres du groupe

Lobjois Mathéo

Beaujouan tony

## Installation et lancement de l'application

### Serveur
Afin de lancer le serveur, placez vous dans le dossier serveur
```bash
cd ./serveur/
```
Créez un environnement virtuel python
```bash
python3 -m venv .venv
```
Installez les dépendances
```bash
pip install -r requirements.txt
```
Lancez le serveur
```bash
flask run
```

### Client

Executez les commandes suivante dans le dossier `./client`:
```bash
npm upgrade
npm run dev
```

## Fonctionnalités

### Questionnaire

Nous pouvons ajouter un nouveau questionnaire, le modifier ou encore le supprimer.

### Question

Nous pouvons ajouter une nouvelle question à un questionnaire, la modifier ou encore la supprimer.

### Arborescence du projet (src)

```bash
├── App.vue
├── assets
│   └── vue.svg
├── components
│   ├── QuestionItems.vue
│   ├── QuestionList.vue
│   ├── QuestionnaireItems.vue
│   └── QuestionnaireList.vue
├── main.js
├── services
│   └── apiService.js
├── style.css
└── types
    └── index.js

```

Nous avons quatres composants.

Deux pour les questionnaires (`QuestionnaireList.vue`,`QuestionnaireItems.vue` ) et deux autres pour les questions (`QuestionList.vue`,`QuestionItems.vue` ). Utilisés dans le `App.vue`.