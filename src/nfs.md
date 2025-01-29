---
title: NFS
order: 23
tags: Ressources
icon: dungeon
---

## NFS

**NFS** (_Network Files System_) est un protocole de partage de fichiers sur le réseau. Initialement développé pour _*nix* par Sun Microsystems en 1984, NFS est également disponible pour MS Windows

NFS existe en plusieurs versions : 

- version **1** et **2**, sont non sécurisées[^f1] et fonctionne sur `UDP`;
- version **3** prend également en charge `TCP`;
- version **4** `NFSv4` n'est plus rétrocompatible avec les anciennes versions.

[^f1]: Ce n'était pas du tout une préoccupation à l'époque. 


NFS fonctionne en client-serveur. Le port par défaut : 2049.

### Mise en œuvre

#### Le serveur 

Installer le serveur NFS

```bash
># apt install nfs-kernel-server
```

Gestion du service _via_ `systemd` « comme d'habitude »

```bash
># systemctl <start | stop | restart | enable> nfs-server
```

Partager des répertoires sur le serveur _via_ le fichier de configuration `/etc/exports` dont le format à l'allure suivante : 

```conf
/my/share   192.168.1.5(rw,sync)
/my/share   192.168.1.5(rw,sync) 192.168.1.6(rw,sync)
/my/share   192.168.1.0/24(rw,sync)
```

    - partage à une machine;
    - à plusieurs;
    - à un réseaux.

Les options sont multiples : `rw`, `ro`, `sync`, `root_squash`…
    - `root_squash` force le mapping de _root_ (sur les clients) vers _anonyme_ (sur le serveur).

```conf
/my/share   192.168.1.5(rw,all_squash,anonuid=1001,anongid=1001,async)
```

Appliquer les changements à chaque modification du fichier `/etc/exports`. 

```bash 
># exports -a
```

#### Le client

Installation de la partie cliente 

```bash 
># apt install nfs-common
```

Dès lors monter le partage se fait _via_

```bash 
># mkdir -p /mnt/share
># mount -t nfs 192.168.1.4:/my/share /mnt/share
```

:::tip Vérification
La commande `df -h` montre le filesystem et donc si le partage est bien monté. 
:::


