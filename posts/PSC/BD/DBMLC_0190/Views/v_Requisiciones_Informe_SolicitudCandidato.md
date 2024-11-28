# View: v_Requisiciones_Informe_SolicitudCandidato

## Usa los objetos:
- [[Departamentos]]
- [[Empresas]]
- [[Profiles]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosNomina]]
- [[Requisiciones_EstadosReclutador]]
- [[Requisiciones_HistoricoCandidato]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Informe_SolicitudCandidato] AS
SELECT DISTINCT 
	AnioPeriodo,					MesPeriodo,						IdSolicitud,						DescEstadoGeneral,				Solicitante,			
	CodEmpresa,						Empresa,						CodMarca,							Marca,							CodCentro,							
	Centro,							CodigoUnidadNegocio,			UnidadNegocio,						CodSeccion,						Seccion,						
	CodDepartamento,				Departamento,					CodSede,							Sede,							Cedula,								
	NombreCompleto,					Telefono,						Celular,							Correo,							Direccion,							
	FechaCreacionCandidato,			UsuarioCreadorCandidato,		FechaCandidatoEntrevistado,			UsuarioEntrevistador,			FechaCandidatoPreseleccionado,		
	UsuarioPreseleccionador	
FROM 
(
	SELECT DISTINCT 
		A.AnioPeriodo,											A.MesPeriodo,										A.IdSolicitud,
		A.DescEstadoGeneral,									A.Solicitante,										A.CodEmpresa,
		A.Empresa,												A.CodMarca,											A.Marca,
		A.CodCentro,											A.Centro,											A.CodigoUnidadNegocio,
		A.UnidadNegocio,										A.CodSeccion,										A.Seccion,
		A.CodDepartamento,										A.Departamento,										A.CodSede,
		A.Sede,													C.Cedula, 											C.NombreCompleto,
		C.Telefono,												C.Celular,											C.Correo,
		C.Direccion,											FechaCreacionCandidato=R.FechaCreacion,				UsuarioCreadorCandidato=R.UsuarioCreador,	
		FechaCandidatoEntrevistado=E.FechaCreacion,				E.UsuarioEntrevistador,								FechaCandidatoPreseleccionado=P.FechaCreacion,
		P.UsuarioPreseleccionador
	FROM 
	(
		SELECT DISTINCT 
			AnioPeriodo=YEAR(S.FechaCreacion),		MesPeriodo=MONTH(S.FechaCreacion),		s.idsolicitud,				Solicitante=UPPER(p.Nombres+' '+p.Apellidos),
			s.CodEmpresa,							Empresa=UPPER(EM.NombreEmpresa),		s.CodMarca,					Marca=UPPER(s.Marca),
			s.CodCentro,							s.Centro,								s.CodigoUnidadNegocio,		UnidadNegocio=UPPER(NombreUnidadNegocio),
			s.CodSeccion,							s.Seccion,								s.CodDepartamento,			Departamento=UPPER(D.NombreDepartamento),
			s.CodSede,								s.Sede,
			
			CASE WHEN s.IdEstado = 2 AND s.IdEstadoReclutador IN (1,2,3,4,5,6) THEN er.Estado
				WHEN s.IdEstado = 3 AND s.IdEstadoNomina IN (5,6,8,9) THEN n.EstadoNomina
				ELSE e.Estado END AS EstadoGeneral,

			CASE WHEN s.IdEstado = 2 AND s.IdEstadoReclutador IN (1,2,3,4,5,6) THEN er.Descripcion
				WHEN s.IdEstado = 3 AND s.IdEstadoNomina IN (5,6,8,9) THEN n.Descripcion
				ELSE e.Descripcion END AS DescEstadoGeneral
		
		FROM		Requisiciones_Solicitudes AS s

		LEFT JOIN   Requisiciones_Estados AS e ON s.IdEstado = e.IdEstado

		LEFT JOIN   Requisiciones_EstadosReclutador AS er ON s.IdEstadoReclutador = er.IdEstado

		LEFT JOIN   Profiles AS p ON s.UserIdCreo = p.UserId

		LEFT JOIN	Requisiciones_EstadosNomina AS n ON s.IdEstadoNomina = n.IdEstadoNomina		

		LEFT JOIN	Empresas AS EM ON EM.CodigoEmpresa = S.CodEmpresa

		LEFT JOIN	Departamentos AS D ON LTRIM(RTRIM(UPPER(S.CodDepartamento))) = LTRIM(RTRIM(UPPER(D.CodigoDepartamento)))

		LEFT JOIN	(SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio FROM vw_UnidadDeNegocio) AS UN ON UN.CodUnidadNegocio = S.CodigoUnidadNegocio
	) AS A

	LEFT JOIN 
	(
		SELECT SC.IdSolicitud, C.Cedula,C.Telefono, C.Celular, C.Correo, C.Direccion,
			NombreCompleto=LTRIM(RTRIM(C.Nombres))+' '+LTRIM(RTRIM(C.Apellido1))+' '+
				LTRIM(RTRIM(C.Apellido2))			
		FROM Requisiciones_SolicitudesCandidatos SC
		LEFT JOIN Requisiciones_Candidatos C ON SC.Cedula = C.Cedula
	) C ON C.IdSolicitud = A.IdSolicitud

	--CUANDO SE REGISTRO EL CANDIDATO
	LEFT JOIN
	(
		SELECT A.IdSolicitud, A.CedulaCandidato, CONVERT(DATE,A.FechaModificacion) AS FechaCreacion, 
			UsuarioCreador = UPPER(b.Nombres) + ' ' + UPPER(B.Apellidos)
		FROM Requisiciones_HistoricoCandidato A
		LEFT JOIN Profiles B ON B.UserId = A.UserModifico
		WHERE IdEstadoCandidato = 1 --AND IdSolicitud = 7
	) R ON R.IdSolicitud = C.IdSolicitud 
				AND R.CedulaCandidato = C.Cedula


	--CUANDO SE ENTREVISTO EL CANDIDATO
	LEFT JOIN 
	(
		SELECT A.IdSolicitud, A.CedulaCandidato, CONVERT(DATE,A.FechaModificacion) AS FechaCreacion, 
			UsuarioEntrevistador = UPPER(b.Nombres) + ' ' + UPPER(B.Apellidos)
		FROM Requisiciones_HistoricoCandidato A
		LEFT JOIN Profiles B ON B.UserId = A.UserModifico
		WHERE IdEstadoCandidato = 2 --AND IdSolicitud = 7
	) E ON E.IdSolicitud = C.IdSolicitud 
				AND E.CedulaCandidato = C.Cedula


	--CUANDO SE PRESELECCIONO EL CANDIDATO
	LEFT JOIN
	(
		SELECT A.IdSolicitud, A.CedulaCandidato, CONVERT(DATE,A.FechaModificacion) AS FechaCreacion, 
			UsuarioPreseleccionador = UPPER(b.Nombres) + ' ' + UPPER(B.Apellidos)
		FROM Requisiciones_HistoricoCandidato A
		LEFT JOIN Profiles B ON B.UserId = A.UserModifico
		WHERE IdEstadoCandidato = 6 --AND IdSolicitud = 7
	) P ON P.IdSolicitud = C.IdSolicitud 
				AND P.CedulaCandidato = C.Cedula
) A

```
