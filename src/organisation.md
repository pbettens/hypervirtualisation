# Organisation

## Évaluation 

L'évaluation est continue, elle consiste à la présentation des différentes étapes à réaliser (cfr. plan).

Pour la _seconde session_, toutes les étapes doivent être présentées. 

## Planning

_Planning informatif pouvant être sujet à changements._

| **Séance** | **Sujets** |  **Objectifs**                     |
|------------|------------|------------------------------------|
| **1**       | Introduction à la virtualisation.<br/> Prise en main du matériel.  | Concepts clés de la virtualisation et des hyperviseurs. Démonstration avec QEmu, virt-manager. Prise en main du matériel. Répartition en groupes.|
| **2**       | Réseaux dans les hyperviseurs |Configuration des réseaux virtuels (vSwitch, _bridge_, NAT, VLANs…). Installation de l'hyperviseur. |
| **3**       | Installation et configuration de l'hyperviseur (Proxmox) | Installer un hyperviseur sur un serveur physique et configurer un cluster basique; Proxmox.|
| **4**       | Gestion des VMs sur un hyperviseur           | Créer, configurer et gérer des VMs (CPU, RAM, disques, réseau). |
| **5**       | Stockage (**SAN** _storage area network_)  dans les hyperviseurs | Configuration du stockage partagé (NFS/iSCSI).|
| **6**       | Gestion avancée de l'hyperviseur      | Configurer les snapshots, la migration de VMs, le stockage partagé et le monitoring (de l'hyperviseur) |
| **7**       | Automatisation avec Ansible            | Automatiser la configuration de serveurs et de conteneurs avec Ansible. |
| **8**       | Automatisation avec Ansible (suite)       | Automatiser la configuration de serveurs et de conteneurs avec Ansible. |
| **9**       | Conteneurisation avec Docker<br/>Docker Compose et réseau Docker          | Installer Docker, créer des conteneurs, et travailler avec des images Docker. Automatiser les déploiements avec Docker Compose et configurer les réseaux Docker. |
| **10**      | Finalisation | Finalisation du _lab_|
| **11**      | **Séance spéciale** : présentation de Kubernetes par une ou un intervenant externe ||
|**12**       | Présentation finale du travail ||

## Organisation des séances

Le travail au cours se fait par équipe de 4 personnes. Il y a 2, 3 ou 4 équipes par groupe classe. 

Une séance de cours se compose de : une présentation théorique de 15-30 min, de travail en équipe et d'une clôture qui consiste à présenter aux autres le travail effectué. 

Un rapport complet est rédigé au fil des séances, au format **markdown**  et dans un dépôt **git**. 

### *Check list* 

_(Cette liste sera construite au fur et à mesure du cours)_

|Sujet          | Détail                    ||
|--             |--                         |--|
|Matériel       |Reconnaissance du matériel et état des lieux.| 🔲 |
|Installation   |Installation de l'hyperviseur.| 🔲 |
|Accessibilité  |L'hyperviseur est accessible en ssh et à distance au sein du local. À chaque groupe est associé un VLAN.  La configuration réseau est opérationnelle.| 🔲 |
|Rack           |L'hyperviseur est dans le rack (selon les possibilités). | 🔲 |
|Services       |Au minimum deux services tournent sur 2 machines virtuelles différentes pour chaque hyperviseur [^f1]. | 🔲 |
|SAN            |Installation d'un SAN par groupe (chaque personne de chaque équipe est capable d'agir sur le SAN)<br/>Au moins un des services tournant dans une machine virtuelle a son _storage_ sur le SAN.   | 🔲 |
|Migration      |Une migration d'une machine est possible d'un hyperviseur à un autre.| 🔲 |
|Ansible        |Automatisation d'une install d'une machine virtuelle avec un environnement à définir.| 🔲 |
|Conteneur      |Déploiement d'au moins 2 conteneurs (avec un service)| 🔲 |
|   || 🔲 |
|   || 🔲 |


## Aspects pratiques et réseaux

Range d'IP : `172.X.0.0/16` où `16 ≤ X ≤ 31` en fonction du groupe.  
_Default gateway_ : `172.X.0.1` et le routeur fait le routage nécessaire.  
Chaque groupe classe fait partie d'un VLAN : 

|Groupe        | VLAN
|--            |--
|D223<br/>D223 | 10
|D211<br/>D212 | 20
|D213<br/>D221 | 30

![](assets/img/schema-organisation.webp "Schema de l'organisation du labo")

[^f1]: [Liste de services web installables](https://docs.google.com/document/d/1u57PAqw5KZpO-jKE0YdORzq0XbSkMCoyncOtNzU62X4/edit?usp=sharing) Chaque groupe peut proposer d'autres services. La liste est informative. 