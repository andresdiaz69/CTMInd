# View: vw_InformesPresentacionesGrupos

## Usa los objetos:
- [[InformesGruposPresentaciones]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesGrupos]]

```sql
CREATE VIEW [dbo].[vw_InformesPresentacionesGrupos]
AS
SELECT        A.CodigoGrupo, A.NombreGrupo, B.CodigoPresentacion, C.NombrePresentacion
FROM            dbo.InformesGruposPresentaciones AS A LEFT OUTER JOIN
                         dbo.InformesPresentacionesGrupos AS B ON A.CodigoGrupo = B.CodigoGrupo LEFT OUTER JOIN
                         dbo.InformesPresentaciones AS C ON B.CodigoPresentacion = C.CodigoPresentacion
WHERE        (B.CodigoPresentacion IS NOT NULL)

```
