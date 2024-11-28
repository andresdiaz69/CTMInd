# Stored Procedure: sp_Requisiciones_EntrevistaDeCandidato

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_DireccionCandidato]]
- [[Requisiciones_Entrevista]]
- [[Requisiciones_EstadosCandidatos]]
- [[Requisiciones_RelacionesPersonales]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_SubClase]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_ParametrizacionTipoValor]]
- [[vw_EmpresasCentrosMunicipios]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_EntrevistaDeCandidato]
(
	@IdSolicitud INT, 
	@CedulaCandidato BIGINT 
) AS

BEGIN

	SELECT 
		--INFORMACIÓN DE LA SOLICITUD
		S.IdSolicitud,					S.IdEstado,					S.CodEmpresa,						S.Empresa,
		S.CodigoUnidadNegocio,			S.UnidadNegocio,			S.CodCentro,						S.Centro,
		S.CodSede,						S.Sede,						S.CodigoCargo,						S.NombreCargo,
		S.CodCiudadSolicitud,			S.CiudadSolicitud,			S.CodMunicipioSolicitud,			S.MunicipioSolicitud,
		S.FechaCreacion,				S.Solicitante,				S.CodCiudadLabor,					S.NombreCiudadLabor,
		S.InHouse,						S.InHouseProyect,			InHouseNombreProyect,				InHouseConfir, 

		--INFORMACIÓN DEL CANDIDATO
		SC.IdEstadoCandidato,			SC.EstadoCandidato,			SC.CodTipIdentificacion,			SC.TipIdentificacion,
		SC.Cedula,						SC.Nombres,					SC.Apellido1,						SC.Apellido2,
		SC.NombreCompleto,				SC.Telefono,				SC.Celular,							SC.Correo,
		SC.FechaNacimiento,				SC.Edad,					SC.CodTipoCalle,					SC.NombreCalle,
		SC.NumCalle,					SC.Piso,					SC.Bloque,							SC.Puerta,
		SC.Complemento,					SC.Direccion,

		--INFORMACIÓN DE LA ENTREVISTA
		CASE WHEN E.IdEntrevista IS NOT NULL THEN 1 ELSE 0 END AS ExisteEntrevista,						E.FechaPreEntrevista,
		E.CodMunicipio,					E.Municipio,				E.CodCiudad,						E.Ciudad,
		E.FechaEntrevista,				E.Sexo,						E.EstadoCivil,						E.TipoVivienda,
		E.CodCiudadCandidato,			E.CiudadCandidato,			E.BarrioCandidato,					E.NucleoFamiliar,
		E.TieneProcesoActivo,			E.CandidatoProcesoActivo,	E.Primaria,							E.Bachillerato,
		E.Tecnico,						E.Tecnologo,				E.Profesional,						E.Postgrado,
		E.CuentaConCertificado, 		E.FortalezasCargo,			E.HabilidadesCargo,					E.ComentariosAdicionales,
		E.Recomendaciones,				E.Observaciones,			E.PrimerEmpleo,						E.CabezaFamilia,

		CASE WHEN RP.Familiar_Activos IS NULL THEN 0 ELSE RP.Familiar_Activos END Familiar_Activos,		RP.Parentesco_Familiar,
		RP.UserName_Familiar,			RP.Nombre_Familiar, 		RP.CodEmpresa_Familiar,				RP.Empresa_Familiar,
		RP.CodLinea_Familiar,			RP.Linea_Familiar,			RP.CodCargo_Familiar,				RP.Cargo_Familiar,
	
		CASE WHEN RP.TrabajoAnteriormente IS NULL THEN 0 ELSE RP.TrabajoAnteriormente END TrabajoAnteriormente,
		RP.CodCargoAnterior,		RP.NombreCargoAnterior,			RP.CodLineaAnterior,				RP.NombreLineaAnterior,
		RP.FechaIngresoAnterior, 	RP.FechaRetiroAnterior,			RP.CausaRetiro,						RP.AnoRetiro
	FROM 
	(
		SELECT SC.IdSolicitud,							SC.IdEstadoCandidato,					CodTipIdentificacion=LTRIM(RTRIM(C.TipIdentificacion)),
			TipIdentificacion=Clase.SubClase,			SC.Cedula,								UPPER(C.Nombres)Nombres,
			UPPER(C.Apellido1)Apellido1,				UPPER(C.Apellido2)Apellido2,			C.FechaNacimiento,
			C.Telefono,									C.Celular,								C.Correo, 
			DC.CodTipoCalle,							DC.NombreCalle,							DC.NumCalle,
			DC.Piso,									DC.Bloque,								DC.Puerta,
			DC.Complemento,								Edad=DATEDIFF(YEAR,CONVERT(DATE,C.FechaNacimiento),CONVERT(DATE,GETDATE())),
			NombreCompleto=LTRIM(RTRIM(UPPER(REPLACE(REPLACE(REPLACE(C.Nombres + ' ' + C.Apellido1 + ' ' + C.Apellido2,' ','<>'),'><',''),'<>',' ')))),
			CASE WHEN DC.DireccionCompleta IS NOT NULL THEN DC.DireccionCompleta ELSE C.Direccion END AS Direccion, EC.EstadoCandidato

		FROM Requisiciones_SolicitudesCandidatos SC
			
		--Consultar los estados del candidato
		LEFT JOIN Requisiciones_EstadosCandidatos EC ON EC.IdEstadoCandidato = SC.IdEstadoCandidato

		--Consultar Información Basica del candidato
		INNER JOIN Requisiciones_Candidatos C ON C.Cedula = SC.Cedula

		--Consultar el Tipo de Documento de Identidad
		LEFT JOIN Requisiciones_SubClase AS Clase ON Clase.Activo = 1 AND Clase.CodClase = 1 
											AND LTRIM(RTRIM(Clase.CodSubClase)) = LTRIM(RTRIM(C.TipIdentificacion))

		--Consultar la Dirección del Candidato
		LEFT JOIN Requisiciones_DireccionCandidato DC ON DC.Cedula = SC.Cedula
		
		WHERE SC.IdSolicitud = @IdSolicitud AND SC.Cedula = @CedulaCandidato
	) SC


	--Información de la Solicitud
	LEFT JOIN 
	(
		SELECT	S.IdSolicitud,									S.IdEstado,									S.CodEmpresa,
			S.Empresa,											S.CodigoUnidadNegocio,						S.UnidadNegocio,
			S.CodCentro,										S.Centro,									S.CodSede,
			S.Sede,												S.CodigoCargo,								NC.NombreCargo,
			CodMunicipioSolicitud=CI.CodigoDepartamento,		MunicipioSolicitud=CI.Departamento,			CodCiudadSolicitud=CI.CodigoCiudad,
			CiudadSolicitud=CI.Ciudad,							S.FechaCreacion,							Solicitante = S.UserIdCreo,
			S.CodCiudadLabor,									NombreCiudadLabor=Ciudad.NombreCiudad,		S.InHouse,
			S.InHouseProyect,									InHouseNombreProyect = TV.Nombre,
			InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
		FROM Requisiciones_Solicitudes AS S

		--Cargo de la Solicitud
		LEFT JOIN Cargos AS NC ON NC.CodigoCargo = S.CodigoCargo

		LEFT JOIN v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = s.CodCiudadLabor AND Ciudad.CodigoPais = '057'

		LEFT JOIN v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

		--
		LEFT JOIN vw_EmpresasCentrosMunicipios AS CI ON CI.CodigoCentro = S.CodCentro
													AND CI.CodigoEmpresa = S.CodEmpresa  

		WHERE IdSolicitud = @IdSolicitud
	) S ON S.IdSolicitud = SC.IdSolicitud


	--Información de la Entrevista
	LEFT JOIN (
		SELECT IdSolicitud,				CodMunicipio,			Municipio,					CodCiudad,				
			Ciudad,						FechaEntrevista,		CedulaCandidato,			Edad,					
			Sexo,						EstadoCivil,			TipoVivienda,				CodCiudadCandidato,			
			CiudadCandidato,			BarrioCandidato,		NucleoFamiliar,				TieneProcesoActivo, 
			CandidatoProcesoActivo,		Primaria,				Bachillerato,				Tecnico, 
			Tecnologo,					Profesional,			Postgrado,					CuentaConCertificado, 
			FortalezasCargo,			HabilidadesCargo,		ComentariosAdicionales,		Recomendaciones, 
			Observaciones,				PrimerEmpleo,			CabezaFamilia,				IdEntrevista,
			FechaPreEntrevista
		FROM Requisiciones_Entrevista
		WHERE IdSolicitud = @IdSolicitud 
			AND CedulaCandidato = @CedulaCandidato
	) E ON E.IdSolicitud = SC.IdSolicitud AND E.CedulaCandidato = SC.Cedula


	--Información de las Relaciones Personales
	LEFT JOIN (
		SELECT	IdSolicitud,			CedulaCandidato,			Familiar_Activos,			Parentesco_Familiar, 
			UserName_Familiar,			Nombre_Familiar, 			CodEmpresa_Familiar,		Empresa_Familiar, 
			CodLinea_Familiar,			Linea_Familiar,				CodCargo_Familiar,			Cargo_Familiar, 
			TrabajoAnteriormente,		CodCargoAnterior,			NombreCargoAnterior,		CodLineaAnterior, 
			NombreLineaAnterior,		FechaIngresoAnterior, 		FechaRetiroAnterior,		CausaRetiro, 
			AnoRetiro,					FechaRegistro
		FROM [DBMLC_0190].[dbo].[Requisiciones_RelacionesPersonales] 
		WHERE IdSolicitud = @IdSolicitud 
			AND CedulaCandidato = @CedulaCandidato
	) RP ON RP.IdSolicitud = SC.IdSolicitud AND RP.CedulaCandidato = SC.Cedula

END

```
