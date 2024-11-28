# View: v_GMF_ListaTotalSedes

## Usa los objetos:
- [[v_GMF_12_ValoresVentasNetasTotalSedes]]

```sql

CREATE VIEW [dbo].[v_GMF_ListaTotalSedes]
AS
SELECT DISTINCT CodigoPresentacion, NombrePresentacion, Empresa
FROM            dbo.v_GMF_12_ValoresVentasNetasTotalSedes

```
