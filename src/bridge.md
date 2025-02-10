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

### Ajout du module au noyau

```bash 
:~# modprobe 8021q
```

:::tip
Des infos sur le modules peuvent être données par `modinfo 8021q`.
:::

### Création du VLAN

```bash
:~# ip link add link <interface> name <interface.vlan> 
    type vlan id <vlan id> 
:~# ip link set dev <interface.vlan> up
:~# ip addr <IP/mask> brd <broadcast IP> dev <interface.vlan>
:~# ip -d link show <interface.vlan>
```

1. ajout du VLAN
2. interface _up_
3. attribution d'une adresse IP et d'un _default gateway_ (passerelle par défaut)
4. affichage des détails sur l'interface

Par exemple 
```bash
:~# ip link add link eth0 name eth0.5 type vlan id 5    
:~# ip link set dev eth0.5 up
:~# ip addr add 172.16.0.1/16 brd 172.16.255.200 dev eth0.5
:~# ip -d link show eth0.5
```

