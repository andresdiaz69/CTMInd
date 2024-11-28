# View: v_GTH_HabilCargo

## Usa los objetos:
- [[GTH_CompeCargo]]

```sql


CREATE VIEW [dbo].[v_GTH_HabilCargo]
AS
SELECT     cod_car, cod_comp, cod_calif, niv_comp, ind_hab
FROM         dbo.GTH_CompeCargo
WHERE     (ind_hab = 1)

```
