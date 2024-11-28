# View: vw_ClientesDaimlerMostrador

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]

```sql
create view vw_ClientesDaimlerMostrador as
select a.Nitcliente,a.NombreCliente
from ComisionesSpigaAlmacenAlbaran	a
where a.centro like '%DAI.C%'
and a.Ano_Periodo > 2020
```
