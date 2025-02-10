# Stockage

Différents types de stockages peuvent être envisagés en fonction du matériel et de l'usage : 

- stockage local ou stockage distant;
- ajout d'une redondance grace à des systèmes RAID;
- ajout d'une certaine souplesse en différenciant _volume physique_ et _volume logique_.

## Stockage local

Le ou les disques se trouvent directement sur l'hôte. 

|**Avantages**  | |
|--         |--|
||Simple     |
||Accès rapide _I/O_ |
|**Inconvénients**||
||Pas ou peu de tolérance aux pannes (sans RAID)|
||Pas de partage entre différents hôtes

### LVM

**LVM** (_Logical Volume Manager_) est un outil permettant de gérer les volumes logiques sur un ou plusieurs disques physiques. LVM offre une plus grande **flexibilité** dans l'allocation de l'espace disque et donne la possibilité de **redimensionner** les volumes logiques. 



## Stockage distant

Le stockage se trouve sur une autre machine ce qui permet de centraliser les données et de les partager entre plusieurs hyperviseurs. 

Types courants de stockage distant :
- **NFS** (_Network File System_)
- **iSCSI** (_Internet Small Computer System Interface_).

Un machine qui offre du stockage est un **SAN** (_Storage Area Network_) en langage verbeux, c'est _une architecture réseau spécialisée pour centraliser le stockage_. Elle utilise généralement **iSCSI** ou  Fibre Channel (_ref needed_)

Il est possible d'installer un service _tout en un_ comme : TODO


**NFS** et **iSCSI** ont une approche différente :   
- **NFS** est orienté partage de fichiers tandis que,
- **iSCSI** c'est du stockage brut.

**NFS** est un **système de fichiers distribué**. Le client monte un partage distant dans son système de fichier. Le client voit un système de fichiers accessible _au niveau fichier_. 

**iSCSI** est un **protocole de transport de blocs**. Le client accède à un disque distant comme s'il s'agit d'un disque physique local. Le client voit un disque brut accessible _au niveau blocs_. C'est donc le client qui doit formater (et choisir un système de fichiers) le disque. 

Les performances de _iSCSI_ sont supérieures (supporte mieux la charge). _iSCSI_ n'est pas conçu pour des accès simultanés. 

| **Aspect**                  | **NFS**                                 | **iSCSI**                              |
|-----------------------------|------------------------------------------|-----------------------------------------|
| **Niveau d’accès**          | Niveau fichiers                         | Niveau blocs                           |
| **Vue côté client**         | Un répertoire monté                     | Un disque brut                         |
| **Gestion du système de fichiers** | Par le serveur NFS (ex. : ext4, XFS)    | Par le client (ex. : ext4, NTFS)       |
| **Partage multi-clients**   | Oui, nativement                         | Non, sauf avec un système de fichiers clusterisé (ex. : GFS2, OCFS2). |
| **Usage typique**           | Partage de fichiers                     | Disques pour bases de données, VM, etc.|
| **Performances**            | Moins performant pour des workloads lourds | Performances supérieures en I/O        |



:::tip À LIRE AUSSI
_Voir [LVM](lvm.md)_  
_Voir [NFS](nfs.md)_  
:::

