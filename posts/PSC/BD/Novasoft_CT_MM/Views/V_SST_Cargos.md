# View: V_SST_Cargos

## Usa los objetos:
- [[rhh_cargos]]
- [[SST_CargosLugTrab]]

```sql
CREATE VIEW [dbo].[V_SST_Cargos]
AS
SELECT        CL.cod_car, C.nom_car
FROM            dbo.SST_CargosLugTrab AS CL INNER JOIN
                         dbo.rhh_cargos AS C ON CL.cod_car = C.cod_car
GROUP BY CL.cod_car, C.nom_car

```
