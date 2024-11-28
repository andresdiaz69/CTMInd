# View: vw_JefeDeAccesoriosBonaparte

## Usa los objetos:
- [[vw_BaseComisionesRepuestosBonaparte]]

```sql
CREATE view [dbo].[vw_JefeDeAccesoriosBonaparte] as 
select Año,MesInicial,MesFinal,Sede,valor
from vw_BaseComisionesRepuestosBonaparte
where --sede in ('BN-Bta-Centro de Producción','BN-Bta-Ventas Corporativas','BN-Ibague-Ventas Corporativas','BN-Villavo-Ventas Corporativas','Boutiques')
sede = 'Boutiques'
--and año = 2023
--and MesFinal = 5
--and MesInicial = 5

```
