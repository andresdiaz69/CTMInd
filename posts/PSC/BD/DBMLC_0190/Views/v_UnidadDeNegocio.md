# View: v_UnidadDeNegocio

## Usa los objetos:
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[v_UnidadDeNegocio]
AS
SELECT DISTINCT NombreUnidadNegocio, LTRIM(RTRIM(CodUnidadNegocio)) as CodUnidadNegocio 
FROM            dbo.UnidadDeNegocio

```
