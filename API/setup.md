Setup.md
========================
Ce document a pout bût de vous guider lors de l'installation de l'API du projet ressources

Comment installer l'API
--------------

Une fois le projet cloner depuis le repositories [Github][1] vous aurez besoin des technologies suivantes sur votre poste :

- Git
- [Composer] [3]
- LAMP (ou WAMP)
- OpenSSL

Une fois ces applications installées vous pouvez effectuer les commandes suivantes depuis un terminal :

```bash
user@Computer:/var/www/html/RIL-Ressources$ cd API/

user@Computer:/var/www/html//RIL-Ressources/API$ composer install
```

Une fois la commande lancée avec succès vous remarquerez l'ajout de dossiers et de fichier dans votre projet.

Instalation du package lexik_JWT
--------------
Vous trouverez la documentation du package de gestion des JSON WEB TOKEN sur ce [lien][5].

Pour pouvoir faire fonctionner le bundle vous aurez besoin de générer deux fichiers de clés SSL via OpenSSL, une clés publique et une clés privée.

```bash
user@Computer:/var/www/html/RIL-Ressources$ cd API/
user@Computer:/var/www/html/RIL-Ressources/API$ mkdir -p config/jwt
```
**<span style="color:red">/!\ </span> Pendant la création des clés SSL un mot de passe vous seras demandés et il sera à renseigner dans le fichier .env**

```bash
user@Computer:/var/www/html//RIL-Ressources/API$ openssl genrsa -out config/jwt/private.pem -aes256 4096
user@Computer:/var/www/html//RIL-Ressources/API$ openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

Vous devrez ensuite configurer vos clés SLL dans le fichier __.env__:

``` dotenv
###JWT
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=VOTREMOTDEPASSE
```

Installation de la BDD
--------------

L'installation de la base de données se fait avec Doctrine.

Vérifier dans votre fichier **.env** la syntaxe de la ligne suivante
```dotenv
DATABASE_URL=mysql://MYSQL_USER:PASSWORD@127.0.0.1:3306/DB_NAME
```
_Pensez à changer les informations présentes dans cette ligne avec vos informations de BDD et le 
nom de la nouvelle BDD qui sera créé par Doctrine_

```bash
user@Computer:/var/www/html/RIL-Ressources/API$ php bin/console doctrine:dabatase:create
user@Computer:/var/www/html/RIL-Ressources/API$ php bin/console doctrine:schema:update --force
```



Mise en route de l'API
--------------
Cette API n'inclue pas le package "web-server-bundle" de Symfony, pour pouvoir lancer le serveur il faut donc effectuer la commande PHP suivante :

```bash
user@Computer:/var/www/html//RIL-Ressources/API$ php -S 127.0.0.1:8000 -t public/
Listening on http://127.0.0.1:8000
Document root is /var/www/html/RIL-Ressources/API
Press Ctrl-C to quit.
```
L'accès ce fait sur l'adresse ci-dessus, à noter que l'adresse par défaut peut être remplacée par votre adresse ip local.

Paramétrage du fichier .env
--------------
Après le lancement de la commande composer, vous remarquerez l'apparition du fichier ".env", c'est dans celui-ci que vous rentrerez vous paraméterez les informations de votre BDD.

**<span style="color:red">/!\ </span>Normalement les informations de connexion à Mysql ne sont pas mentionner mais vérifier lors de vos commits que le fichier n'est pas prise en compte .**

Si elle n'est pas présente ajouter la ligne 
```dotenv
CORS_ALLOW_ORIGIN=.
```

Notes
--------------
Pour plus d'informations sur le paramétrage d'un projet symfony je vous invite à consulter la documentation [ci-joint][4]

GL & HF ;)

[1]:  https://github.com/Tleard/RIL-Ressources
[2]:  https://www.gitkraken.com/
[3]:  https://getcomposer.org/
[4]:  https://symfony.com/doc/current/setup.html
[5]:  https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#installation

