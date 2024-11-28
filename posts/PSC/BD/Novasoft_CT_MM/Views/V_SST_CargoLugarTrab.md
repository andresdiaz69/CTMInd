# View: V_SST_CargoLugarTrab

## Usa los objetos:
- [[GTH_Lugar_Trabajo]]
- [[rhh_cargos]]
- [[SST_CargosLugTrab]]

```sql
CREATE VIEW [dbo].[V_SST_CargoLugarTrab]
AS
SELECT        CL.cod_car, C.nom_car, CL.cod_lugar, L.des_lugar
FROM            dbo.SST_CargosLugTrab AS CL INNER JOIN
                         dbo.rhh_cargos AS C ON CL.cod_car = C.cod_car INNER JOIN
                         dbo.GTH_Lugar_Trabajo AS L ON CL.cod_lugar = L.cod_lugar

```
