# View: V_Rhh_ConvCargo

## Usa los objetos:
- [[rhh_cargos]]
- [[Rhh_ConvCargo]]

```sql
CREATE VIEW [dbo].[V_Rhh_ConvCargo]
AS
SELECT        Cv.cod_conv, Cv.cod_car, C.nom_car
FROM            dbo.Rhh_ConvCargo AS Cv INNER JOIN
                         dbo.rhh_cargos AS C ON C.cod_car = Cv.cod_car

```
