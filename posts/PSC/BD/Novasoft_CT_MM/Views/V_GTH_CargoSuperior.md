# View: V_GTH_CargoSuperior

## Usa los objetos:
- [[GTH_OrgaDefi]]
- [[rhh_cargos]]

```sql

CREATE VIEW [dbo].[V_GTH_CargoSuperior]
AS
SELECT        DO.cod_car, C.nom_car, DO.cod_cia, DO.cod_org
FROM            dbo.GTH_OrgaDefi AS DO INNER JOIN
                         dbo.rhh_cargos AS C ON DO.cod_car = C.cod_car


```
