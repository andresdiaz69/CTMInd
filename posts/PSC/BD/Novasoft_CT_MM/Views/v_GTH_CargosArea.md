# View: v_GTH_CargosArea

## Usa los objetos:
- [[rhh_cargos]]
- [[rhh_DefPlanta]]

```sql

CREATE VIEW [dbo].[v_GTH_CargosArea]
AS
SELECT     dbo.rhh_DefPlanta.cod_car, dbo.rhh_cargos.nom_car, dbo.rhh_DefPlanta.cod_area, dbo.rhh_DefPlanta.cod_cia,
		   dbo.rhh_cargos.cod_conv
FROM         dbo.rhh_cargos INNER JOIN
                      dbo.rhh_DefPlanta ON dbo.rhh_cargos.cod_car = dbo.rhh_DefPlanta.cod_car

```
