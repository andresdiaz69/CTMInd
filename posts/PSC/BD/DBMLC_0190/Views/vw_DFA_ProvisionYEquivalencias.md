# View: vw_DFA_ProvisionYEquivalencias

## Usa los objetos:
- [[DFA_Parametrizacion_CuentasProvision]]
- [[DFA_Parametrizacion_Equivalencia]]
- [[DFA_Parametrizacion_Jerarquia]]
- [[vw_DFA_Parametrizacion_CtaDFA]]
- [[vw_DFA_SpigaMarcas]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_DFA_ProvisionYEquivalencias] AS
SELECT DISTINCT 
	IdRegistro,						Cuenta,					IdClasificacionCta,				ClasificacionCta,			Fuente,
	CodUnidad,						UnidadNegocio,			Departamento,					Canales,					Marca,
	NombreMarca,					Gamas,					Departamento_Equivalencia,		Depto_Equivalencia,			Marca_Equivalencia,
	NombreMarca_Equivalencia,		DFA_Equivalencia,		NombreDFA_Equivalencia,			Cero_Equivalencia,			Sucursal_Equivalencia,		
	Cuenta_Equivalencia,			Activo,					IdJerarquia,					Provision
FROM 
(
	SELECT	IdRegistro,												Cuenta,										(J.Id)IdClasificacionCta,						
		(J.ClasificacionCta)ClasificacionCta,						Fuente,										(e.CodUnidadNegocio)CodUnidad,									
		(u.NombreUnidadNegocio)UnidadNegocio,						(CodDepartamento)Departamento,				Canales,												
		e.Marca,													m.NombreMarca,								Gamas, 
		(CodDepartamentoEquivalencia)Departamento_Equivalencia,		Depto_Equivalencia,							Marca_Equivalencia,		
		(ME.NombreMarca)NombreMarca_Equivalencia,					DFA_Equivalencia,							(Cta.NombreCuenta) NombreDFA_Equivalencia,
		Cero_Equivalencia,											Sucursal_Equivalencia,						Cuenta_Equivalencia,										
		Activo,														J.IdJerarquia,								Provision = 0
	FROM DFA_Parametrizacion_Equivalencia E

	LEFT JOIN DFA_Parametrizacion_Jerarquia J ON E.ClasificacionCta = J.Id

	LEFT JOIN 
	( 
		SELECT DISTINCT CONVERT(NVARCHAR(10),CodigoMarca)CodigoMarca, 
			CONVERT(NVARCHAR(50),NombreMarca)NombreMarca 
		FROM vw_DFA_SpigaMarcas	

		UNION ALL 

		SELECT CodigoMarca = 'Todos', NombreMarca = 'Todos'
	) AS M	ON E.Marca = M.CodigoMarca

	LEFT JOIN 
	( 
		SELECT DISTINCT CONVERT(NVARCHAR(10),CodigoMarca)CodigoMarca, 
			CONVERT(NVARCHAR(50),NombreMarca)NombreMarca 
		FROM vw_DFA_SpigaMarcas	

		UNION ALL 

		SELECT CodigoMarca = 'Todos', NombreMarca = 'Todos'
	) AS ME	ON E.Marca_Equivalencia = ME.CodigoMarca

	LEFT JOIN 
	(
		SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
		FROM vw_UnidadDeNegocio
	) AS U	ON E.CodUnidadNegocio = U.CodUnidadNegocio

	LEFT JOIN 
	(
		SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
		FROM vw_UnidadDeNegocio
	) AS UE	ON E.Marca_Equivalencia = UE.CodUnidadNegocio

	LEFT JOIN vw_DFA_Parametrizacion_CtaDFA Cta ON Cta.CodDFA = E.DFA_Equivalencia

	UNION ALL

	SELECT DISTINCT 
		IdRegistro=0,						CP.Cuenta,					CP.IdClasificacion,					J.ClasificacionCta,			Fuente=NULL,
		CodUnidad=NULL,						UnidadNegocio=NULL,			Departamento=NULL,					Canales=NULL,				Marca=NULL,
		NombreMarca=NULL,					Gamas=NULL, 				Departamento_Equivalencia=NULL,		Depto_Equivalencia=NULL,	Marca_Equivalencia=NULL,
		NombreMarca_Equivalencia=NULL,		DFA_Equivalencia=NULL,		NombreDFA_Equivalencia=NULL,		Cero_Equivalencia=NULL,		Sucursal_Equivalencia=NULL,
		Cuenta_Equivalencia=NULL,			Activo=CONVERT(BIT,1),		J.IdJerarquia,						Provision = 1
	FROM DFA_Parametrizacion_CuentasProvision CP
	LEFT JOIN DFA_Parametrizacion_Jerarquia J ON CP.IdClasificacion = J.Id
)A

```
