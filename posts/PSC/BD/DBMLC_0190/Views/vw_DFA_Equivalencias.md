# View: vw_DFA_Equivalencias

## Usa los objetos:
- [[DFA_Parametrizacion_Equivalencia]]
- [[DFA_Parametrizacion_Jerarquia]]
- [[vw_DFA_Parametrizacion_CtaDFA]]
- [[vw_DFA_SpigaMarcas]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_DFA_Equivalencias] AS
SELECT 
	IdRegistro,						Cuenta,					IdClasificacionCta,				ClasificacionCta,			Fuente,
	CodUnidad,						UnidadNegocio,			Departamento,					Canales,					Marca,
	NombreMarca,					Gamas,					Departamento_Equivalencia,		Depto_Equivalencia,			Marca_Equivalencia,
	NombreMarca_Equivalencia,		DFA_Equivalencia,		NombreDFA_Equivalencia,			Cero_Equivalencia,			Sucursal_Equivalencia,		
	Cuenta_Equivalencia,			Activo,					IdJerarquia
FROM 
(
	SELECT	IdRegistro,												Cuenta,										(J.Id)IdClasificacionCta,						
		(J.ClasificacionCta)ClasificacionCta,						Fuente,										(e.CodUnidadNegocio)CodUnidad,									
		(u.NombreUnidadNegocio)UnidadNegocio,						(CodDepartamento)Departamento,				Canales,												
		e.Marca,													m.NombreMarca,								Gamas, 
		(CodDepartamentoEquivalencia)Departamento_Equivalencia,		Depto_Equivalencia,							Marca_Equivalencia,		
		(ME.NombreMarca)NombreMarca_Equivalencia,					DFA_Equivalencia,							(Cta.NombreCuenta) NombreDFA_Equivalencia,
		Cero_Equivalencia,											Sucursal_Equivalencia,						Cuenta_Equivalencia,										
		Activo,														J.IdJerarquia
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
)A

```
