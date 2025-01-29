---
title: LVM
order: 22
tags: Ressources
icon: dungeon
---

# LVM - Logical Volume Management 

Gestion de l'espace de stockage qui sépare la gestion des parties physiques du stockage, les disques, des parties logiques, les points de montage. 

Là où habituellement un répertoire est monté sur une partition d'un disque dur, un répertoire sera monté sur un **volume logique** (*logical volume*). Un volume logique est une partie — une *pseudo-partition* — d'un groupe de volume qui est lui-même constitué de plusieurs volumes physiques. Un peu comme ceci :

![illustration d'une structure LVM - Crédit It-connect](/assets/img/lvm-itconnect.png)

## Définitions

- PV - *physical volume*, les volumes physiques. Ils peuvent être : des partitions, des volumes RAID ou encore  des unités logiques d'un SAN ;
- VG - *volume groups*, le groupe de volumes. Il est constitué des volumes physiques formant un pseudo volume physique (disque dur) ;
- LV - *logical volume*, les volumes logiques. Ils sont les pseudos partitions découpées dans les groupes de volume puis formatées et montées. 

Un des intérêt de LVM est la possibilité de redimensionner (à chaud) les volumes logiques. 

Il est également possible d'ajouter des volumes physiques à chaud à des groupes de volumes. Pour les retirer, il faut que le volume à retirer ne soit pas utilisé. 

## Commandes usuelles LVM2

Les commandes concernant les volumes physiques commencent par **pv**. Celles pour les groupes de volumes, par **vg** et celles pour les volumes logiques par **lv**.  
Par exemple *pvs* pour voir la liste des volumes physiques ou *pvdisplay* pour un affichage plus verbeux. 

```bash
root@myhost # pvs
PV          VG      Fmt   Attr  PSize  PFree
/dev/sda2   vgname  lvm2  a--   42,00g 24,00m
```

- Pour les volumes physiques :  
`pvcreate, pvresize, pvscan, pvs, pvdisplay, pvremove, pvmove, pvchange`

- Pour les groupes de volume :  
`vgcreate, vgdisplay, vgscan, vgs, vgck, vgremove`
    
- Pour les volumes logiques :  `
lvcreate, lvmdiskscan, lvs, lvdisplay, lvremove, lvextend`
    
- Pour la sauvegarde/restauration de la structure LVM :  
`vgcfgbackup, vgcfgrestore`


## Installation et création

- `apt install lvm2`

- initialiser lvm dans des partitions physiques (création d'un volume physique) : 

    ```bash
    pvcreate <partition name 1> <partition name 2>

    # Utilisation des deux partitions sda2 et sdb3 sur 
    # deux périphériques différents
    pvcreate /dev/sda2 /dev/sdb3
    ```

- création du groupe de volumes contenant les volumes physiques :   

    ```bash
    vgcreate <volume name> <partition name i>
    
    # Création d'un groupe de volume nommé vg-great 
    # contenant les deux partitions physiques préparées
    # précédemment 
    vgcreate vg-great /dev/sda2 /dev/sdb3
    ```

    
- création des volumes logiques dans le groupe de volumes :

    ```bash
    lvcreate --size <size> --name <logic name> \
        <volume name>

    # Création de deux partitions logiques, une pour / et 
    # une pour /home
    lvcreate --size 50G --name home vg-great
    lvcreate --size 10G --name root vg-great
    ```
    Les noms des volumes logiques sont de la forme `/dev/vgname/lvname` et plus `/dev/sdxi`.   

    `vgs` ou `vgdisplay` donne des infos sur le groupe de volumes.

- il reste à créer un *filesysem* sur la pseudo--partition, le volume logique :

    ```bash
    mkfs.ext4 </dev/vgname/lvname>

    # Je choisis ext4 comme système de fichiers
    mkfs.ext4 /dev/vg-great/root
    mkfs.ext4 /dev/vg-great/home
    ```

Dès lors que tout est en place, il sera possible de réduire ou agrandir ou supprimer des volumes logiques. 

**Remarque :** Il faudra adapter la taille du *filesystem* en conséquence. Soit avec une commande du type `resize2fs` après la réduction ou l'agrandissement, soit en demandant à lvm de le faire en même temps. Ce que nous faisons ci-dessous avec l'option `--resize2fs` :

- réduction d'une partition (démontée) :

    ```bash
    lvreduce --size -<size> --resize2fs <logic name>

    # Réduire /home d'1Gib
    lvreduce --size -1024M --resize2fs /dev/vg-great/home
    ```

- agrandissement d'une partition (peut rester montée) :  

    ```bash
    lvextend --size +<size> --resize2fs <logic name>

    # Agrandir / d'1Gib
    lvextend --size +1024M --resize2fs /dev/vg-great/root
    ```
- suppression d'une partition :  

    ```bash
    umount <mount point>
    lvremove <logic name>

    # Démonter /home et supprimer le volume logique associé
    umount /home 
    lvremove /dev/vg-great/home
    ```


# Snapshot

Un *snapshot* ou instantané est une référence — à un moment donné — d'un volume logique. À sa création, le snapshot est vide. Il contiendra tous les changements intervenus dans le volume depuis la création du snapshot. 

Le snapshot est stocké sur le groupe de volume qui doit contenir de l'espace non alloué. 

- création d'un snapshot :

    ```bash
    lvcreate --snapshot --name <snapshot name> --size <size> <logic name>

	# Créer un snapshot aujourd'hui du volume home
    lvcreate --snapshot --name backup_home_20191024 \
    	--size 20G /dev/vg-great/home
    ```

Le snapshot ne doit pas avoir la même taille que le volume logique étant donné
qu'il se *remplit au fur et à mesure*. S'il commence à atteindre sa taille
maximale, il est possible de le redimentionner avec *lvresize*. 



