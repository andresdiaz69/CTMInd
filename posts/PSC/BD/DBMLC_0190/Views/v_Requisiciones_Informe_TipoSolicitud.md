# View: v_Requisiciones_Informe_TipoSolicitud

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosNomina]]
- [[Requisiciones_Razones]]
- [[Requisiciones_Solicitudes]]
- [[vw_Empresas]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Informe_TipoSolicitud] AS
SELECT distinct ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY Empresa)) AS INT),0) id,Año,Mes,CodEmpresa,UPPER(Empresa)Empresa,CodigoUnidadNegocio,
	UPPER(UnidadNegocio)UnidadNegocio,CodCentro,Centro,CodigoCargo,NombreCargo,TipoSolicitud,Razon,EstadoNomina,Cantidad=COUNT(IdSolicitud)
FROM
(
	SELECT Año=YEAR(s.FechaCreacion),Mes=MONTH(s.FechaCreacion),s.IdSolicitud,s.TipoSolicitud,s.IdRazon,r.Razon,s.IdEstado,e.estado,
		s.CodEmpresa,CONVERT(smallint,LTRIM(RTRIM(s.CodigoCargo)))CodigoCargo,c.NombreCargo,s.CodCentro,s.centro,s.IdEstadoNomina,
		n.EstadoNomina,CONVERT(smallint,LTRIM(RTRIM(s.CodigoUnidadNegocio)))CodigoUnidadNegocio,
		Empresa = EM.NombreEmpresa,
		UnidadNegocio = CASE WHEN LTRIM(RTRIM(s.CodigoUnidadNegocio)) = '999' THEN 'PANDA' 
								ELSE NombreUnidadNegocio_Requisicion END
	FROM	  Requisiciones_Solicitudes		s
	LEFT JOIN Requisiciones_Razones			r	ON	s.IdRazon = r.IdRazon
	LEFT JOIN Requisiciones_Estados			e	ON	s.IdEstado = e.IdEstado
	LEFT JOIN Cargos						c	ON	s.CodigoCargo=c.CodigoCargo	
	LEFT JOIN Requisiciones_EstadosNomina	n	ON	s.IdEstadoNomina = n.IdEstadoNomina
	LEFT JOIN vw_Empresas					EM  ON	S.CodEmpresa = EM.CodigoEmpresa
	LEFT JOIN (
		SELECT DISTINCT UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion FROM vw_UnidadDeNegocio
	) AS U ON U.UnidadNegocio_Requisicion = S.CodigoUnidadNegocio
	WHERE s.IdEstado NOT IN (9,12)
)A
GROUP BY Año,Mes,CodEmpresa,Empresa,CodigoUnidadNegocio,UnidadNegocio,CodCentro,Centro,CodigoCargo,NombreCargo,TipoSolicitud,Razon,EstadoNomina

```
