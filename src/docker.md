# Docker 

:::warning

Dans le cas d'un hyperviseur, il est inutile d'installer Docker dès lors que l'hyperviseur gère la conteneurisation. 

:::

## Installation 

L'installation de Docker se résume à `apt install docker.io`. Les dépendances du packet sont : 

Depends: libc6 (>= 2.34), libdevmapper1.02.1 (>= 2:1.02.97), libsystemd0, adduser, containerd (>= 1.4~), iptables, lsb-base, runc (>= 1.0.0~rc8~), tini

- `runc` est le _runtime_, le composant qui gère l'exécution des conteneurs, les application packagées en respectant _Open Container Format_ (`OCF`);

- `containerd` est l'API d'exécution (_runtime API_) qui va gérer le cycle de vie d'un conteneur; stockage et transfert des images, exécution du conteneur et supervision, liens avec le stockage et le réseau, etc. Il se concentre sur la simplicité, la robustesse et la portabilité; 

Pour vérifier la présence de docker, exécuter 

```bash 
~:$ docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

::: tip
Docker s'exécute en _root_. Un moyen simple de donner le droit à un _user_ d'utiliser Docker est de l'ajouter au groupe `docker`. 

```bash
~:# usermad -aG docker user
```
:::

`docker info` donne moult infos sur l'installation de docker.

## Commencer avec Docker

Pour commencer lançons un image _debian_ de manière interactive. 

```bash
~:$ docker run -ti debian bash 
Unable to find image 'debian:latest' locally
latest: Pulling from library/debian 
a492eee5e559: Pull complete 
Digest: sha256:72297848[cut]782
Status: Downloaded newer image for debian:latest
root@e89b4fa490ce:/# ls                   
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@e89b4fa490ce:/# apt update && apt install procps 
root@e89b4fa490ce:/# ps -aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.0   4188  3412 pts/0    Ss   07:17   0:00 bash
root         195  100  0.0   8060  3896 pts/0    R+   07:21   0:00 ps -aux
```
- la première fois, l'image doit être téléchargée avant d'être exécutée;
- l'image _debian_ ne connait pas la commande `ps`, il faut l'installer;
- le shell est le seul processus et a le PID 1;
- un `exit` quitte _bash_ et quitte la session interactive. Le container est détruit;

```bash
$ docker ps -a                                        
CONTAINER ID   IMAGE  COMMAND CREATED        STATUS       PORTS         NAMES
e89b4fa490ce   debian "bash"  47 seconds ago Exited (127) 7 seconds ago great_curran
```
- `docker ps -a` montre que le container a été quitté

Si vous essayez de créer un fichier dans la session interactive, le fichier sera créé… et sera perdu lors de la destruction du container. 

Il est possible de relancer un nouveau conteneur avec la même image : 

```bash 
~:$ docker run -ti debian bash 
```

et dans ce cas le fichier n'existe plus. Il est également possible de relancer le conteneur préalablement quitté grâce à son _container id_ : 

```bash
~:$ docker start -ai e89b4fa490ce
```

et dans ce cas c'est le même conteneur qui est redémarré. 

:::info
Il n'est pas nécessaire d'écrire tous les chiffres du _container id_, seuls ceux permettant de différencier deux containers sont utiles. 
:::

:::warning
Les images docker sont créées en **couches successives**, chacune — exceptée la dernière — est en lecture seule. 
::: 

Considérons le _Dockerfile_ suivant : 

```dockerfile
FROM debian
MAINTAINER me
RUN apt update \
    && apt install -y nginx \
    && apt clean 
COPY index.html /var/www/html
EXPOSE 80, 443
CMD nginx -g 'daemon off;'
```

- la commande `FROM` va créer une nouvelle couche basée sur _debian_;
- la commande `RUN`, une autre couche ne contenant que les différences avec la précédente et;
- ainsi de suite pour   `COPY` et `CMD`;
- seule la dernière couche — celle du conteneur construit — sera en lecture-écriture. 

## Le réseau

Docker propose plusieurs manières de configurer le réseau grâce à plusieurs _drivers_ : 

|Type de réseau | Description
|--             |-- 
|**bridge**     |Driver par défaut.<br/>Attribue l'adresse `172.17.0.2` non routable. Nécessite de _nater_ les ports
|**host**       | Supprime l'isolation du conteneur qui utilise alors le pile réseau de l'hôte
|**macvlan**    | Attribution d'une adresse MAC au conteneur qui pourra avoir son identité sur le réseau
|**none**       | Désactive le réseau
|**overlay**    | Superpose un réseau à celui de l'hôte permettant à plusieurs conteneurs de communiquer. 

### bridge

Driver par défaut. L'adresse IP n'est pas routable. Il est nécessaire de _nater_ un port de l'hôte sur un port du conteneur. 

```bash
~:$ docker run -ti nginx bash 
TODO ip a 
```

En l'état, le conteneur est inutile. 

- Natons le port en faisant correspondre le port `80` de l'hôte avec le port `80` du conteneur : option `-p`
- Détachons le conteneur pour que le service _nginx_ soit disponible (et plus un shell `bash`)

```bash 
~:$ docker run -p 80:80 -d nginx 
TODO
```

```bash 
~:$ curl -I localhost
TODO
```
- fait une requête `http` sur la machine locale, sur son port 80. Le port 80 est redirigé par docker sur le port 80 du conteneur. 

```bash
~:$ docker ps
TODO
```
- montre les conteneurs dont le conteneur nginx actif

:::warning
Il sera nécessaire de supprimer le conteneur qui monopolise le port 80. 
```bash
~:$ docker rm -f <ID>
```
:::

### host

Cette fois, le driver utilisé doit être préciser _via_ `--net=host` et c'est bien la pile réseau de l'hôte qui est utilisée. 

```bash
~:$ docker run --net=host -d nginx
```

```bash
~:$ docker ps
TODO
```
- la colonne port ne contient plus d'information de _nating_

### macvlan

Il est nécessaire de créer un réseau associé à la carte reseaux de l'hôte

```bash
~:$ docker network create -d macvlan --subnet=172.16.0.0/16 --gateway=172.16.0.1 -o parent=eth0 public
TODO
```

Le réseau devrait apparaitre dans la liste des réseaux _via_ `docker network list`

Lançon un conteneur utilisant ce réseau (et faisant un petit dodo)

```bash
~:$ docker run -d --net=public debian sleep 3600
```

```bash
~:$ docker ps
```


```bash
~:$ docker exec <name> <command>
~:$ docker exec blaa ip a
~:$ docker inspect <name>
```

## Persistance 

La bonne pratique est que les conteneurs soit _stateless_ et donc sans persistance des données. Les données ne devraient pas se trouver **dans* le conteneur. Où les stocker ?

### Les données stockées sur l'hôte

La technique _binds mounts_ permets de monter n'importe quel point du _filesystem_ (système de fichiers) à l'intérieur du conteneur. 

Imaginons que les données se trouvent — sur l'hôte — dans `/share/data`, le lien se fait par : 

```bash
~:# docker run -ti --rm --volume /share/data:/data debian bash
```
- `-ti` pour que le terminal soit interactif,
- `--rm` supprime l'image à la fermeture du conteneur

Cette technique limite la portabilité du conteneur (puisque les données sont sur l'hôte) et donne un accès au _filesystem_ de l'hôte ce qui est un trou de sécurité. 

### Les bases de données conteneurisées

Il existe des images pour les principaux SGBD (MySQL, PostgreSQL, MongoDB, etc.).

Par exemple : 

```bash
docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw 
  -e MYSQL_DATABASE=mydb -d mysql:latest
```
- `--name my-mysql` donne un nom au conteneur;
- `-e` donne des valeurs aux variables d'environnement. Ici pour la base de donnée et pour le mot de passe _root_;
- `-d` détache le conteneur pour qu'il s'exécute en _background_
- _mysql:latest_ le nom de l'image

Une fois que le conteneur tourne en _background_, il est possible d'y exécuter un _shell_ : 

```bash
~:$ docker exec -it my-mysql bash
root@1234# mysql -u root -p
```

:::warning
Pour se connecter à partir de l'hôte, mapper les ports avec `-p 3306:3306`. 

Pour tester, supprimer l'image avec `docker remove -f <id | name>` et la recréer avec le mappage de ports. 
:::

:::warning
Pour se connecter à partir l'un autre conteneur, mettre les conteneur dans le même réseau _via_ `--network <network name>` ou `--net=<network name>`.
:::

Les données sont stockées dans le conteneur et sont supprimées si le conteneur est supprimé. Attacher un volume permet de les conserver. 


```bash
docker run --name my-mysql 
    -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb 
    -p 3306:3306 
    -v my-mysql-data:/var/lib/mysql 
    -d 
    mysql:latest
```

Cette commande utilise un volume nommé `my-mysql-data` pour stocker les données de la base de données MySQL.

### Personnalisation d'une image de base de données

Avec un `Dockerfile` il est possible de créer son image personnalisée. Voici un exemple : 

```dockerfile
FROM mysql:latest
ENV MYSQL_DATABASE mydb
COPY ./scripts/ /docker-entrypoint-initdb.d/
```
- `ENV` défini une variable d'environnement donnant le nom de la BD;
- `COPY` copie les fichiers contenu dans le répertoire `scripts` de l'hôte dans le répertoire `/docker-entrypoint-initdb.d/`. Dans ce répertoire les fichiers `.sh`, `.sql` et `.slq.gz` sont exécutés lorsque le conteneur est exécuté pour la première fois. 

Avec une structure comme celle-ci : 

```
├── your-project-directory/
│ ├── scripts/
│ │ └── create_table.sql
│ └── Dockerfile
```

et 

```bash
~:$ cat scripts/create_table.sql
CREATE TABLE IF NOT EXISTS mydb.myothertable (
  column_name VARCHAR(255)
);

INSERT INTO mydb.myothertable (column_name) VALUES ('other_value');
```

la création d'une image docker se fait par  : 

```bash
~:$ docker build -t my-custom-mysql .
```
- `-t <name>` associe un nom à l'image
- `.` signifie à docker que les fichiers nécessaires au _build_ de l'image sont dans le répertoire courant. 

Lancer l'image nouvellement créée se fait par : 

```bash
~:$ docker run --name my-mysql 
    -e MYSQL_ROOT_PASSWORD=my-secret-pw 
    -d 
    my-custom-mysql
```

`docker ps` permet de vérifier que le conteneur est actif. Et il est également possible de lancer un `SELECT` directement sur le conteneur par : 

```bash
 docker exec my-mysql mysql 
    -u root -pmy-secret-pw 
    -e "SELECT * FROM mydb.myothertable;"
```

:::info À LIRE AUSSI / SOURCE
[Database guide on Docker](https://docs.docker.com/guides/databases/)
:::