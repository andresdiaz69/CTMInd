# View: vw_Descargos_Estados

## Usa los objetos:
- [[Descargos_Estados]]
- [[Descargos_EstadosAgrupados]]

```sql
CREATE VIEW [dbo].[vw_Descargos_Estados] AS
SELECT	IdEstado,					NombreEstado,		Descripcion,		IdGrupoEstado, 
		DescripcionGrupo,			EstadoUsuario,		Activo,				TipoEstado,
		UsuarioProcesoAnterior
FROM 
(
	SELECT	E.IdEstado,			E.NombreEstado,									E.Descripcion,		
		GE.IdGrupoEstado, 		DescripcionGrupo=GE.Descripcion,				EstadoUsuario = E.Usuario,
		E.Activo,				UsuarioProcesoAnterior = E.UsuarioAnterior,
		CASE WHEN E.IdGrupoEstado IN (5,6) THEN 'Finalizado' ELSE 'Activo' END AS TipoEstado
	FROM Descargos_Estados E
	LEFT JOIN Descargos_EstadosAgrupados GE ON E.IdGrupoEstado = GE.IdGrupoEstado
) A

```
