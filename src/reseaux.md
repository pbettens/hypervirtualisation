# Le réseau dans les hyperviseurs

Dans un environnement virtualisé, les machines — dans ce cas, virtuelles — doivent communiquer : soit entre elles, soit avec l'hôte physique soit encore, avec le réseau externe. La **connectivité** est virtuelle et doit être la plus **efficace** possible. Parfois, l'environnement nécessitera que les réseaux virtuels soient segmentés pour permettre une meilleure **isolation**.

Il existe deux techniques dont les détails diffèrent un peu en fonction de l'hyperviseur utilisé. 

## **NAT** (*network address translation*)

Seule l'adresse IP de l'hôte est utilisée et l'hyperviseur fournit la connectivité aux différentes _VM_. Seul l'hyperviseur est visible de l'extérieur. Les _vm_ sont invisibles. 

NAT est plus fréquent dans les environnements de test et avec des hyperviseurs de type 2 (_hosted_).

## **vSwitch** (*virtual switch*)

Un _vSwitch_ est un _switch_ (commutateur) logiciel simulant un _switch_ physique utilisé pour connecter les machines entre elles. Ces _vSwiches_ supportent les VLANs. 

Un _bridge_ (au sens linux) est la version linux du _vSwitch_. 

- KVM utilise `bridge-util` ou `openvswitch`
- Proxmox est une _surcouche_ à KVM et propose une interface web pour créer un bridge et l'associer à un VLAN (@fixme à vérifier)
- ESXi utilise ses _vswitch_ propriétaires


:::tip 💡 À LIRE AUSSI
[Bridge linux](bridge.md)
:::


:::warning

**À vérifier** Configuration d'un bridge virtuel avec certains ports dans certains _VLANs_. 

:::