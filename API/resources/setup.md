<!--- Template Image :  ![](../web/images/Logo.png) -->

Ressources 
========================
Ce document a pout bût de vous guider lors du "set-up" de l'API du projet ressources

Comment installer l'API
--------------

Une fois le projet cloner depuis le repositories [Github][1] vous aurez besoin des technologies suivantes sur votre poste :

- Git
- [GitKraken][2] (recommandé)
- [Composer] [3]
- LAMP

Une fois ces applications installées vous pouvez effectuer les commandes suivantes depuis un terminal :

```console
user@Computer:/var/www/html/RIL-Ressources$ cd API/

user@Computer:[...]/RIL-Ressources/API$ composer install
```

Une fois la commande lancée avec succès vous remarquerez l'ajout de dossiers et de fichier dans votre projet.

Mise en route de l'API
--------------
Cette API n'inclue pas le package "web-server-bundle" de Symfony, pour pouvoir lancer le serveur il faut donc effectuer la commande PHP suivante :

```console
user@Computer:[...]/RIL-Ressources/API$ php -S 127.0.0.1:8000 -t public/
Listening on http://127.0.0.1:8000
Document root is /var/www/html/RIL-Ressources/API
Press Ctrl-C to quit.
```
L'accès ce fait sur l'adresse ci-dessus, à noter que l'adresse par défaut peut être remplacée par votre adresse ip local.

Paramétrage du fichier .env
--------------
Après le lancement de la commande composer, vous remarquerez l'apparition du fichier ".env", c'est dans celui-ci que vous rentrerez vous paraméterez les informations de votre BDD.

**Normalement les informations de connexion à Mysql ne sont pas mentionner mais vérifier lors de vos commits que le fichier n'est pas prise en compte .**

Notes
--------------
Pour plus d'informations sur le paramétrage d'un projet symfony je vous invite à consulter la documentation [ci-joint][4]

GL & HF ;)

[1]:  https://github.com/Tleard/RIL-Ressources
[2]:  https://www.gitkraken.com/
[3]:  https://getcomposer.org/
[4]:  https://symfony.com/doc/current/setup.html

