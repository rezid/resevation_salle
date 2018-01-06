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
> show dbs
local ...
room-data-base
> use room-data-base
switched to db room-data-base
> db.dropDatabase()
{ "dropped" : "room-data-base", "ok" : 1 }
> show dbs
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
![Alt text](./image/1.jpg?raw=true "Title")

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
