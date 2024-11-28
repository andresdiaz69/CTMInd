# Stored Procedure: sp_Requisiciones_Contratacion

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_DireccionCandidato]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosCandidatos]]
- [[Requisiciones_EstadosNomina]]
- [[Requisiciones_HistoricoSolicitud]]
- [[Requisiciones_Jefes]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_SolicitudesEsquema]]
- [[Requisiciones_SubClase]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_EmailUsers]]
- [[v_Requisiciones_ParametrizacionTipoValor]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_Contratacion]
(
	@IdSolicitud BIGINT, 
	@CedulaCandidato BIGINT	
) AS

BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdSolicitud BIGINT, @CedulaCandidato BIGINT	
	--SET @IdSolicitud = 7217
	--SET @CedulaCandidato = 1000755710

	--ELIMINAR TABLE TEMPORAL 
	IF OBJECT_ID(N'tempdb.dbo.#TMP_RegistroEmpleados', N'U') IS NOT NULL
		DROP TABLE #TMP_RegistroEmpleados


	--TABLA TEMPORAL PARA LA CONSULTA DE LOS NOMBRES DEL EMPLEADO (JEFE)
	SELECT	Estado,						CodigoEmpleado,			Ano_Periodo,			Mes_Periodo,			CodigoEmpresa,				
			Empresa,					codigo_centro,			nombre_centro,			codigo_seccion,			nombre_seccion,			
			codigo_departamento,		Codigo_Cargo,			Nombre_Cargo,			Unidad_Negocio,			Nombre_Unidad_Negocio,
			NombreCompleto

	INTO #TMP_RegistroEmpleados

	FROM 
	(
		SELECT Estado='ACTIVO',			CodigoEmpleado,				Ano_Periodo,			Mes_Periodo,			CodigoEmpresa,			
			Empresa,					codigo_centro,				nombre_centro,			codigo_seccion,			nombre_seccion,		
			codigo_departamento,		Codigo_Cargo,				Nombre_Cargo,			Unidad_Negocio,
			CASE WHEN Unidad_Negocio = 3 THEN 'MERCEDES-BENZ' ELSE Nombre_Unidad_Negocio END AS Nombre_Unidad_Negocio,
			REPLACE(REPLACE(REPLACE(UPPER(Nombres + ' ' + Apellido1 + ' ' + Apellido2),' ','<>'),'><',''),'<>',' ')NombreCompleto
		FROM EmpleadosActivos
		WHERE Ano_Periodo = YEAR(GETDATE())
			AND Mes_Periodo = MONTH(GETDATE())
	
		UNION ALL 

		SELECT Estado='RETIRADO',			A.CodigoEmpleado,				A.Ano_Periodo,			A.Mes_Periodo,			A.CodigoEmpresa,			
			A.Empresa,						A.codigo_centro,				A.nombre_centro,		A.codigo_seccion,		A.nombre_seccion,		
			A.codigo_departamento,			A.Codigo_Cargo,					A.Nombre_Cargo,			A.Unidad_Negocio,
			CASE WHEN A.Unidad_Negocio = 3 THEN 'MERCEDES-BENZ' ELSE A.Nombre_Unidad_Negocio END AS Nombre_Unidad_Negocio,
			REPLACE(REPLACE(REPLACE(UPPER(Nombres + ' ' + Apellido1 + ' ' + Apellido2),' ','<>'),'><',''),'<>',' ')NombreCompleto
		FROM EmpleadosRetirados A
		INNER JOIN (
			SELECT MAX(Fecha_retiro) FECHA, CodigoEmpleado FROM EmpleadosRetirados GROUP BY CodigoEmpleado
		) CC ON CC.CodigoEmpleado = A.CodigoEmpleado AND CC.FECHA = A.Fecha_retiro
		WHERE A.CodigoEmpleado NOT IN (SELECT CodigoEmpleado 
										FROM EmpleadosActivos
										WHERE Ano_Periodo = YEAR(GETDATE())
										AND Mes_Periodo = MONTH(GETDATE()))
	) Empleados


	
	--INFORMACION COMPLETA DE LA SOLICITUD Y EL CANDIDATO PARA RETORNAR
	SELECT DISTINCT
		--INFORMACIÓN DE LA SOLICITUD
		S.IdSolicitud									,S.IdEstado											,E.Estado
		,S.TipoSolicitud								,FechaCreacion=CONVERT(date,S.FechaCreacion)		,S.CodigoCargo
		,C.NombreCargo									,S.Salario											,IdSolicitante=P.Id
		,Solicitante=P.NombreCompleto					,CorreoSolicitante=p.Email							,S.CodEmpresa
		,S.Empresa										,S.CodMarca											,S.Marca
		,S.CodCentro									,S.Centro											,S.CodigoUnidadNegocio
		,S.UnidadNegocio								,S.CodSeccion										,S.Seccion
		,S.CodDepartamento								,S.Departamento										,S.CodSede
		,S.Sede											,ObservacionesSolicitante=S.Observaciones			,S.IdEstadoNomina
		,N.EstadoNomina									,S.FechaInicioContrato								,S.FechaCitacionFirmaContrato
		,S.FechaCitacionFirmaContratoAplazada			,S.tip_con											,S.nom_con
		,S.DuracionContratoMeses						,S.DescripcionTrabajo								,S.Requisitos
		,Obs_Adicional.ObservacionesGteUSC				,Obs_Adicional.ObservacionesGteLinea				,S.HorarioDiurno
		,s.CodCiudadLabor								,NombreCiudadLabor = Ciudad.NombreCiudad			,s.InHouse
		,s.InHouseProyect								,InHouseNombreProyect = TV.Nombre
		,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
			
		--BONOS
		,S.BonoAlimentacion								,S.BonoCelular										,S.BonoGasolina
		,S.AuxMovilizacion								,S.SalarioGarantizado								,S.FinSalario
			
		--ESQUEMAS VARIABLES
		,Esquemas.PrimerEsquema							,Esquemas.SegundoEsquema							,Esquemas.TercerEsquema
		,Esquemas.CuartoEsquema							,Esquemas.QuintoEsquema								,Esquemas.SextoEsquema
			
		--JEFES DIRECTOS
		,J.CC_Jefe1										,J.Nombre_Jefe1										,J.Correo_Jefe1
		,J.CC_Jefe2										,J.Nombre_Jefe2										,J.Correo_Jefe2
		,J.CC_Jefe3										,J.Nombre_Jefe3										,J.Correo_Jefe3
		,J.CC_Jefe4										,J.Nombre_Jefe4										,J.Correo_Jefe4
		,J.CC_Jefe5										,J.Nombre_Jefe5										,J.Correo_Jefe5
			
		--DATOS BASICOS DEL CANDIDATO
		,SC.IdEstadoCandidato							,SC.EstadoCandidato									,SC.CodTipIdentificacion
		,SC.TipIdentificacion							,SC.Cedula											,SC.Nombres
		,SC.Apellido1									,SC.Apellido2										,SC.NombreCompleto
		,SC.FechaNacimiento								,SC.Edad											,SC.Telefono
		,SC.Celular										,SC.Correo										
			
		--DIRECCION
		,SC.CodTipoCalle								,SC.NombreCalle										,SC.NumCalle
		,SC.Piso										,SC.Bloque											,SC.Puerta
		,SC.Complemento									,SC.Direccion											
			
			
		,Horario = CASE WHEN S.HorarioDiurno = 1 THEN 'DIURNO' ELSE 'NOCTURNO' END
		
	FROM (
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
	) AS SC
		
		
	INNER JOIN (
		SELECT * FROM Requisiciones_Solicitudes
		WHERE IdSolicitud = @IdSolicitud
	) AS S ON S.IdSolicitud = SC.IdSolicitud
	
	LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

	LEFT JOIN	v_Requisiciones_CiudadDepto	AS Ciudad ON Ciudad.CodigoCiudad = s.CodCiudadLabor AND Ciudad.CodigoPais = '057'
	
	LEFT JOIN   Requisiciones_Estados AS e ON s.IdEstado = e.IdEstado

	LEFT JOIN   Cargos AS c ON  c.CodigoCargo = s.CodigoCargo

	LEFT JOIN   v_Requisiciones_EmailUsers AS p ON s.UserIdCreo = p.Id

	LEFT JOIN	Requisiciones_EstadosNomina AS n ON s.IdEstadoNomina = n.IdEstadoNomina

	--Observaciones de los Gerentes
	LEFT JOIN 
	(
		SELECT IdSolicitud, ObservacionesGteUSC,
			CASE WHEN EstadoGteLinea_Con IS NOT NULL THEN ObservacionesGteLinea_Con ELSE ObservacionesGteLinea_Sin 
				END AS ObservacionesGteLinea	
		FROM (
			SELECT IdSolicitud,										ObservacionesGteLinea_Sin=MAX(ObservacionesGteLinea_Sin),
				EstadoGteLinea_Con=MAX(EstadoGteLinea_Con),			ObservacionesGteLinea_Con=MAX(ObservacionesGteLinea_Con),
				ObservacionesGteUSC=MAX(ObservacionesGteUSC)

			FROM (
				SELECT IdSolicitud,
					CASE WHEN IdEstado = 4 THEN Observaciones END AS ObservacionesGteUSC,
					CASE WHEN IdEstado = 5 THEN IdEstado END AS EstadoGteLinea_Con,
					CASE WHEN IdEstado = 5 THEN Observaciones END AS ObservacionesGteLinea_Con,
					CASE WHEN IdEstado = 2 THEN Observaciones END AS ObservacionesGteLinea_Sin
				FROM Requisiciones_HistoricoSolicitud
				WHERE IdEstado IN (2,4,5) and IdSolicitud = @IdSolicitud
			) A
			GROUP BY IdSolicitud
		) A
	) AS Obs_Adicional ON s.IdSolicitud = Obs_Adicional.IdSolicitud

	LEFT JOIN (
		SELECT	IdSolicitud,						PrimerEsquema=MAX(PrimerEsquema),		
			SegundoEsquema=MAX(SegundoEsquema),		TercerEsquema=MAX(TercerEsquema),		
			CuartoEsquema=MAX(CuartoEsquema),		QuintoEsquema=MAX(QuintoEsquema),
			SextoEsquema=MAX(SextoEsquema)
		FROM 
		(
			SELECT IdSolicitud, 
				PrimerEsquema = CASE WHEN NumeroEsquema = 1 THEN Esquema END, 
				SegundoEsquema = CASE WHEN NumeroEsquema = 2 THEN Esquema END, 
				TercerEsquema = CASE WHEN NumeroEsquema = 3 THEN Esquema END, 
				CuartoEsquema = CASE WHEN NumeroEsquema = 4 THEN Esquema END, 
				QuintoEsquema = CASE WHEN NumeroEsquema = 5 THEN Esquema END, 
				SextoEsquema = CASE WHEN NumeroEsquema = 6 THEN Esquema END
			FROM Requisiciones_SolicitudesEsquema 
			WHERE IdSolicitud = @IdSolicitud
		) A
		GROUP BY IdSolicitud 
	) Esquemas ON Esquemas.IdSolicitud = S.IdSolicitud

	--JEFES
	LEFT JOIN (
		SELECT SJ.IdSolicitud, SJ.CC_Jefe1, Nombre_Jefe1=J1.NombreCompleto, Correo_Jefe1=C_J1.Email,
			SJ.CC_Jefe2, Nombre_Jefe2=J2.NombreCompleto, Correo_Jefe2=C_J2.Email,
			SJ.CC_Jefe3, Nombre_Jefe3=J3.NombreCompleto, Correo_Jefe3=C_J3.Email,
			SJ.CC_Jefe4, Nombre_Jefe4=J4.NombreCompleto, Correo_Jefe4=C_J4.Email,
			SJ.CC_Jefe5, Nombre_Jefe5=J5.NombreCompleto, Correo_Jefe5=C_J5.Email
		FROM Requisiciones_Jefes SJ
		LEFT JOIN #TMP_RegistroEmpleados AS J1 ON J1.CodigoEmpleado = SJ.CC_Jefe1
		LEFT JOIN AspNetUsers AS C_J1 ON LTRIM(RTRIM(C_J1.UserName)) = CONVERT(NVARCHAR(50),SJ.CC_Jefe1)

		LEFT JOIN #TMP_RegistroEmpleados AS J2 ON J2.CodigoEmpleado = SJ.CC_Jefe2
		LEFT JOIN AspNetUsers AS C_J2 ON LTRIM(RTRIM(C_J2.UserName)) = CONVERT(NVARCHAR(50),SJ.CC_Jefe2)
		
		LEFT JOIN #TMP_RegistroEmpleados AS J3  ON J3.CodigoEmpleado = SJ.CC_Jefe3
		LEFT JOIN AspNetUsers AS C_J3 ON LTRIM(RTRIM(C_J3.UserName)) = CONVERT(NVARCHAR(50),SJ.CC_Jefe3)
		
		LEFT JOIN #TMP_RegistroEmpleados AS J4 ON J4.CodigoEmpleado = SJ.CC_Jefe4
		LEFT JOIN AspNetUsers AS C_J4 ON LTRIM(RTRIM(C_J4.UserName)) = CONVERT(NVARCHAR(50),SJ.CC_Jefe4)
		
		LEFT JOIN #TMP_RegistroEmpleados AS J5 ON J5.CodigoEmpleado = SJ.CC_Jefe5
		LEFT JOIN AspNetUsers AS C_J5 ON LTRIM(RTRIM(C_J5.UserName)) = CONVERT(NVARCHAR(50),SJ.CC_Jefe5)
		
		WHERE IdSolicitud = @IdSolicitud --IN (571,661,662,752,753,3067)
	) J ON J.IdSolicitud = S.IdSolicitud
END

```
