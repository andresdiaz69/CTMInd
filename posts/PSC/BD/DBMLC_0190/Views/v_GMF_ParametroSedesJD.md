# View: v_GMF_ParametroSedesJD

## Usa los objetos:
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql

CREATE VIEW [dbo].[v_GMF_ParametroSedesJD]
AS
SELECT DISTINCT Empresa, 'John Deere' AS UnidadDeNegocio, Sede
FROM            dbo.v_GMF_1_JD_ValoresVentasNetas

```
