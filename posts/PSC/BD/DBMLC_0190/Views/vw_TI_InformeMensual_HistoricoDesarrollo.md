# View: vw_TI_InformeMensual_HistoricoDesarrollo

## Usa los objetos:
- [[Profiles]]
- [[TI_InformeMensual_HistoricoDesarrollo]]
- [[TI_InformeMensual_StatusDesarrollo]]
- [[vw_TI_InformeMensual_Desarrollo]]

```sql
CREATE VIEW [dbo].[vw_TI_InformeMensual_HistoricoDesarrollo] AS 
SELECT A.IdDesarrollo, A.Año, A.Mes, A.NombreDesarrollo, A.NombreSolicitante, A.CentroSolicitante, A.NombreCentro, A.SeccionSolicitante, 
	A.NombreSeccion, A.FechaSolicitud, A.NombreDesarrollador, A.IdTipoDesarrollo, A.TipoDesarrollo, B.IdStatus, D.Descripcion AS Estatus, 
	B.PorcentajeAvance, B.FechaStatus, A.Descripcion, A.Observaciones, B.FechaModificacion, ObservacionesModificacion = B.Observaciones,
	UserModifico = REPLACE(REPLACE(REPLACE(C.Nombres + ' ' + C.Apellidos,' ','<>'),'><',''),'<>',' ')
FROM vw_TI_InformeMensual_Desarrollo AS A
INNER JOIN	TI_InformeMensual_HistoricoDesarrollo	AS B ON A.IdDesarrollo = B.IdDesarrollo
LEFT JOIN	TI_InformeMensual_StatusDesarrollo		AS D ON B.IdStatus = D.IdStatus
INNER JOIN	Profiles AS C ON B.UserModifico = C.UserId

```
