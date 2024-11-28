# View: V_GTH_PrueReq

## Usa los objetos:
- [[GTH_PbaCargo]]
- [[GTH_Pruebas]]
- [[GTH_Requisicion]]

```sql

CREATE VIEW [dbo].[V_GTH_PrueReq]
AS
SELECT     P.cod_pba, P.nom_pba, R.num_req
FROM         dbo.GTH_Requisicion AS R INNER JOIN
                      dbo.GTH_PbaCargo AS PC ON R.car_sol = PC.cod_car INNER JOIN
                      dbo.GTH_Pruebas AS P ON P.cod_pba = PC.cod_pba


```
