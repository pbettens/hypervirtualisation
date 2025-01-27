---
title: Organisation
order: 44
tags: …
---


## Organisation

Le travail au cours se fait par équipe de 4 personnes. 

Une séance de cours se compose de : une présentation théorique de 15-30 min, de travail en équipe et d'une clôture qui consiste à présenter aux autres le travail effectué. 

Les équipes seront de deux types — les **verts** et les **bleus** — en fonction de l'hyperviseur utilisé :

- Proxmox
- VMWare

### Planning

_Planning informatif pouvant être sujet à changements._

| **Séance** | **Sujets** |  **Objectifs**                     |
|------------|------------|------------------------------------|
| **1**       | Introduction à la virtualisation.<br/> Prise en main du matériel.  | Concepts clés de la virtualisation et des hyperviseurs. Démonstration avec QEmu, virt-manager. Prise en main du matériel. Répartition en groupe : les verts qui travailleront sur Proxmox et les bleus sur VMWare.|
| **2**       | Réseaux dans les hyperviseurs |Configuration des réseaux virtuels (vSwitch, _bridge_, NAT, VLANs…). Installation de l'hyperviseur. |
| **3**       | Installation et configuration de Proxmox ou VMware | Installer un hyperviseur sur un serveur physique et configurer un cluster basique. Proxmox pour les équipes _vertes_ et VMware pour les équipes _bleues_ |
| **4**       | Gestion des VMs sur un hyperviseur           | Créer, configurer et gérer des VMs avec Proxmox ou VMware (CPU, RAM, disques, réseau). |
| **5**       | Stockage (**SAN** _storage area network_)  dans les hyperviseurs | Configuration du stockage partagé (NFS/iSCSI).|
| **6**       | Gestion avancée de l'hyperviseur      | Configurer les snapshots, la migration de VMs, le stockage partagé et le monitoring (de l'hyperviseur) |
| **7**       | Orchestration avec Ansible            | Automatiser la configuration de serveurs et de conteneurs avec Ansible. |
| **8**       | Orchestration avec Ansible (suite)       | Automatiser la configuration de serveurs et de conteneurs avec Ansible. |
| **9**       | Conteneurisation avec Docker<br/>Docker Compose et réseau Docker          | Installer Docker, créer des conteneurs, et travailler avec des images Docker. Automatiser les déploiements avec Docker Compose et configurer les réseaux Docker. |
| **10**      | Finalisation | Finalisation du _lab_|
| **11**      | **Séance spéciale** : présentation de Kubernetes par une ou un intervenant externe ||
|**12**       | Rattrapage, réponse aux questions, préparation de l'examen ||


### Évaluation 

L'évaluation est continue, elle consiste à la présentation des différentes étapes à réaliser. 

TODO définir ces étapes

Pour la _seconde session_, toutes les étapes doivent être présentées. 