# View: vw_TI_InformeMensual_Desarrollo

## Usa los objetos:
- [[TI_InformeMensual_Desarrollo]]
- [[TI_InformeMensual_StatusDesarrollo]]
- [[TI_InformeMensual_TipoDesarrollo]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_TI_InformeMensual_Desarrollo] AS
SELECT DISTINCT A.IdDesarrollo, A.Año, A.Mes, A.NombreDesarrollo, NombreSolicitante = REPLACE(REPLACE(REPLACE(A.NombreSolicitante,' ','<>'),'><',''),'<>',' '),
	A.CentroSolicitante, B.NombreCentro, A.SeccionSolicitante, E.NombreSeccion, FechaSolicitud = CONVERT(date, A.FechaSolicitud), 
	NombreDesarrollador = REPLACE(REPLACE(REPLACE(A.NombreDesarrollador,' ','<>'),'><',''),'<>',' '), A.IdTipoDesarrollo, TipoDesarrollo = C.Descripcion,
	A.IdStatus, Estatus = D.Descripcion, A.PorcentajeAvance, A.FechaStatus, A.Descripcion, A.Observaciones
FROM TI_InformeMensual_Desarrollo AS A
INNER JOIN 
(
	SELECT DISTINCT CodCentro, NombreCentro
	FROM vw_UnidadDeNegocio
) AS B ON A.CentroSolicitante = B.CodCentro
INNER JOIN 
(
	SELECT DISTINCT CodSeccion, NombreSeccion
	FROM vw_UnidadDeNegocio
) AS E ON A.SeccionSolicitante = E.CodSeccion
INNER JOIN TI_InformeMensual_TipoDesarrollo		AS C ON A.IdTipoDesarrollo = C.IdDesarrollo
INNER JOIN TI_InformeMensual_StatusDesarrollo	AS D ON A.IdStatus = D.IdStatus

```
