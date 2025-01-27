---
title: Réseau
order: 11
tags: Cours
icon: book
---

## Le réseau dans les hyperviseurs

Dans un environnement virtualisé, les machines — dans ce cas, virtuelles — doivent communiquer : soit entre elles, soit avec l'hôte physique soit encore, avec le réseau externe. La **connectivité** est virtuelle et doit être la plus **efficace** possible. Parfois, l'environnement nécessitera que les réseaux virtuels soient segmentés pour permettre une meilleure **isolation**.

Il existe deux techniques dont les détails diffèrent un peu en fonction de l'hyperviseur utilisé. 

1. Le **NAT** (_network address translation_).

    Seule l'adresse IP de l'hôte est utilisée et l'hyperviseur fournit la connectivité aux différentes _VM_. Seul l'hyperviseur est visible de l'extérieur. Les _vm_ sont invisibles. 

2. Le **vSwitch** (_virtual switch_).

    Un _vSwitch_ est un _switch_ (commutateur) logiciel simulant un _switch_ physique utilisé pour connecter les machines entre elles. Ces _vSwiches_ supportent les VLANs. 

    Un _bridge_ (au sens linux) est la version linux du _vSwitch_. 


Le NAT est plus fréquent dans les environnements de test et avec des hyperviseurs de type 2 (_hosted_).

- KVM utilise `bridge-util` ou `openvswitch`
- Proxmox est une _surcouche_ à KVM et porpose une interface web pour créer un bridge et l'associer à un VLAN (@fixme à vérifier)
- ESXi utilise ses _vswitch_ propriétaires TODO



## TODO

- confirmation : je peux configurer un bridge et mettre certaines vm dans certains vlans. il suffit que mon hyperviseur soit connecté physiquement dans un trunk. 