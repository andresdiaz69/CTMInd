# View: vw_InformesGruposPresentaciones

## Usa los objetos:
- [[InformesGruposPresentaciones]]

```sql




CREATE VIEW [dbo].[vw_InformesGruposPresentaciones]
AS
SELECT        CodigoGrupo, NombreGrupo
FROM            dbo.InformesGruposPresentaciones
GROUP BY CodigoGrupo, NombreGrupo

```
