# View: vw_Descargos_HistoricoSolicitud

## Usa los objetos:
- [[AspNetUsers]]
- [[Descargos_HistoricoSolicitud]]
- [[Profiles]]
- [[vw_Descargos_Estados]]

```sql
CREATE VIEW [dbo].[vw_Descargos_HistoricoSolicitud] AS
SELECT	HS.IdHistorico,						HS.IdSolicitud,							HS.IdEstado,
		E.NombreEstado,						HS.FechaModificacion,					TipoUsuario = E.EstadoUsuario,
		UsuarioProcesoAnterior,				IdUsuario = HS.UserModifico,			CedulaUsuario = U.UserName,
		CorreoUsuario = U.Email,

		NombreUsuario = REPLACE(REPLACE(REPLACE(P.Nombres + ' ' + P.Apellidos,' ','<>'),'><',''),'<>',' '),

		Observaciones = CASE WHEN LTRIM(RTRIM(HS.Observaciones)) = '' OR HS.Observaciones IS NULL THEN NULL ELSE HS.Observaciones END
FROM Descargos_HistoricoSolicitud	HS
LEFT JOIN vw_Descargos_Estados		E ON HS.IdEstado = E.IdEstado
LEFT JOIN Profiles					P ON HS.UserModifico = P.UserId
LEFT JOIN AspNetUsers				U ON HS.UserModifico = U.Id

```
