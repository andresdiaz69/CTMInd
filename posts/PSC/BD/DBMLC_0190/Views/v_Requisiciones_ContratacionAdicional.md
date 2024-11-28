# View: v_Requisiciones_ContratacionAdicional

## Usa los objetos:
- [[Requisiciones_Contratacion]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_Clase]]
- [[v_Requisiciones_Paises]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_ContratacionAdicional] AS
SELECT 	IdSolicitud,								CedulaCandidato,						NuevaCedulaCandidato,
		CodPaisNacimientoCandidato,					NombrePaisNacimientoCandidato, 			CodCiudadNacimientoCandidato,
		NombreCiudadNacimientoCandidato,			CodPaisExpDocCandidato,					NombrePaisExpDocCandidato,
		CodCiudadExpDocCandidato,					NombreCiudadExpDocCandidato,			FechaExpDocCandidato,
		CodNacionalidadCandidato,					NombreNacionalidadCandidato,			GrupoSang,
		FactorRH,									Estatura,								CodTipoPago,
		NombreTipoPago,								CodBanco,								NombreBanco,
		CuentaBancaria,								CodModoLiquidado,						NombreModoLiquidado,
		CodTipoContrato,							NombreTipoContrato,						Salario,
		FechaFinContrato,							CodClaseSalario,						NombreClaseSalario,
		CodTipoCotizante,						    NombreTipoCotizante,					CodSubTipoCotizante,
		NombreSubTipoCotizante,						CodFondoSalud,							NombreFondoSalud,
		CodFondoPension,							NombreFondoPension,						CodFondoCesantias,
		NombreFondoCesantias,						CodFondoCCF,							NombreFondoCCF,
		CodFondoRiesgos,							NombreFondoRiesgos,						Variable,
		Clasificacion6,								Clasificacion4,							CabezaFamilia,
		PrimerTrabajo,								CodCiudadLabor,							NombreCiudad

FROM
(
	SELECT	C.IdSolicitud,			C.CedulaCandidato,			c.NuevaCedulaCandidato, 		FechaExpDocCandidato, 
		C.GrupoSang,				C.FactorRH,					C.Estatura,						C.Salario, 
		C.FechaFinContrato,			C.Variable,					C.Clasificacion6,				C.Clasificacion4, 
		C.CabezaFamilia,			C.PrimerTrabajo,			C.CodCiudadLabor,				
		CuentaBancaria,				CodBanco = C.Banco,			NombreBanco = B.SubClase,		CodTipoPago = C.TipoPago,	
	
		NombreTipoPago = TP.SubClase,				CodModoLiquidado = C.ModoLiquidado,			NombreModoLiquidado = ML.SubClase, 
		CodTipoContrato = C.TipoContrato,			NombreTipoContrato = TC.SubClase,			CodClaseSalario = C.ClaseSalario, 
		NombreClaseSalario = CS.SubClase,			CodTipoCotizante = C.TipoCotizante,		    NombreTipoCotizante = TC.SubClase, 
		CodSubTipoCotizante = C.SubTipoCotizante, 	NombreSubTipoCotizante = STC.SubClase,		CodFondoSalud = C.FondoSalud,
		NombreFondoSalud = FS.SubClase,				CodFondoPension = C.FondoPension,			NombreFondoPension = FP.SubClase, 
		CodFondoCesantias = C.FondoCesantias,		NombreFondoCesantias = FC.SubClase,			CodFondoCCF = C.FondoCCF, 
		NombreFondoCCF = CCF.SubClase,				CodFondoRiesgos = C.FondoRiesgos,			NombreFondoRiesgos = FR.SubClase,
	
		CodPaisNacimientoCandidato = C.PaisNacimientoCandidato,			NombrePaisNacimientoCandidato=PN.Pais, 
		CodCiudadNacimientoCandidato = C.CiudadNacimientoCandidato,		NombreCiudadNacimientoCandidato=CONVERT(CHAR(30),CN.NombreCiudad), 
		CodPaisExpDocCandidato = C.PaisExpDocCandidato,					NombrePaisExpDocCandidato = PED.Pais, 
		CodCiudadExpDocCandidato = C.CiudadExpDocCandidato,				NombreCiudadExpDocCandidato = CONVERT(CHAR(30),CED.NombreCiudad), 
		CodNacionalidadCandidato = C.NacionalidadCandidato,				NombreNacionalidadCandidato = N.SubClase,
		NombreCiudad = CONVERT(CHAR(30),CL.NombreCiudad)
	
	 FROM Requisiciones_Contratacion	C

	 --PAIS NACIMIENTO
	 LEFT JOIN v_Requisiciones_Paises	PN	ON C.PaisNacimientoCandidato = PN.CodPais	

	 --CIUDAD NACIMIENTO
	 LEFT JOIN v_Requisiciones_CiudadDepto	CN	ON C.CiudadNacimientoCandidato = CN.CodigoCiudad AND C.PaisNacimientoCandidato = CN.CodigoPais

	 --PAIS EXPEDICIÓN DOCUMENTO
	 LEFT JOIN v_Requisiciones_Paises	PED	ON C.PaisExpDocCandidato = PED.CodPais	 

	 --CIUDAD EXPEDICIÓN DOCUMENTO
	 LEFT JOIN v_Requisiciones_CiudadDepto	CED	ON C.CiudadExpDocCandidato = CED.CodigoCiudad AND C.PaisExpDocCandidato = CED.CodigoPais

	 --CIUDAD LABOR
	 LEFT JOIN v_Requisiciones_CiudadDepto	CL	ON C.CodCiudadLabor = CL.CodigoCiudad AND CL.CodigoPais = '057'
 
	 --NACIONALIDAD
	 LEFT JOIN v_Requisiciones_Clase	N	ON C.NacionalidadCandidato = N.CodSubClase 
												AND N.CodClase = 13 AND N.Activo = 1	
	--TIPO DE PAGO
	 LEFT JOIN v_Requisiciones_Clase	TP	ON C.TipoPago = TP.CodSubClase 
												AND TP.CodClase = 6 AND TP.Activo = 1	
	--BANCO
	 LEFT JOIN v_Requisiciones_Clase	B	ON C.Banco = B.CodSubClase 
												AND B.CodClase = 7 AND B.Activo = 1	
	--MODO LIQUIDACION
	 LEFT JOIN v_Requisiciones_Clase	ML	ON C.ModoLiquidado = ML.CodSubClase 
												AND ML.CodClase = 12 AND ML.Activo = 1	
	--TIPO DE CONTRATO
	 LEFT JOIN v_Requisiciones_Clase	TC	ON C.TipoContrato = TC.CodSubClase 
												AND TC.CodClase = 9 AND TC.Activo = 1	
	--CLASE SALARIO
	 LEFT JOIN v_Requisiciones_Clase	CS	ON C.ClaseSalario = CS.CodSubClase 
												AND CS.CodClase = 8 AND CS.Activo = 1	
	--TIPO DE COTIZANTE
	 LEFT JOIN v_Requisiciones_Clase	TDC	ON C.TipoCotizante = TDC.CodSubClase 
												AND TDC.CodClase = 18 AND TDC.Activo = 1	
	--SUB TIPO DE COTIZANTE
	 LEFT JOIN v_Requisiciones_Clase	STC	ON C.SubTipoCotizante = STC.CodSubClase 
												AND STC.CodClase = 19 AND STC.Activo = 1	
	--FONDO SALUD
	 LEFT JOIN v_Requisiciones_Clase	FS	ON C.FondoSalud = FS.CodSubClase 
												AND FS.CodClase = 15 AND FS.Activo = 1	
	--FONDO PENSION
	 LEFT JOIN v_Requisiciones_Clase	FP	ON C.FondoPension = FP.CodSubClase 
												AND FP.CodClase = 10 AND FP.Activo = 1	
	--FONDO CESANTIAS
	 LEFT JOIN v_Requisiciones_Clase	FC	ON C.FondoCesantias = FC.CodSubClase 
												AND FC.CodClase = 16 AND FC.Activo = 1	
	--FONDO CCF(CAJA DE COMPENSACION)
	 LEFT JOIN v_Requisiciones_Clase	CCF	ON C.FondoCCF = CCF.CodSubClase 
												AND CCF.CodClase = 17 AND CCF.Activo = 1	
	--FONDO RIESGOS
	 LEFT JOIN v_Requisiciones_Clase	FR	ON C.FondoRiesgos = FR.CodSubClase 
												AND FR.CodClase = 14 AND FR.Activo = 1	
) A

```
