# View: V_GTH_DocImpVinCar

## Usa los objetos:
- [[GTH_DocImpMasCargo]]

```sql

CREATE VIEW [dbo].[V_GTH_DocImpVinCar]
AS
SELECT        cod_car, cod_doc, cod_eve
FROM            dbo.GTH_DocImpMasCargo
WHERE        (cod_eve = 1)

```
