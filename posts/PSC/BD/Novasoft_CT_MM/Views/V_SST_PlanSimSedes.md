# View: V_SST_PlanSimSedes

## Usa los objetos:
- [[SST_PlanSimCaract]]
- [[SST_Sedes]]

```sql
CREATE VIEW [dbo].[V_SST_PlanSimSedes]
AS
SELECT        C.anio, C.version, C.cons, C.cod_sede, S.nom_sede
FROM            dbo.SST_PlanSimCaract AS C INNER JOIN
                         dbo.SST_Sedes AS S ON C.cod_sede = S.cod_sede

```
