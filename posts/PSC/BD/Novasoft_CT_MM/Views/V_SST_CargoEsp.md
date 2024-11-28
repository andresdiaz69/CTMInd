# View: V_SST_CargoEsp

## Usa los objetos:
- [[rhh_cargos]]
- [[SST_Cargo_Espec]]
- [[SST_CargoCarEsp]]

```sql
CREATE VIEW [dbo].[V_SST_CargoEsp]
AS
SELECT        C.cod_car, C.nom_car, E.cod_car_esp, E.nom_car_esp
FROM            dbo.SST_CargoCarEsp AS D INNER JOIN
                         dbo.rhh_cargos AS C ON D.cod_car = C.cod_car INNER JOIN
                         dbo.SST_Cargo_Espec AS E ON D.cod_car_esp = E.cod_car_esp

```
