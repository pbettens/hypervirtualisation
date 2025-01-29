---
title: iSCSI
order: 24
tags: Ressources
icon: dungeon
---


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

