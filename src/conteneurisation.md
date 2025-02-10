# Conteneurisation

> Un **conteneur** (_container_) est une forme légère de virtualisation où l'on encapsule uniquement ce qui est nécessaire à l'application. Le conteneur est exécuté sur le système hôte.

> Il n'y a pas de système d'exploitation à proprement dit dans un conteneur. Uniquement les binaires et les bibliothèques (_libraries_) nécessaires. 

Au départ, des outils linux

- `chroot` (1960) pour **ch**ange **root** qui change la racine du _filesystem_  pour un processus.
- _BSD jail_ (2000) amélioration du `chroot` en séparant également les processus, les utilisateurs et le réseau. Les processus se trouvent dans une _sandbox_ (bac à sable).
- _namespace_ (2002) est une fonctionnalisé du noyau (_kernel_) qui séparent les ressources de manière telle qu'un ensemble de processus voient un ensemble de ressources tandis qu'un autre ensemble de processus voit un autre ensemble de ressource. Les _namespaces_ permettent une isolation des processus. 
- _cgroups_ (2007) pour **c**ontrol **groups** limitent les ressources (CPU, mémoire, IO, réseau…) disponibles pour un processus. Les _cgroups_ ont été initiés par Google (2006) avant d'être intégré au noyau linux >2.6.24
- LXC (2008) pour **l**inu**x** **c**ontainers combinent les _cgroups_ et les _namespaces_… et souffrent de 

Quelques projets (VServer, OpenVZ, Warden, LMCTFY _let my contain that for you_) ont vécus et ont été vaincus par Docker. 

**Docker** (2013) est l'héritier direct de LXC puisqu'il utilisait LXC et l'a ensuite remplacé par `libcontainer`. 

Pourquoi Docker et pas un autre ? 

Quelques fonctionnalités de Docker : 

- un démon _Docker CLI_ avec une API et un modèle client-serveur;
- un fichier _Dockerfile_ qui est un fichier texte définissant le conteneur à partir d'une image de base à laquelle on ajoute des fonctionnalités;
- un dépôt d'images _Docker Registry_ pour partager ses images;
- un fichier _Docker-compose_ définissant une application multi-conteneurs en un fichier YAML.

