---
title: NFS
order: 23
tags: Ressources
---

## NFS


  - Utilise le protocole **TCP/UDP** sur le port 2049.


#### **2.2. Stockage NFS**
- **Fonctionnement** :
  - Partage de fichiers via le réseau.
  - Accessible depuis plusieurs hyperviseurs en mode partagé.
- **Avantages** :
  - Facile à configurer.
  - Bonne compatibilité (Proxmox, ESXi, KVM, etc.).
- **Inconvénients** :
  - Performances réseau limitées (dépend du matériel et de la bande passante).
- **Mise en œuvre NFS (sur un serveur Linux)** :
  1. Installer le serveur NFS :
     ```bash
     sudo apt install nfs-kernel-server
     ```
  2. Créer un dossier à partager :
     ```bash
     sudo mkdir /mnt/shared
     sudo chown nobody:nogroup /mnt/shared
     ```
  3. Configurer l’export dans `/etc/exports` :
     ```
     /mnt/shared 192.168.1.0/24(rw,sync,no_subtree_check)
     ```
  4. Appliquer la configuration :
     ```bash
     sudo exportfs -ra
     ```



TODO 
voir si on sépare dans un autre fichier ou si on renomme en **san**


#### **2.3. Stockage iSCSI**
- **Fonctionnement** :
  - Emule un disque local sur le réseau en utilisant le protocole iSCSI.
  - Très utilisé pour les SAN dans les grandes infrastructures.
- **Avantages** :
  - Performances proches du stockage local.
  - Fonctionne avec les principaux hyperviseurs.
- **Inconvénients** :
  - Configuration plus complexe.
- **Mise en œuvre iSCSI (sur un serveur Linux)** :
  1. Installer le serveur iSCSI :
     ```bash
     sudo apt install tgt
     ```
  2. Configurer une cible iSCSI :
     Éditer `/etc/tgt/conf.d/iscsi.conf` :
     ```
     <target iqn.2023-01.localhost:target1>
         backing-store /dev/sdb
     </target>
     ```
  3. Redémarrer le service iSCSI :
     ```bash
     sudo systemctl restart tgt
     ```
