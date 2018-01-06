# Beep

Beep est une application de mise en contact d'utilisateurs qui souhaite reserver une salle, avec des personnes qui possedent ce bien immobilier et qui desirent le louer. 

## Commencer

Ces instructions vous permettront d'obtenir une copie du projet opérationnel sur votre machine locale à des fins de développement et de test.

### Conditions préalables

De quoi avez-vous besoin pour installer le logiciel et comment les installer

MongoDB doit etre installer:
`` `
$ mongo --version
MongoDB shell version: 3.2.18
`` `

Le service de MongoDB doit etre lancé:
`` `
$ sudo service mongod start
`` `

Si il y a deja une base de données nommé 'room-data-base' alors il faut la supprimer:
`` `
$ mongo
MongoDB shell version: 3.2.18
...
'>' show dbs
local ...
room-data-base
'>' use room-data-base
switched to db room-data-base
'>' db.dropDatabase()
{ "dropped" : "room-data-base", "ok" : 1 }
'>' show dbs
local ...
`` `

NPM doit etre installer:
`` `
$ npm --version
5.5.1
`` `
On installer angular CLI v1.0.0 globalement grace a NPM:
`` `
$ npm install -g @angular/cli@1.0.0
...
+ angular-cli@1.0.0-beta.28.3
...
`` `

De preference il faut aussi avoir Git installé:
`` `
$ git --version
git version 2.7.4
`` `

### Installer et lancer le site web en local

#### Lancer le Backend

On commence par lancer le backend

On se positionne dans le repertoir du backend:
```
$ cd ./beep-backend

```

On installe les dependances (uniquement la premiere fois):
```
$ npm install
...
added ... packages in 12.584s
```

On execute le backend en tache de fond:
```
$ npm start
```

#### Lancer le Frontend
Le backend doit etre deja lancer avant de faire les etapes suivantes: 
On se positionne dans le repertoir du Frontend:
```
$ cd ./beep-web-front

```

On installe les dependances (uniquement la premiere fois):
```
$ npm install
...
added ... packages in 12.584s
```

On execute le Frontend avec l'ouverture automatique du navigateur:
```
$ ng serve -o
```

On aura l'image suivante:
![Alt text](./image/1.png?raw=true "Title")

A l'etat initial le site web ne contient pas de salle. Il faut donc dans un premier temps crée un compte et ajouter des salles ensuite on peut les reserver

## Exemple d'utilisation
Creation de compte:
![Alt text](./image/2.png?raw=true "Title")

Ajouter une salle:
![Alt text](./image/3.png?raw=true "Title")
![Alt text](./image/4.png?raw=true "Title")

Detaille d'une salle:
![Alt text](./image/5.png?raw=true "Title")

Reserver une salle:
![Alt text](./image/6.png?raw=true "Title")

## Lancer les testes:

### Frontend

```
$ cd ./beep-web-fron
$ ng test
```

### Frontend
```
$ cd ./beep-backend
$ ???
```
 

## Autheurs

* **ZIDANE Abderrazak** [rezid](https://github.com/rezid)

* **Aissata Ba**