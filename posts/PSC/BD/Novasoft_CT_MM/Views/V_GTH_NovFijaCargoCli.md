# View: V_GTH_NovFijaCargoCli

## Usa los objetos:
- [[GTH_NovFijaCargo]]

```sql

CREATE VIEW [dbo].[V_GTH_NovFijaCargoCli]
AS
SELECT        cod_cli, cod_car, cod_conv
FROM            dbo.GTH_NovFijaCargo
WHERE        (cod_cli <> 0)

```
