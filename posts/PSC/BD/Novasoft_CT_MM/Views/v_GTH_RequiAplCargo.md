# View: v_GTH_RequiAplCargo

## Usa los objetos:
- [[GTH_RequiCargo]]
- [[GTH_Requisicion]]
- [[GTH_Requisitos]]

```sql
CREATE VIEW dbo.v_GTH_RequiAplCargo
AS
SELECT     dbo.GTH_Requisitos.cod_requi, dbo.GTH_Requisitos.des_requi
FROM         dbo.GTH_Requisitos INNER JOIN
                      dbo.GTH_RequiCargo ON dbo.GTH_Requisitos.cod_requi = dbo.GTH_RequiCargo.cod_requi INNER JOIN
                      dbo.GTH_Requisicion ON dbo.GTH_Requisicion.car_sol = dbo.GTH_RequiCargo.cod_car

```
