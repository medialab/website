
## dates
Il faut ajouter un *lastUpdatedBySpire* dans l'objet pour distinguer la date de dernière modification par le processus spire de celle faite par un utilisateur.


## conflits

Les conflits apparaissent si un champs imputé par les données spire a été modifié par un utilisateur ET si il existe une nouvelle valeur pour ce champs que celle qui a été modifiée.
Cette notion est plus restrictive que celle exposée dans la discription de l'issue.
En effet si un utilisateur modifie une valeur il crée un conflit avec SPIRE mais il le fait en connaissance de cause. On décide de lui laisser la priorité.
En revanche si la valeur du même champs est par ailleurs modifié ensuite dans SPIRE on n'a bien un conflit entre une valeur entrée par l'utilisateur du CMS et une valeur entrée postérieurement par un utilisateur de SPIRE.

### Proposition d'algorithme pour détecter les conflits de données spire/CMS lors de la routine de mise à jour / import

 ```
On récupère un nouveau record correspondant à une publi existante.
On ne met pas à jour publi.spire.meta dans un premier temps.

si lastUpdateBySpire > lastUpdated :

    (la publi n'a pas été éditée dans le CMS depuis la dernière fois qu'on la mise à jour depuis SPIRE)

    Pour chaque champs de l'objet: 
        si ce champs n'est pas listé dans spire.locks de l'objet : 
            si spire.meta.champs !== record.champs
            OU si valeur générée par record.champs !== valeur du champs :
            (cas de changement de code de transformation)
                on met à jour le champs
                on met à jour lastUpdatedBySpire 
        sinon
            si valeur générée par record.champs === valeur du champs :
                on supprime lock et conflict 
sinon :
  pour chaque champs de l'objet : 
    si le champs de l'objet !== la valeur générée par spire.meta
        si spire.meta.champs !== record.champs
            si valeur générée par record != valeur champ
                (on empêche les MAJ de ce champs)
                on ajoute ce champs dans spire.lock
                (on signale qu'il y a une valeur SPIRE en conflit)
                on ajoute ce champs dans spire.conflicts
            sinon 
                on supprime lock et conflict si ils existaient
        sinon
            (on empêche les MAJ de ce champs)
            on ajoute ce champs dans spire.lock
    sinon
        si spire.meta.champs !== record.champs
            on met à jour le champs
            on met à jour lastUpdatedBySpire
            si valeur générée par record.champs === valeur du champs :
                on supprime lock et conflict si ils existaient
        
On met à jour publi.spire.meta

```

## locks et conflicts

Les conflicts (et le lock) ne peuvent être supprimés par une action utilisateur acceptant la nouvelle valeur proposée par SPIRE. Si la nouvelle valeur de SPIRE est la même que celle ajoutée par l'utilisateur on lève le conflit et le lock automatiquement.

Un lock simple sans conflit ne peut être levé que automatiquement par une nouvelle valeur de SPIRE = à la valeur de l'utilisateur.