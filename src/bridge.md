# Bridge

## Configuration d'un bridge

La configuration d'un _bridge_ se fait grâce au paquet `bridge-utils` et la commande associée est `brctl`. 

La création d'un _bridge_ aura cette allure : 

```bash 
:~# brctl addbr br0
:~# brctl addif br0 eth0
:~# ip a br0 <IP>
```

1. création du bridge
2. ajout de l'interface `ethO` au bridge
3. attribution d'une adresse IP au bridge

Pour rendre cette configuration automatique, éditer le fichier `/etc/network/interfaces` : 

```conf
auto br0
iface br0 inet static
  address <IP>/<mask>
  broadcast <IP>
  gateway <IP>
  bridge_ports eth0
```

:::info 
La configuration réseau au sein d'une machine virtuelle, ne change pas. C'est bien lors de la configuration de la machine virtuelle (_vm_) que l'interface réseau (virtuelle) de la machine est assignée au _bridge_.
::: 

## Configuration de VLANs

Par défaut, le noyau linux ne prend pas en charge les VLANs. Il ne prend pas en charge le protocole **802.1Q**. Le noyau linux peut être recompilé pour que le protocole soit pris en charge ou, plus simplement, un _module peut être ajouté au noyau_. 

:::info

Le noyau linux offre la possibilité de pouvoir ajouter _à chaud_ des fonctionnalité au système. 

Un module noyau est un _bout de code_ pouvant être inséré au code en cours de fonctionnement. Les commandes associées aux modules sont : `lsmdo`, `modprobe`, `rmmod` et `insmod`. 

:::

1. ajout du module au noyau

```bash 
:~# modprobe 8021q
```

:::info
Des infos sur le modules peuvent être données par `modinfo 8021q`.
:::



```
ip link add link <nom interface> name <nom de interface du vlan> type vlan id <num vlan>
ip link set dev <nom de interface du vlan> up 
ip addr add <IP/masque> brd <broadcast IP> dev <nom de interface du vlan> 
ip -d link show <nom de interface du vlan> 
```
exemple : Nous allons créer un vlan 5 sur l'interface eno1:

ip link add link eno1 name eno1.5 type vlan id 5   
ip link set dev eno1.5 up
ip addr add 192.168.1.200/24 brd 192.168.1.255 dev eno1.5
ip -d link show eno1.5


TODO brctl and co
TODO voir pour les VLAN