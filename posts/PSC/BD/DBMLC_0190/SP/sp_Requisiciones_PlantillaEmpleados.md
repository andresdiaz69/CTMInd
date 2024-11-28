# Stored Procedure: sp_Requisiciones_PlantillaEmpleados

## Usa los objetos:
- [[Requisiciones_HistoricoSolicitud]]
- [[v_Requisiciones_ConsultaSolicitudes]]
- [[v_Requisiciones_ContratacionAdicional]]
- [[v_Requisiciones_EmailUsers]]
- [[v_Requisiciones_Entrevista]]
- [[v_Requisiciones_MarcaByUnidad]]
- [[v_Requisiciones_SolicitudesCandidatos]]
- [[vw_EmpresasCentrosMunicipios]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_PlantillaEmpleados] 
(
	@FechaContratacion DATE
) AS

BEGIN 

	SET NOCOUNT ON
	SET FMTONLY OFF

	--declare @FechaContratacion date 
	--set @FechaContratacion = '20230317'--'20220825'

	SELECT	Numero_solicitud,			FechaContratacion,			cod_emp=CedulaCandidato,					NroIdentificacion=CedulaCandidato,		
			TipoIdentificacion,			CodigoAlterno,				PrimerApellido,								SegundoApellido,				
			PrimerNombre,				SegundoNombre,				FechaNacimiento,							SexoEmp,				
			NumLibreta,					ClaseLibreta,				distritoLibreta,							GrupoSang,				
			factorRh,					estadocivil,				Nacionalidad,								DireccionRes,
			TelefonoRes,				Barrio,						email,										Celular,								
			FechaIngreso,				TipoPago,					Banco,										CuentaBanco,					
			TipoLIquida,				RegimenSal,					Clase_Salario,								Compañía,				
			Sucursal,					CentroCosto,				Clasificador1,								Clasificador2,			
			Clasificador3,				Clasificador4,				Clasificador5,								Clasificador6,
			Clasificador7,				CodCargo,					tipoContrato,								FondoRiegos,							
			Por_Riesgos,				FondoPension,				FondoSalud,									FondoCCF,						
			FondoCesant,				MetReten,					PorcReten,									Salario,				
			DiasVacacionAno,			SabadoHabil,				PromedioSalud,								CuentaGasto,			
			Variable,					PorDias,					ModoLiquidacion,							PaisExpIdentif,
			CiudadExpIdent,				PaisNacimiento,				CiudadNacimiento,							PaisRes,								
			CiudadRes,					PaisLab,					CiuLabor,									PaisContrato,					
			CiuContrato,				Pensionado,					PensxEmpresa,								TipCotizante,			
			SubtipoCotizante,			Extranjero,					ResideExtranjero,							ley1393,				
			contratista,				Ley1450,					horasMes,									NroContrato,
			Convenio,					FechaFinContrato,			usuario,									CodCentDeTrabajo,						
			CodigoArea,					SueldoAntesFlex,			Porcen_Flex,								Sucursal_SS,					
			Estatura,					Peso,						EmailAlterno,								CuentaGastoNiif,		
			DistribucionCCosto,			DistriCCostoNiif,			DeducibleSalud,								DeducibleVivienda,		
			Dependientes,				NroPersoCargo,				SucursalConvenio,							CcostoConvenio,
			Clasificador1Conv,			Clasificador2Conv,			Clasificador3Conv,							Clasificador4Conv,						
			Clasificador5Conv,			Clasificador6Conv,			Clasificador7Conv,							Clasificador8Conv,				
			Lider,						valorhora,					codpagoelectronico=CedulaCandidato,			FechaExpdocId,					
			PagarDia31Vac,				CabezaFamilia,				PrimerTrabajo,								CedulaRegistroOriginal,
			ContratacionExterna,		TipoTrabajo
	FROM  
	(
		SELECT DISTINCT 
			S.Numero_solicitud, 		CodigoAlterno='',				C.GrupoSang,					Usuario='casatoro/' + HS.UserName,
			NumLibreta='',				ClaseLibreta=0,					distritoLibreta=0,				FechaFinContrato=C.FechaFinContrato,
			C.factorRh,					DireccionRes=A.Direccion,		TelefonoRes=A.Telefono,			Barrio=E.BarrioCandidato,
			email=A.Correo,				A.Celular,						Banco=c.CodBanco,				CuentaBanco=c.CuentaBancaria,
			RegimenSal=2,				Clasificador7='0',				CodCargo=s.CodigoCargo,			tipoContrato=C.CodTipoContrato,
			CuentaGastoNiif='0',		C.CabezaFamilia,				DiasVacacionAno=15,				FondoCCF=C.CodFondoCCF,
			DeducibleVivienda=0,		MetReten=1,PorcReten=0,			S.Salario,						FondoSalud=C.CodFondoSalud,
			SabadoHabil=0,				PromedioSalud=0,				PorDias=0,						ModoLiquidacion=C.CodModoLiquidado,		
			Pensionado=0,				PensxEmpresa=0,					Sucursal_SS='0',				SubtipoCotizante=c.CodSubTipoCotizante,
			CodigoArea='0',				SueldoAntesFlex=0,				Porcen_Flex=0,					TipCotizante=c.CodTipoCotizante,			
			C.Estatura,					Peso=0,							EmailAlterno='',				FondoRiegos=C.CodFondoRiesgos,
			DistribucionCCosto=0,		DistriCCostoNiif=0,				DeducibleSalud=0,				FondoCesant=C.CodFondoCesantias,
			Dependientes=0,				NroPersoCargo=0,				SucursalConvenio='0',			CcostoConvenio='0',
			Clasificador1Conv='0',		Clasificador2Conv='0',			Clasificador3Conv='0',			Clasificador4Conv='0',
			Clasificador5Conv='0',		Clasificador6Conv='0',			Clasificador7Conv='0',			Clasificador8Conv='0',
			Lider='0',					valorhora=0,					PagarDia31Vac=1,				FondoPension=C.CodFondoPension,
			C.PrimerTrabajo,			ContratacionExterna=0,			TipoTrabajo = 0,				CedulaRegistroOriginal=A.Cedula,
			Ley1450=0,					NroContrato='1',				Convenio='',					Clasificador3=s.CodigoUnidadNegocio,		
			ResideExtranjero=0,			ley1393=1,						contratista=0,					Clasificador4=C.Clasificacion4,
			
			
			PrimerApellido=LTRIM(RTRIM(A.Apellido1)),										SegundoApellido=LTRIM(RTRIM(A.Apellido2)),
			FechaExpdocId=CONVERT(date,C.FechaExpDocCandidato),								estadocivil=CONVERT(INT,E.CodEstadoCivil),				
			Nacionalidad=CONVERT(INT,c.CodNacionalidadCandidato),							FechaIngreso=CONVERT(DATE,S.FechaInicioContrato),						
			TipoPago=CONVERT(INT,c.CodTipoPago),											FechaContratacion=CONVERT(DATE,HS.FechaModificacion),
			TipoIdentificacion=CONVERT(NVARCHAR,(a.CodTipoIdentificacion)),					FechaNacimiento=CONVERT(DATE,FechaNacimiento),			
			SexoEmp=CONVERT(INT,E.CodSexo),													Clase_Salario=CONVERT(INT,C.CodClaseSalario),							
			Compañía=CONVERT(NVARCHAR,s.CodEmpresa),										Sucursal=CONVERT(NVARCHAR,ISNULL(MU.CodMarca,0)),
			CentroCosto=CONVERT(NVARCHAR,s.CodCentro),										Clasificador1=CONVERT(NVARCHAR,s.CodSeccion),			
			Clasificador2=s.CodDepartamento,												Clasificador5=CONVERT(NVARCHAR,s.CodSede),								
			Clasificador6=UPPER(LTRIM(RTRIM(CONVERT(NVARCHAR,C.Clasificacion6)))),
		
			CedulaCandidato=CONVERT(NVARCHAR,(CASE WHEN C.NuevaCedulaCandidato IS NOT NULL THEN C.NuevaCedulaCandidato ELSE A.Cedula END)),
			PrimerNombre=CONVERT(NVARCHAR,(SUBSTRING(LTRIM(RTRIM(A.Nombres))+' ',1,(CHARINDEX(' ',LTRIM(RTRIM(A.Nombres))+' ',1)-1)))), 
			SegundoNombre=CONVERT(NVARCHAR,(SUBSTRING(LTRIM(RTRIM(A.Nombres))+' ',(CHARINDEX(' ',LTRIM(RTRIM(A.Nombres))+' ',1)+1),LEN(LTRIM(RTRIM(A.Nombres)))))),
			CASE WHEN DAY(S.FechaInicioContrato) IN (10,11,12,13,14,15) THEN '2' ELSE '1' END AS TipoLIquida,
			
			CuentaGasto = CASE WHEN s.CodDepartamento = 'CO' THEN '51'
							WHEN s.CodDepartamento IN ('RE', 'VN', 'VO') THEN '52'
							WHEN (s.CodDepartamento IN ('TM', 'TC') AND UPPER(S.NombreCargo) LIKE '%CNICO%') 
								OR (s.CodDepartamento IN ('TM', 'TC') AND UPPER(S.NombreCargo) LIKE '%ALISTADOR DE%') 
								OR (s.CodDepartamento IN ('TM', 'TC') AND UPPER(S.NombreCargo) LIKE '%LATONERO%') 
								OR (s.CodDepartamento IN ('TM', 'TC') AND UPPER(S.NombreCargo) LIKE '%PINTOR%') THEN '613504'
							ELSE '52' END,
			Variable = CASE WHEN UPPER(C.Variable) = 'SI' THEN 1 ELSE 0 END,
			
			PaisExpIdentif=C.CodPaisExpDocCandidato,		CiudadExpIdent=C.CodCiudadExpDocCandidato,
			PaisNacimiento=C.CodPaisNacimientoCandidato,	CiudadNacimiento=C.CodCiudadNacimientoCandidato,
			
			PaisRes = '057',--= CASE WHEN M.CodigoCiudad IS NOT NULL THEN '057' ELSE '' END,		
			CiudadRes = CASE WHEN C.CodCiudadLabor IS NOT NULL THEN C.CodCiudadLabor 
							WHEN M.CodDeptoCiudad = '76892' THEN '76520' ELSE M.CodDeptoCiudad END,
			
			PaisLab = '057',-- = CASE WHEN M.CodigoCiudad IS NOT NULL THEN '057' ELSE '' END, 		
			CiuLabor = CASE WHEN C.CodCiudadLabor IS NOT NULL THEN C.CodCiudadLabor 
							WHEN M.CodDeptoCiudad = '76892' THEN '76520' ELSE M.CodDeptoCiudad END,
			
			PaisContrato = '057',-- = CASE WHEN M.CodigoCiudad IS NOT NULL THEN '057' ELSE '' END,	
			CiuContrato = CASE WHEN C.CodCiudadLabor IS NOT NULL THEN C.CodCiudadLabor 
							WHEN M.CodDeptoCiudad = '76892' THEN '76520' ELSE M.CodDeptoCiudad END,
			
			Extranjero = CASE WHEN C.CodNacionalidadCandidato = '1' THEN 0 ELSE 1 END,
			horasMes = CASE WHEN CodTipoContrato = '14' THEN 120 ELSE 230 END,
			CodCentDeTrabajo = CASE WHEN s.CodDepartamento IN ('RE', 'TC', 'TM') THEN 3 ELSE 2 END,
			Por_Riesgos = CASE WHEN s.CodDepartamento IN ('RE', 'TC', 'TM') THEN 2.436 ELSE 1.044 END
			--ContratacionExterna=CASE WHEN C.CodTipoContrato = '14' THEN 4 ELSE 8 END, --Se desactivo el 12-09-2023 por orden de nómina
		FROM 
		( 
			SELECT *
			FROM v_Requisiciones_SolicitudesCandidatos S
			WHERE IdEstadoSolicitud = 7 and IdEstadoCandidato = 8 
		) A
		LEFT JOIN 
		(	
			SELECT *
			FROM v_Requisiciones_ConsultaSolicitudes
			WHERE Estado = 7
		) S ON A.num_solicitud = S.Numero_solicitud

		LEFT JOIN 
		(
			SELECT HS.IdSolicitud, HS.IdEstado, HS.UserModifico, HS.FechaModificacion, EU.UserName, EU.NombreCompleto
			FROM Requisiciones_HistoricoSolicitud HS
			LEFT JOIN v_Requisiciones_EmailUsers EU ON HS.UserModifico = EU.Id
			WHERE HS.IdEstado = 7
		) HS ON HS.IdSolicitud = A.num_solicitud

		LEFT JOIN v_Requisiciones_Entrevista E	ON A.num_solicitud = E.IdSolicitud AND A.Cedula = E.CedulaCandidato 
		
		LEFT JOIN v_Requisiciones_ContratacionAdicional C ON A.num_solicitud = C.IdSolicitud AND C.CedulaCandidato = A.Cedula
		
		LEFT JOIN vw_EmpresasCentrosMunicipios M ON M.CodigoCentro = a.CodCentro AND S.CodEmpresa = M.CodigoEmpresa
		
		LEFT JOIN v_Requisiciones_MarcaByUnidad MU ON MU.CodUnidadNegocio = A.CodigoUnidadNegocio

		WHERE CONVERT(DATE,HS.FechaModificacion) = @FechaContratacion
	) A
END

```
