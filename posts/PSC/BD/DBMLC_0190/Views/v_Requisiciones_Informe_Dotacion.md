# View: v_Requisiciones_Informe_Dotacion

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_SolicitudDotacion]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_TipoDotacion]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Informe_Dotacion] AS
SELECT CedulaCandidato, NombreCandidato, CodEmpresa, Empresa, CodigoUnidadNegocio, UnidadNegocio, CodCentro, Centro, CodSeccion, Seccion, CodDepartamento,
	Departamento, CodSede, Sede, CodCargo, Cargo, FechaIngreso=FechaInicioContrato, Camisa, Pantalon, Chaqueta, Chaleco, Calzado, Guantes, Overol
FROM 
(
	SELECT CedulaCandidato,  CodEmpresa, CodigoUnidadNegocio, CodCentro, CodSeccion, CodSede, LTRIM(RTRIM(CodDepartamento))CodDepartamento, 
		CONVERT(smallint, LTRIM(RTRIM(S.CodigoCargo)))CodCargo,NombreCandidato=REPLACE(REPLACE(REPLACE(NombreCandidato,' ','<>'),'><',''),'<>',' '), 
		Empresa=REPLACE(REPLACE(REPLACE(Empresa,' ','<>'),'><',''),'<>',' '),UnidadNegocio=REPLACE(REPLACE(REPLACE(UnidadNegocio,' ','<>'),'><',''),'<>',' '), 
		Centro=REPLACE(REPLACE(REPLACE(Centro,' ','<>'),'><',''),'<>',' '), Seccion=REPLACE(REPLACE(REPLACE(Seccion,' ','<>'),'><',''),'<>',' '), 
		Departamento=REPLACE(REPLACE(REPLACE(Departamento,' ','<>'),'><',''),'<>',' '), Sede=REPLACE(REPLACE(REPLACE(Sede,' ','<>'),'><',''),'<>',' '), 
		Cargo=REPLACE(REPLACE(REPLACE(C.NombreCargo,' ','<>'),'><',''),'<>',' '), FechaInicioContrato, Camisa, Pantalon, Chaqueta, Chaleco, Calzado, Guantes, Overol
	FROM 
	(
		SELECT * FROM 
		(
			SELECT sc.IdSolicitud, SC.Cedula as CedulaCandidato, NombreCandidato = Nombres + ' ' + Apellido1 + ' ' + Apellido2, TP.NombreDotacion, sd.Talla
			FROM Requisiciones_SolicitudesCandidatos  AS SC
			LEFT JOIN Requisiciones_Candidatos		  AS C  ON SC.Cedula = C.Cedula
			INNER JOIN Requisiciones_SolicitudDotacion AS SD ON SC.IdSolicitud = SD.IdSolicitud
			LEFT JOIN Requisiciones_TipoDotacion	  AS TP ON SD.IdTipoDotacion = TP.IdDotacion
			WHERE SC.IdEstadoCandidato = 8 
		) ConvertTable PIVOT(MAX([Talla]) FOR [NombreDotacion] IN ([Camisa],
																	[Pantalon],
																	[Chaqueta],
																	[Chaleco],
																	[Calzado],
																	[Guantes],
																	[Overol])) AS PivotTable
	) A 

	LEFT JOIN Requisiciones_Solicitudes AS S ON A.IdSolicitud = S.IdSolicitud

	LEFT JOIN Cargos AS C ON C.CodigoCargo = S.CodigoCargo
) A --WHERE CedulaCandidato = 79730204

```
