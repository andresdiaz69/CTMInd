# View: V_GTH_NovFijaCargoCia

## Usa los objetos:
- [[GTH_NovFijaCargo]]

```sql

CREATE VIEW [dbo].[V_GTH_NovFijaCargoCia]
AS
SELECT        cod_cia, cod_car, cod_conv
FROM            dbo.GTH_NovFijaCargo
WHERE        (cod_cli = 0)

```
