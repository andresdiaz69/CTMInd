# Stored Procedure: sp_DFA_ContabilidadEquivalencia

## Usa los objetos:
- [[DFA_Contabilidad]]
- [[DFA_ContabilidadEquivalencia]]
- [[DFA_Parametrizacion_Equivalencia]]
- [[vw_DFA_Equivalencias]]

```sql
CREATE PROC [dbo].[sp_DFA_ContabilidadEquivalencia]
	@Año int,
	@Mes int		
AS

BEGIN
	SET NOCOUNT ON 
	SET FMTONLY OFF

	/*
	El campo Marca de la consulta final se cruzo con la vista vw_DFA_SpigaMarcas
	*/
	--DECLARE	
	--	@Año int,
	--	@Mes int		
	--SET @Año = 2022
	--SET @Mes = 9 

	--CRUCE DE CONTABILIDAD Y EL ID DE LAS EQUIVALENCIAS
	--Validación tabla temporal
	--VALIDACIÓN TABLAS TEMPORALES

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_ConsultaContabilidad', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_ConsultaContabilidad

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_EquivalenciasSinCanal', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_EquivalenciasSinCanal

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia2', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia2

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia3', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia3

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia4', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia4

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia5', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia5

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia6', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia6

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia7', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia7

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia8', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia8

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia9', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia9

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia10', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia10

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia11', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia11

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia12', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia12

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia13', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia13

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_EquEspeciales', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_EquEspeciales

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidad_SinDepto', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidad_SinDepto

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidad_ConDepto', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidad_ConDepto

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_CruceEquivalencias', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_CruceEquivalencias

	--CONSULTA DE LA CONTABILIDAD
	SELECT * 
	INTO #tmpDFA_ConsultaContabilidad
	FROM DFA_Contabilidad
	WHERE Ano_Periodo = @Año AND Mes_Periodo = @Mes
	
	--CONSULTA DE LAS EQUIVALENCIAS SIN EL CANAL
	SELECT	Cuenta,						CodUnidad,				Departamento,			Marca,						Gamas,		
		Departamento_Equivalencia,		Depto_Equivalencia,		Marca_Equivalencia,		DFA_Equivalencia,			Cero_Equivalencia, 
		Sucursal_Equivalencia,			Cuenta_Equivalencia,	Activo,					IdJerarquia,				MAX(IdRegistro)IdRegistro
	INTO #tmpDFA_EquivalenciasSinCanal
	FROM vw_DFA_Equivalencias
	WHERE (Activo = 1)
	GROUP BY Cuenta,						CodUnidad,				Departamento,			Marca,				Gamas,		
			Departamento_Equivalencia,		Depto_Equivalencia,		Marca_Equivalencia,		DFA_Equivalencia,	Cero_Equivalencia, 
			Sucursal_Equivalencia,			Cuenta_Equivalencia,	Activo,					IdJerarquia

	--CRUCE PARA LA CLASIFICACION JERARQUICA 1 (OTROS TALLERES)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, 
		temp.IdRegistroEquivalencia
	
	INTO #tmpDFA_Jerarquia
	FROM 
	(
		SELECT DISTINCT
			c3.IdRegistro,				C3.Cuenta,					C3.CodigoEmpresa,		C3.CodUnidadNegocio,		c3.CodigoCentro,			
			C3.CodigoSeccion, 			C3.CodDepartamento,			C3.Marca, 				c3.Gama,					C3.Canal,					
			C3.Debe,					C3.Haber,					c3.Saldo, 				C3.CO,						C3.VN, 						
			C3.VO, 						c3.RE, 						C3.TM,					C3.TC,						C3.XX,			
			c3.FechaAsientoInicial,		C3.FechaAsientoFinal,		
			CASE WHEN C3.IdRegistroEquivalencia IS NOT NULL THEN C3.IdRegistroEquivalencia
				WHEN C3.IdRegistroEquivalencia2 IS NOT NULL THEN C3.IdRegistroEquivalencia2
				WHEN E.IdRegistro IS NOT NULL THEN E.IdRegistro
			ELSE NULL END IdRegistroEquivalencia

		FROM (
			SELECT DISTINCT
				c2.IdRegistro,				c2.Cuenta,					c2.CodigoEmpresa,							c2.CodUnidadNegocio,			
				c2.CodigoCentro,			c2.CodigoSeccion, 			c2.CodDepartamento,							c2.Marca, 					
				c2.Gama,					c2.Canal,					c2.Debe,									c2.Haber,					
				c2.Saldo, 					c2.CO,						c2.VN, 										c2.VO, 						
				c2.RE, 						c2.TM,						c2.TC,										c2.XX,			
				c2.FechaAsientoInicial,		c2.FechaAsientoFinal,		c2.IdRegistroEquivalencia,					E.IdRegistro AS IdRegistroEquivalencia2
			FROM (
				SELECT DISTINCT 
					C.IdRegistro,				C.Cuenta,					C.CodigoEmpresa,							C.CodUnidadNegocio,			
					C.CodigoCentro,				C.CodigoSeccion, 			C.CodDepartamento,							C.Marca, 					
					C.Gama,						C.Canal,					C.Debe,										C.Haber,					
					C.Saldo, 					C.CO,						C.VN, 										C.VO, 						
					C.RE, 						C.TM,						C.TC,										C.XX,			
					C.FechaAsientoInicial,		C.FechaAsientoFinal,		E.IdRegistro AS IdRegistroEquivalencia
			
				FROM #tmpDFA_ConsultaContabilidad C
		
				LEFT OUTER JOIN
				(
					SELECT IdRegistro, Cuenta, CodUnidad, Departamento, Marca, Gamas, Departamento_Equivalencia, Depto_Equivalencia, Marca_Equivalencia, 
						DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo, IdJerarquia
					FROM #tmpDFA_EquivalenciasSinCanal
					WHERE (IdJerarquia = 1 AND Activo = 1)
				) AS E ON C.Cuenta = E.Cuenta 
					AND C.CodUnidadNegocio = E.CodUnidad
					AND C.Marca = E.Marca
					AND C.Gama = E.Gamas
			) C2

			LEFT OUTER JOIN
			(
				SELECT IdRegistro, Cuenta, CodUnidad, Departamento, Marca, Gamas, Departamento_Equivalencia, Depto_Equivalencia, Marca_Equivalencia, 
					DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo, IdJerarquia
				FROM #tmpDFA_EquivalenciasSinCanal
				WHERE (IdJerarquia = 1 AND Activo = 1 AND Gamas = 'TODOS')
			) AS E ON C2.Cuenta = E.Cuenta 
					AND C2.CodUnidadNegocio = E.CodUnidad
					AND C2.Marca = E.Marca
					AND C2.IdRegistroEquivalencia IS NULL
		) C3
	
		LEFT OUTER JOIN	(
			SELECT IdRegistro, Cuenta, CodUnidad, Departamento, Marca, Gamas, Departamento_Equivalencia, Depto_Equivalencia, Marca_Equivalencia, 
				DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo, IdJerarquia
			FROM #tmpDFA_EquivalenciasSinCanal
			WHERE (IdJerarquia = 1 AND Activo = 1 AND Gamas = 'TODOS' AND Marca NOT IN ('447'))
		) AS E ON C3.Cuenta = E.Cuenta 
			AND C3.CodUnidadNegocio = E.CodUnidad
			AND C3.IdRegistroEquivalencia IS NULL
			AND C3.IdRegistroEquivalencia2 IS NULL

	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL


	
	--CRUCE PARA LA CLASIFICACION JERARQUICA 2 (GARANTIAS)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia2
	FROM 
	(
		SELECT DISTINCT
			c3.IdRegistro,				C3.Cuenta,					C3.CodigoEmpresa,		C3.CodUnidadNegocio,		c3.CodigoCentro,			
			C3.CodigoSeccion, 			C3.CodDepartamento,			C3.Marca, 				c3.Gama,					C3.Canal,					
			C3.Debe,					C3.Haber,					c3.Saldo, 				C3.CO,						C3.VN, 						
			C3.VO, 						c3.RE, 						C3.TM,					C3.TC,						C3.XX,			
			c3.FechaAsientoInicial,		C3.FechaAsientoFinal,		
			CASE WHEN C3.IdRegistroEquivalencia IS NOT NULL THEN C3.IdRegistroEquivalencia
				WHEN C3.IdRegistroEquivalencia2 IS NOT NULL THEN C3.IdRegistroEquivalencia2
				WHEN E.IdRegistro IS NOT NULL THEN E.IdRegistro
			ELSE NULL END IdRegistroEquivalencia

		FROM (
			SELECT DISTINCT
				c2.IdRegistro,				c2.Cuenta,					c2.CodigoEmpresa,							c2.CodUnidadNegocio,			
				c2.CodigoCentro,			c2.CodigoSeccion, 			c2.CodDepartamento,							c2.Marca, 					
				c2.Gama,					c2.Canal,					c2.Debe,									c2.Haber,					
				c2.Saldo, 					c2.CO,						c2.VN, 										c2.VO, 						
				c2.RE, 						c2.TM,						c2.TC,										c2.XX,			
				c2.FechaAsientoInicial,		c2.FechaAsientoFinal,		c2.IdRegistroEquivalencia,					E.IdRegistro AS IdRegistroEquivalencia2
			FROM (
				SELECT DISTINCT 
					C.IdRegistro,				C.Cuenta,					C.CodigoEmpresa,							C.CodUnidadNegocio,			
					C.CodigoCentro,				C.CodigoSeccion, 			C.CodDepartamento,							C.Marca, 					
					C.Gama,						C.Canal,					C.Debe,										C.Haber,					
					C.Saldo, 					C.CO,						C.VN, 										C.VO, 						
					C.RE, 						C.TM,						C.TC,										C.XX,			
					C.FechaAsientoInicial,		C.FechaAsientoFinal,		E.IdRegistro AS IdRegistroEquivalencia
			
				FROM (
					SELECT C.*
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
					WHERE J.IdRegistroEquivalencia IS NULL 
				) C
		
				LEFT OUTER JOIN
				(
					SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
						Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
					FROM vw_DFA_Equivalencias
					WHERE (IdJerarquia = 2 AND Activo = 1)
					ORDER BY Marca
				) AS E ON C.Cuenta = E.Cuenta 
					AND C.CodUnidadNegocio = E.CodUnidad
					AND C.Canal = E.Canales
					AND C.Marca = E.Marca
					AND C.Gama = E.Gamas
			) C2

			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM vw_DFA_Equivalencias
				WHERE (IdJerarquia = 2 AND Activo = 1 AND Gamas = 'TODOS')
				ORDER BY Marca
			) AS E ON C2.Cuenta = E.Cuenta 
					AND C2.CodUnidadNegocio = E.CodUnidad
					AND C2.Marca = E.Marca
					AND C2.Canal = E.Canales
					AND C2.IdRegistroEquivalencia IS NULL
		) C3
	
		LEFT OUTER JOIN	(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 2 AND Activo = 1)
		) AS E ON C3.Cuenta = E.Cuenta 
			AND C3.CodUnidadNegocio = E.CodUnidad
			AND C3.Canal = E.Canales
			AND C3.IdRegistroEquivalencia IS NULL
			AND C3.IdRegistroEquivalencia2 IS NULL

	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LAS GARANTIAS A LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia2

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 3 (VENTAS INTERNAS)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia3
	FROM 
	(
		SELECT DISTINCT
			c3.IdRegistro,				C3.Cuenta,					C3.CodigoEmpresa,		C3.CodUnidadNegocio,		c3.CodigoCentro,			
			C3.CodigoSeccion, 			C3.CodDepartamento,			C3.Marca, 				c3.Gama,					C3.Canal,					
			C3.Debe,					C3.Haber,					c3.Saldo, 				C3.CO,						C3.VN, 						
			C3.VO, 						c3.RE, 						C3.TM,					C3.TC,						C3.XX,			
			c3.FechaAsientoInicial,		C3.FechaAsientoFinal,		
			CASE WHEN C3.IdRegistroEquivalencia IS NOT NULL THEN C3.IdRegistroEquivalencia
				WHEN C3.IdRegistroEquivalencia2 IS NOT NULL THEN C3.IdRegistroEquivalencia2
				WHEN E.IdRegistro IS NOT NULL THEN E.IdRegistro
			ELSE NULL END IdRegistroEquivalencia

		FROM (
			SELECT DISTINCT
				c2.IdRegistro,				c2.Cuenta,					c2.CodigoEmpresa,							c2.CodUnidadNegocio,			
				c2.CodigoCentro,			c2.CodigoSeccion, 			c2.CodDepartamento,							c2.Marca, 					
				c2.Gama,					c2.Canal,					c2.Debe,									c2.Haber,					
				c2.Saldo, 					c2.CO,						c2.VN, 										c2.VO, 						
				c2.RE, 						c2.TM,						c2.TC,										c2.XX,			
				c2.FechaAsientoInicial,		c2.FechaAsientoFinal,		c2.IdRegistroEquivalencia,					E.IdRegistro AS IdRegistroEquivalencia2
			FROM (
				SELECT DISTINCT 
					C.IdRegistro,				C.Cuenta,					C.CodigoEmpresa,							C.CodUnidadNegocio,			
					C.CodigoCentro,				C.CodigoSeccion, 			C.CodDepartamento,							C.Marca, 					
					C.Gama,						C.Canal,					C.Debe,										C.Haber,					
					C.Saldo, 					C.CO,						C.VN, 										C.VO, 						
					C.RE, 						C.TM,						C.TC,										C.XX,			
					C.FechaAsientoInicial,		C.FechaAsientoFinal,		E.IdRegistro AS IdRegistroEquivalencia
			
				FROM (
					SELECT C.*
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
					WHERE J.IdRegistroEquivalencia IS NULL 
				) C
		
				LEFT OUTER JOIN
				(
					SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
						Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
					FROM vw_DFA_Equivalencias
					WHERE (IdJerarquia = 3 AND Activo = 1)
					ORDER BY Marca
				) AS E ON C.Cuenta = E.Cuenta 
					AND C.CodUnidadNegocio = E.CodUnidad
					AND C.Canal = E.Canales
					AND C.Marca = E.Marca
					AND C.Gama = E.Gamas
			) C2

			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM vw_DFA_Equivalencias
				WHERE (IdJerarquia = 3 AND Activo = 1 AND Gamas = 'TODOS')
				ORDER BY Marca
			) AS E ON C2.Cuenta = E.Cuenta 
					AND C2.CodUnidadNegocio = E.CodUnidad
					AND C2.Marca = E.Marca
					AND C2.Canal = E.Canales
					AND C2.IdRegistroEquivalencia IS NULL
		) C3
	
		LEFT OUTER JOIN	(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 3 AND Activo = 1 AND Gamas = 'TODOS' AND Marca NOT IN ('447'))
		) AS E ON C3.Cuenta = E.Cuenta 
			AND C3.CodUnidadNegocio = E.CodUnidad
			AND C3.Canal = E.Canales
			AND C3.IdRegistroEquivalencia IS NULL
			AND C3.IdRegistroEquivalencia2 IS NULL

	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LAS VENTAS INTERNAS A LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia3
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 4 (VENTAS CLIENTES)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia4
	FROM 
	(
		SELECT DISTINCT
			C4.IdRegistro,				C4.Cuenta,					C4.CodigoEmpresa,		C4.CodUnidadNegocio,		C4.CodigoCentro,			
			C4.CodigoSeccion, 			C4.CodDepartamento,			C4.Marca, 				C4.Gama,					C4.Canal,					
			C4.Debe,					C4.Haber,					C4.Saldo, 				C4.CO,						C4.VN, 						
			C4.VO, 						C4.RE, 						C4.TM,					C4.TC,						C4.XX,			
			C4.FechaAsientoInicial,		C4.FechaAsientoFinal,		
			CASE WHEN C4.IdRegistroEquivalencia IS NOT NULL THEN C4.IdRegistroEquivalencia
				WHEN C4.IdRegistroEquivalencia2 IS NOT NULL THEN C4.IdRegistroEquivalencia2
				WHEN C4.IdRegistroEquivalencia3 IS NOT NULL THEN C4.IdRegistroEquivalencia3
				WHEN E.IdRegistro IS NOT NULL THEN E.IdRegistro
			ELSE NULL END IdRegistroEquivalencia

		FROM (
			SELECT DISTINCT
				C3.IdRegistro,				C3.Cuenta,					C3.CodigoEmpresa,							C3.CodUnidadNegocio,			
				C3.CodigoCentro,			C3.CodigoSeccion, 			C3.CodDepartamento,							C3.Marca, 					
				C3.Gama,					C3.Canal,					C3.Debe,									C3.Haber,					
				C3.Saldo, 					C3.CO,						C3.VN, 										C3.VO, 						
				C3.RE, 						C3.TM,						C3.TC,										C3.XX,			
				C3.FechaAsientoInicial,		C3.FechaAsientoFinal,		C3.IdRegistroEquivalencia,					IdRegistroEquivalencia2,
				E.IdRegistro AS IdRegistroEquivalencia3
			FROM (
				SELECT DISTINCT
					c2.IdRegistro,				c2.Cuenta,					c2.CodigoEmpresa,							c2.CodUnidadNegocio,			
					c2.CodigoCentro,			c2.CodigoSeccion, 			c2.CodDepartamento,							c2.Marca, 					
					c2.Gama,					c2.Canal,					c2.Debe,									c2.Haber,					
					c2.Saldo, 					c2.CO,						c2.VN, 										c2.VO, 						
					c2.RE, 						c2.TM,						c2.TC,										c2.XX,			
					c2.FechaAsientoInicial,		c2.FechaAsientoFinal,		c2.IdRegistroEquivalencia,					E.IdRegistro AS IdRegistroEquivalencia2
				FROM (
					SELECT DISTINCT 
						C.IdRegistro,				C.Cuenta,					C.CodigoEmpresa,							C.CodUnidadNegocio,			
						C.CodigoCentro,				C.CodigoSeccion, 			C.CodDepartamento,							C.Marca, 					
						C.Gama,						C.Canal,					C.Debe,										C.Haber,					
						C.Saldo, 					C.CO,						C.VN, 										C.VO, 						
						C.RE, 						C.TM,						C.TC,										C.XX,			
						C.FechaAsientoInicial,		C.FechaAsientoFinal,		E.IdRegistro AS IdRegistroEquivalencia
			
					FROM (
						SELECT C.*
						FROM #tmpDFA_ConsultaContabilidad C
						LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
						WHERE J.IdRegistroEquivalencia IS NULL 
					) C
		
					LEFT OUTER JOIN
					(
						SELECT IdRegistro, Cuenta, CodUnidad, Departamento, Marca, Gamas, Departamento_Equivalencia, Depto_Equivalencia, Marca_Equivalencia, 
							DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo, IdJerarquia
						FROM #tmpDFA_EquivalenciasSinCanal
						WHERE (IdJerarquia = 4 AND Activo = 1)
					) AS E ON C.Cuenta = E.Cuenta 
						AND C.CodUnidadNegocio = E.CodUnidad
						AND C.Marca = E.Marca
						AND C.Gama = E.Gamas
				) C2

				LEFT OUTER JOIN
				(
					SELECT IdRegistro, Cuenta, CodUnidad, Departamento, Marca, Gamas, Departamento_Equivalencia, Depto_Equivalencia, Marca_Equivalencia, 
						DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo, IdJerarquia
					FROM #tmpDFA_EquivalenciasSinCanal
					WHERE (IdJerarquia = 4 AND Activo = 1 AND Gamas = 'TODOS')
				) AS E ON C2.Cuenta = E.Cuenta 
						AND C2.CodUnidadNegocio = E.CodUnidad
						AND C2.Marca = E.Marca
						AND C2.IdRegistroEquivalencia IS NULL
			)C3

			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM vw_DFA_Equivalencias
				WHERE (IdJerarquia = 4 AND Activo = 1 AND Gamas = 'TODOS')
				ORDER BY Marca
			) AS E ON C3.Cuenta = E.Cuenta 
					AND C3.CodUnidadNegocio = E.CodUnidad
					AND C3.Canal = E.Canales
					AND C3.Marca = E.Marca
					AND C3.IdRegistroEquivalencia IS NULL
		) C4
	
		LEFT OUTER JOIN	(
			SELECT IdRegistro, Cuenta, CodUnidad, Departamento, Marca, Gamas, Departamento_Equivalencia, Depto_Equivalencia, Marca_Equivalencia, 
				DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo, IdJerarquia
			FROM #tmpDFA_EquivalenciasSinCanal
			WHERE (IdJerarquia = 4 AND Activo = 1 AND Gamas = 'TODOS' AND Marca NOT IN ('447'))
		) AS E ON C4.Cuenta = E.Cuenta 
			AND C4.CodUnidadNegocio = E.CodUnidad
			AND C4.IdRegistroEquivalencia IS NULL
			AND C4.IdRegistroEquivalencia2 IS NULL
			AND C4.IdRegistroEquivalencia3 IS NULL

	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LAS VENTAS CLIENTES A LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia4



		
	--CRUCE PARA LA CLASIFICACION JERARQUICA 5 (IMPLEMENTOS)
	SELECT Ano_Periodo, Mes_Periodo, IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia5
	FROM 
	(
		SELECT DISTINCT	(@Año) Ano_Periodo,		(@Mes) Mes_Periodo,		(C3.IdRegistro) IdRegistroContabilidad, 
			CASE WHEN C3.IdRegistroEquivalencia IS NOT NULL THEN C3.IdRegistroEquivalencia
				WHEN C3.IdRegistroEquivalencia2 IS NOT NULL THEN C3.IdRegistroEquivalencia2
				ELSE NULL END IdRegistroEquivalencia
		FROM 
		(
			SELECT DISTINCT 
				C2.IdRegistro,			C2.Cuenta,		C2.CodigoEmpresa,			C2.CodUnidadNegocio,	C2.CodigoCentro,							C2.CodigoSeccion, 
				C2.CodDepartamento,		C2.Marca, 		C2.Gama,					C2.Canal,				C2.Debe,									C2.Haber, 
				C2.Saldo, 				C2.CO,			C2.VN, 						C2.VO, 					C2.RE, 										C2.TM, 
				C2.TC,					C2.XX,			C2.FechaAsientoInicial,		C2.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia2,	C2.IdRegistroEquivalencia 
			FROM 
			(
				SELECT DISTINCT 
					C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
					C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
					C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
					C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
				FROM 
				(
					SELECT C.*
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
					WHERE J.IdRegistroEquivalencia IS NULL  
				)C
		
				LEFT OUTER JOIN
				(
					SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
						Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
					FROM vw_DFA_Equivalencias
					WHERE (IdJerarquia = 5 AND Activo = 1)
					ORDER BY Marca
				) AS E ON C.Cuenta = E.Cuenta 
						AND C.CodUnidadNegocio = E.CodUnidad
						AND C.Marca = E.Marca
						AND C.Gama = E.Gamas
			) C2
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM vw_DFA_Equivalencias
				WHERE (IdJerarquia = 5 AND Activo = 1 AND Gamas = 'TODOS')
				ORDER BY Marca
			) AS E ON C2.Cuenta = E.Cuenta 
					AND C2.CodUnidadNegocio = E.CodUnidad
					AND C2.Marca = E.Marca
					AND C2.IdRegistroEquivalencia IS NULL
		) C3
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL


	--INSERTAR LAS IMPLEMENTOS A LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia5
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 6 (GOLF)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia6
	FROM 
	(
		SELECT DISTINCT 
			C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
			C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
			C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
			C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
		FROM 
		(
			SELECT C.*
			FROM #tmpDFA_ConsultaContabilidad C
			LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
			WHERE J.IdRegistroEquivalencia IS NULL
		)C
		
		LEFT OUTER JOIN
		(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 6 AND Activo = 1)
			ORDER BY Marca
		) AS E ON C.Cuenta = E.Cuenta 
				AND C.CodUnidadNegocio = E.CodUnidad
				AND C.Marca = E.Marca
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA GOLF EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia6
	
	
	
	
	--CRUCE PARA LA CLASIFICACION JERARQUICA 7 (MAQUINARIA AGRICOLA - AMS)
	SELECT Ano_Periodo, Mes_Periodo, IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia7
	FROM 
	(
		SELECT DISTINCT	(@Año) Ano_Periodo,		(@Mes) Mes_Periodo,		(C3.IdRegistro) IdRegistroContabilidad, 
			CASE WHEN C3.IdRegistroEquivalencia IS NOT NULL THEN C3.IdRegistroEquivalencia
				WHEN C3.IdRegistroEquivalencia2 IS NOT NULL THEN C3.IdRegistroEquivalencia2
				ELSE NULL END IdRegistroEquivalencia
		FROM 
		(
			SELECT DISTINCT 
				C2.IdRegistro,			C2.Cuenta,		C2.CodigoEmpresa,			C2.CodUnidadNegocio,	C2.CodigoCentro,							C2.CodigoSeccion, 
				C2.CodDepartamento,		C2.Marca, 		C2.Gama,					C2.Canal,				C2.Debe,									C2.Haber, 
				C2.Saldo, 				C2.CO,			C2.VN, 						C2.VO, 					C2.RE, 										C2.TM, 
				C2.TC,					C2.XX,			C2.FechaAsientoInicial,		C2.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia2,	C2.IdRegistroEquivalencia 
			FROM 
			(
				SELECT DISTINCT 
					C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
					C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
					C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
					C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
				FROM 
				(
					SELECT C.*
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
					WHERE J.IdRegistroEquivalencia IS NULL
				)C
		
				LEFT OUTER JOIN
				(
					SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
						Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
					FROM vw_DFA_Equivalencias
					WHERE (IdJerarquia = 7 AND Activo = 1)
					ORDER BY Marca
				) AS E ON C.Cuenta = E.Cuenta 
						AND C.CodUnidadNegocio = E.CodUnidad
						AND C.Marca = E.Marca
						AND C.Gama = E.Gamas
			) C2
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM vw_DFA_Equivalencias
				WHERE (IdJerarquia = 7 AND Activo = 1 AND Gamas = 'TODOS')
				ORDER BY Marca
			) AS E ON C2.Cuenta = E.Cuenta 
					AND C2.CodUnidadNegocio = E.CodUnidad
					AND C2.Marca = E.Marca
					AND C2.IdRegistroEquivalencia IS NULL
		) C3
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LAS MAQUINARIA AGRICOLA - AMS A LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia7
	



	--CRUCE PARA LA CLASIFICACION JERARQUICA 8 (OTRAS MAQUINAS AGRICOLA)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia8
	FROM 
	(
		SELECT DISTINCT
			c3.IdRegistro,				C3.Cuenta,					C3.CodigoEmpresa,		C3.CodUnidadNegocio,		c3.CodigoCentro,			
			C3.CodigoSeccion, 			C3.CodDepartamento,			C3.Marca, 				c3.Gama,					C3.Canal,					
			C3.Debe,					C3.Haber,					c3.Saldo, 				C3.CO,						C3.VN, 						
			C3.VO, 						c3.RE, 						C3.TM,					C3.TC,						C3.XX,			
			c3.FechaAsientoInicial,		C3.FechaAsientoFinal,		
			CASE WHEN C3.IdRegistroEquivalencia IS NOT NULL THEN C3.IdRegistroEquivalencia
				WHEN C3.IdRegistroEquivalencia2 IS NOT NULL THEN C3.IdRegistroEquivalencia2
				WHEN E.IdRegistro IS NOT NULL THEN E.IdRegistro
			ELSE NULL END IdRegistroEquivalencia

		FROM (
			SELECT DISTINCT
				c2.IdRegistro,				c2.Cuenta,					c2.CodigoEmpresa,							c2.CodUnidadNegocio,			
				c2.CodigoCentro,			c2.CodigoSeccion, 			c2.CodDepartamento,							c2.Marca, 					
				c2.Gama,					c2.Canal,					c2.Debe,									c2.Haber,					
				c2.Saldo, 					c2.CO,						c2.VN, 										c2.VO, 						
				c2.RE, 						c2.TM,						c2.TC,										c2.XX,			
				c2.FechaAsientoInicial,		c2.FechaAsientoFinal,		c2.IdRegistroEquivalencia,					E.IdRegistro AS IdRegistroEquivalencia2
			FROM (
				SELECT DISTINCT 
					C.IdRegistro,				C.Cuenta,					C.CodigoEmpresa,							C.CodUnidadNegocio,			
					C.CodigoCentro,				C.CodigoSeccion, 			C.CodDepartamento,							C.Marca, 					
					C.Gama,						C.Canal,					C.Debe,										C.Haber,					
					C.Saldo, 					C.CO,						C.VN, 										C.VO, 						
					C.RE, 						C.TM,						C.TC,										C.XX,			
					C.FechaAsientoInicial,		C.FechaAsientoFinal,		E.IdRegistro AS IdRegistroEquivalencia
			
				FROM (
					SELECT C.*
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
					WHERE J.IdRegistroEquivalencia IS NULL 
				) C
		
				LEFT OUTER JOIN
				(
					SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
						Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
					FROM vw_DFA_Equivalencias
					WHERE (IdJerarquia = 8 AND Activo = 1)
					ORDER BY Marca
				) AS E ON C.Cuenta = E.Cuenta 
					AND C.CodUnidadNegocio = E.CodUnidad
					AND C.Marca = E.Marca
					AND C.Gama = E.Gamas
			) C2

			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM vw_DFA_Equivalencias
				WHERE (IdJerarquia = 8 AND Activo = 1 AND Gamas = 'TODOS')
				ORDER BY Marca
			) AS E ON C2.Cuenta = E.Cuenta 
					AND C2.CodUnidadNegocio = E.CodUnidad
					AND C2.Marca = E.Marca
					AND C2.IdRegistroEquivalencia IS NULL
		) C3
	
		LEFT OUTER JOIN	(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 8 AND Activo = 1 AND Gamas = 'TODOS')
		) AS E ON C3.Cuenta = E.Cuenta 
			AND C3.CodUnidadNegocio = E.CodUnidad
			AND C3.IdRegistroEquivalencia IS NULL
			AND C3.IdRegistroEquivalencia2 IS NULL

	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA OTRAS MAQUINAS AGRICOLA EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia8
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 9 (MAQUINARIA CCE)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia9
	FROM 
	(
		SELECT DISTINCT 
			C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
			C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
			C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
			C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
		FROM 
		(
			SELECT C.*
			FROM #tmpDFA_ConsultaContabilidad C
			LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
			WHERE J.IdRegistroEquivalencia IS NULL
		)C
		
		LEFT OUTER JOIN
		(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 9 AND Activo = 1)
			ORDER BY Marca
		) AS E ON C.Cuenta = E.Cuenta 
				AND C.CodUnidadNegocio = E.CodUnidad
				AND C.Marca = E.Marca
				AND C.Gama = E.Gamas
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA MAQUINARIA CCE EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia9
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 10 (MAQUINARIA CE)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia10
	FROM 
	(
		SELECT DISTINCT 
			C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
			C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
			C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
			C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
		FROM 
		(
			SELECT C.*
			FROM #tmpDFA_ConsultaContabilidad C
			LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
			WHERE J.IdRegistroEquivalencia IS NULL 
		)C
		
		LEFT OUTER JOIN
		(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 10 AND Activo = 1)
			ORDER BY Marca
		) AS E ON C.Cuenta = E.Cuenta 
				AND C.CodUnidadNegocio = E.CodUnidad
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA MAQUINARIA CE EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia10
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 11 (MAQUINARIA WIRTGEN)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia11
	FROM 
	(
		SELECT DISTINCT 
			C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
			C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
			C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
			C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
		FROM 
		(
			SELECT C.*
			FROM #tmpDFA_ConsultaContabilidad C
			LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
			WHERE J.IdRegistroEquivalencia IS NULL
		)C
		
		LEFT OUTER JOIN
		(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 11 AND Activo = 1)
			ORDER BY Marca
		) AS E ON C.Cuenta = E.Cuenta 
				AND C.CodUnidadNegocio = E.CodUnidad
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA MAQUINARIA WIRTGEN EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia11
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 12 (MAQUINARIA USADA)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia12
	FROM 
	(
		SELECT DISTINCT 
			C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
			C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
			C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
			C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
		FROM 
		(
			SELECT C.*
			FROM #tmpDFA_ConsultaContabilidad C
			LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
			WHERE J.IdRegistroEquivalencia IS NULL 
		)C
		
		LEFT OUTER JOIN
		(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 12 AND Activo = 1)
			ORDER BY Marca
		) AS E ON C.Cuenta = E.Cuenta 
				AND C.CodUnidadNegocio = E.CodUnidad
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA MAQUINARIA USADA EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia12
	

	

	--CRUCE PARA LA CLASIFICACION JERARQUICA 13 (REPUESTOS)
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_Jerarquia13
	FROM 
	(
		SELECT DISTINCT 
			C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
			C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
			C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
			C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
			
		FROM 
		(
			SELECT C.*
			FROM #tmpDFA_ConsultaContabilidad C
			LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
			WHERE J.IdRegistroEquivalencia IS NULL 
		)C
		
		LEFT OUTER JOIN
		(
			SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidad, Departamento, Canales, Marca, Gamas, Departamento_Equivalencia, 
				Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
			FROM vw_DFA_Equivalencias
			WHERE (IdJerarquia = 12 AND Activo = 1)
			ORDER BY Marca
		) AS E ON C.Cuenta = E.Cuenta 
				AND C.CodUnidadNegocio = E.CodUnidad
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LA DATA REPUESTOS EN LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_Jerarquia13
	
	   	


	--CRUCE DE CONTABILIDAD CON LAS EQUIVALENCIAS ESPECIALES
	SELECT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFA_EquEspeciales
	FROM 
	(
		SELECT distinct 
			A.IdRegistro,			A.Cuenta,		A.CodigoEmpresa,			A.CodUnidadNegocio,		A.CodigoCentro,					A.CodigoSeccion, 
			A.CodDepartamento,		A.Marca, 		A.Gama,						A.Canal,				A.Debe,							A.Haber, 
			A.Saldo, 				A.CO,			A.VN, 						A.VO, 					A.RE, 							A.TM, 
			A.TC,					A.XX,			A.FechaAsientoInicial,		A.FechaAsientoFinal,	A.IdRegistroEquivalencia

		FROM 
		(
			SELECT distinct 
				C.IdRegistro,			C.Cuenta,		C.CodigoEmpresa,			C.CodUnidadNegocio,		C.CodigoCentro,							C.CodigoSeccion, 
				C.CodDepartamento,		C.Marca, 		C.Gama,						C.Canal,				C.Debe,									C.Haber, 
				C.Saldo, 				C.CO,			C.VN, 						C.VO, 					C.RE, 									C.TM, 
				C.TC,					C.XX,			C.FechaAsientoInicial,		C.FechaAsientoFinal,	E.IdRegistro AS IdRegistroEquivalencia
				
			FROM 
			(
				SELECT C.*
				FROM #tmpDFA_ConsultaContabilidad C
				LEFT JOIN #tmpDFA_Jerarquia J ON C.IdRegistro = J.IdRegistroContabilidad
				WHERE J.IdRegistroEquivalencia IS NULL
			) C
			
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia
				WHERE (Fuente = 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS E ON C.Cuenta = E.Cuenta 
						AND C.CodUnidadNegocio = E.CodUnidadNegocio 
		) A
	) temp
	WHERE IdRegistroEquivalencia IS NOT NULL
	
	
	-------INSERTAR LAS EQUIVALENCIAS ESPECIALES A LA TABLA DE JERARQUIA PRINCIPAL
	INSERT INTO #tmpDFA_Jerarquia SELECT * FROM #tmpDFA_EquEspeciales



	
	--CRUCE DE LAS CUENTAS 41 Y 61 QUE NO CRUZAN EL DEPARTAMENTO
	SELECT DISTINCT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia
	INTO #tmpDFAContabilidad_SinDepto
	FROM 
	(
		SELECT distinct IdRegistro, Cuenta, CodigoEmpresa, CodUnidadNegocio, CodigoCentro, CodigoSeccion, CodDepartamento, Marca, Gama, Canal, Debe, Haber, Saldo, 
			CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal, 
			CASE WHEN IdRegistro_VAL_1 IS NOT NULL THEN IdRegistro_VAL_1
				WHEN IdRegistro_VAL_2 IS NOT NULL THEN IdRegistro_VAL_2
				WHEN IdRegistro_VAL_3 IS NOT NULL THEN IdRegistro_VAL_3
				WHEN IdRegistro_VAL_4 IS NOT NULL THEN IdRegistro_VAL_4
				WHEN IdRegistro_VAL_5 IS NOT NULL THEN IdRegistro_VAL_5
				WHEN IdRegistro_VAL_6 IS NOT NULL THEN IdRegistro_VAL_6
				WHEN IdRegistro_VAL_7 IS NOT NULL THEN IdRegistro_VAL_7
				ELSE IdRegistro_VAL_8 END AS IdRegistroEquivalencia

		FROM 
		(
			SELECT distinct Contabilidad.IdRegistro, Contabilidad.Cuenta, Contabilidad.CodigoEmpresa, Contabilidad.CodUnidadNegocio, 
				Contabilidad.CodigoCentro, Contabilidad.CodigoSeccion, Contabilidad.CodDepartamento, Contabilidad.Marca, 
				Contabilidad.Gama, Contabilidad.Canal, Contabilidad.Debe, Contabilidad.Haber, Contabilidad.Saldo, 
				Contabilidad.CO, Contabilidad.VN, Contabilidad.VO, Contabilidad.RE, Contabilidad.TM, Contabilidad.TC, 
				Contabilidad.XX, Contabilidad.FechaAsientoInicial, Contabilidad.FechaAsientoFinal, VAL_1.IdRegistro AS IdRegistro_VAL_1, 
				VAL_2.IdRegistro AS IdRegistro_VAL_2, VAL_3.IdRegistro AS IdRegistro_VAL_3, VAL_4.IdRegistro AS IdRegistro_VAL_4, VAL_5.IdRegistro AS IdRegistro_VAL_5, 
				VAL_6.IdRegistro AS IdRegistro_VAL_6, VAL_7.IdRegistro AS IdRegistro_VAL_7, VAL_8.IdRegistro AS IdRegistro_VAL_8

			FROM 
			(
				SELECT Ano_Periodo, Mes_Periodo, IdRegistro, Cuenta, CodigoEmpresa, CodUnidadNegocio, CodigoCentro, CodigoSeccion, Marca, Gama, Canal, Debe, Haber, Saldo, 
					CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal, CodDepartamento, IdRegistroContabilidad
				FROM 
				(
					SELECT C.Ano_Periodo, C.Mes_Periodo, IdRegistro, Cuenta, CodigoEmpresa, CodUnidadNegocio, CodigoCentro, CodigoSeccion, Marca, Gama, Canal, Debe, 
						Haber, Saldo, CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal,
						CASE WHEN CodDepartamento LIKE '%VO%' THEN 'VN'
							ELSE CodDepartamento END CodDepartamento, #tmpDFA_Jerarquia.IdRegistroContabilidad
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia ON C.IdRegistro = #tmpDFA_Jerarquia.IdRegistroContabilidad
					WHERE #tmpDFA_Jerarquia.IdRegistroContabilidad IS NULL
				) A
				WHERE (Cuenta LIKE '413502%') OR (Cuenta LIKE '413504%') OR (Cuenta LIKE '413506%') OR (Cuenta LIKE '417502%') OR (Cuenta LIKE '417504%')
					OR (Cuenta = '4135954040') OR (Cuenta = '4135954045') OR (Cuenta = '4135954035') OR (Cuenta = '4135955010') OR (Cuenta = '4175955010')
					OR (Cuenta LIKE '417506%') OR (Cuenta LIKE '613502%') OR (Cuenta LIKE '613504%') OR (Cuenta LIKE '613506%') --OR (Cuenta LIKE '424540%')
			) Contabilidad
			
			
			--Validación 1: Se compara la Cuenta, UnidadNegocio, Marca, Gama, Canal
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia
				WHERE (Activo = 1)
				ORDER BY Marca
			) AS VAL_1 ON Contabilidad.Cuenta = VAL_1.Cuenta 
						AND Contabilidad.CodUnidadNegocio = VAL_1.CodUnidadNegocio 
						AND Contabilidad.Marca = VAL_1.Marca 
						AND Contabilidad.Gama = VAL_1.Gamas 
						AND Contabilidad.Canal = VAL_1.Canales 


			--Validación 2: Se compara la Cuenta, UnidadNegocio, Departamento, Marca y Gama. El canal se deja vacio 
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Canales = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_2 ON Contabilidad.Cuenta = VAL_2.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_2.CodUnidadNegocio 
						AND Contabilidad.Marca = VAL_2.Marca 
						AND Contabilidad.Gama = VAL_2.Gamas 

			
			--Validación 3: Se compara la Cuenta, UnidadNegocio, Departamento, Marca y Canal. La gama queda nulo
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Gamas = 'TODOS') AND (Activo = 1) AND (Fuente <> 'EquEspeciales')
				ORDER BY Marca
			) AS VAL_3 ON Contabilidad.Cuenta = VAL_3.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_3.CodUnidadNegocio 
						AND Contabilidad.Marca = VAL_3.Marca 
						AND Contabilidad.Canal = VAL_3.Canales


			--Validación 4: Se compara la Cuenta, UnidadNegocio, Departamento, Canal y Gama. La Marca queda nulo
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Marca = 'TODOS') AND (Activo = 1) AND (Fuente <> 'EquEspeciales')
				ORDER BY Marca
			) AS VAL_4 ON Contabilidad.Cuenta = VAL_4.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_4.CodUnidadNegocio 
						AND Contabilidad.Gama = VAL_4.Gamas 
						AND Contabilidad.Canal = VAL_4.Canales


			--Validación 5: Se compara la Cuenta, UnidadNegocio, Departamento y Marca. La Gama y el Canal quedan nulos
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Gamas = 'TODOS') AND (Activo = 1) AND (Canales = 'TODOS') AND (Fuente <> 'EquEspeciales')
				ORDER BY Marca
			) AS VAL_5 ON Contabilidad.Cuenta = VAL_5.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_5.CodUnidadNegocio 
						AND Contabilidad.Marca = VAL_5.Marca 
			

			--Validación 6: Se compara la Cuenta, UnidadNegocio, Departamento y Canal. La Marca y la Gama quedan nulos
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Gamas = 'TODOS') AND (Activo = 1) AND (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales')
				ORDER BY Marca
			) AS VAL_6 ON Contabilidad.Cuenta = VAL_6.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_6.CodUnidadNegocio 
						AND Contabilidad.Canal = VAL_6.Canales 
			
			
			--Validación 7: Se compara la Cuenta, UnidadNegocio, Departamento y Gama. La Marca y el Canal quedan nulos
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Canales = 'TODOS') AND (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_7 ON Contabilidad.Cuenta = VAL_7.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_7.CodUnidadNegocio 
						AND Contabilidad.Gama = VAL_7.Gamas 
			
			
			--Validación 8: Se compara la Cuenta y UnidadNegocio, Departamento. La Marca, Gama y Canal quedan nulos.
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM  dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_2
				WHERE (Gamas = 'TODOS') AND (Canales = 'TODOS') AND (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_8 ON Contabilidad.Cuenta = VAL_8.Cuenta 
						AND Contabilidad.CodUnidadNegocio = VAL_8.CodUnidadNegocio
		) A
	) temp

	

	--CRUCE DEMÁS CUENTAS CON CRUCE DEL DEPARTAMENTO
	SELECT DISTINCT (@Año) Ano_Periodo, (@Mes) Mes_Periodo, (temp.IdRegistro)IdRegistroContabilidad, temp.IdRegistroEquivalencia

	INTO #tmpDFAContabilidad_ConDepto

	FROM 
	(
		SELECT distinct IdRegistro, Cuenta, CodigoEmpresa, CodUnidadNegocio, CodigoCentro, CodigoSeccion, CodDepartamento, Marca, Gama, Canal, Debe, Haber, Saldo, 
			CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal, 
			CASE WHEN IdRegistro_VAL_1 IS NOT NULL THEN IdRegistro_VAL_1
				WHEN IdRegistro_VAL_2 IS NOT NULL THEN IdRegistro_VAL_2
				WHEN IdRegistro_VAL_3 IS NOT NULL THEN IdRegistro_VAL_3
				WHEN IdRegistro_VAL_4 IS NOT NULL THEN IdRegistro_VAL_4
				WHEN IdRegistro_VAL_5 IS NOT NULL THEN IdRegistro_VAL_5
				WHEN IdRegistro_VAL_6 IS NOT NULL THEN IdRegistro_VAL_6
				WHEN IdRegistro_VAL_7 IS NOT NULL THEN IdRegistro_VAL_7
				ELSE IdRegistro_VAL_8 END AS IdRegistroEquivalencia

		FROM 
		(
			SELECT distinct Contabilidad.IdRegistro, Contabilidad.Cuenta, Contabilidad.CodigoEmpresa, Contabilidad.CodUnidadNegocio, 
				Contabilidad.CodigoCentro, Contabilidad.CodigoSeccion, Contabilidad.CodDepartamento, Contabilidad.Marca, 
				Contabilidad.Gama, Contabilidad.Canal, Contabilidad.Debe, Contabilidad.Haber, Contabilidad.Saldo, 
				Contabilidad.CO, Contabilidad.VN, Contabilidad.VO, Contabilidad.RE, Contabilidad.TM, Contabilidad.TC, 
				Contabilidad.XX, Contabilidad.FechaAsientoInicial, Contabilidad.FechaAsientoFinal, VAL_1.IdRegistro AS IdRegistro_VAL_1, 
				VAL_2.IdRegistro AS IdRegistro_VAL_2, VAL_3.IdRegistro AS IdRegistro_VAL_3, VAL_4.IdRegistro AS IdRegistro_VAL_4, VAL_5.IdRegistro AS IdRegistro_VAL_5, 
				VAL_6.IdRegistro AS IdRegistro_VAL_6, VAL_7.IdRegistro AS IdRegistro_VAL_7, VAL_8.IdRegistro AS IdRegistro_VAL_8

			FROM 
			(
				SELECT Ano_Periodo, Mes_Periodo, IdRegistro, Cuenta, CodigoEmpresa, CodUnidadNegocio, CodigoCentro, CodigoSeccion, Marca, Gama, Canal, Debe, Haber, Saldo, 
					CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal, CodDepartamento, IdRegistroContabilidad
				FROM 
				(
					SELECT C.Ano_Periodo, C.Mes_Periodo, IdRegistro, Cuenta, CodigoEmpresa, CodUnidadNegocio, CodigoCentro, CodigoSeccion, Marca, Gama, Canal, Debe, 
						Haber, Saldo, CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal,
						CASE WHEN CodDepartamento LIKE '%VO%' THEN 'VN'
							ELSE CodDepartamento END CodDepartamento, #tmpDFA_Jerarquia.IdRegistroContabilidad
					FROM #tmpDFA_ConsultaContabilidad C
					LEFT JOIN #tmpDFA_Jerarquia ON C.IdRegistro = #tmpDFA_Jerarquia.IdRegistroContabilidad
					WHERE #tmpDFA_Jerarquia.IdRegistroContabilidad IS NULL
				) A
				WHERE Cuenta NOT LIKE '413502%' AND Cuenta NOT LIKE '413504%' AND Cuenta NOT LIKE '413506%' AND Cuenta NOT LIKE '417502%' AND Cuenta NOT LIKE '417504%'
					AND Cuenta NOT LIKE '417506%' AND Cuenta NOT LIKE '613502%' AND Cuenta NOT LIKE '613504%' AND Cuenta NOT LIKE '613506%' --AND Cuenta NOT LIKE '424540%' 
					AND Cuenta NOT IN ('4135954040','4135954045','4135954035','4135955010','4175955010')
			) Contabilidad
			
			
			--Validación 1: Se compara la Cuenta, UnidadNegocio, Departamento, Marca, Gama, Canal
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia
				WHERE (Activo = 1)
				ORDER BY Marca
			) AS VAL_1 ON Contabilidad.Cuenta = VAL_1.Cuenta 
						AND Contabilidad.CodUnidadNegocio = VAL_1.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_1.CodDepartamento
						AND Contabilidad.Marca = VAL_1.Marca 
						AND Contabilidad.Gama = VAL_1.Gamas 
						AND Contabilidad.Canal = VAL_1.Canales 


			--Validación 2: Se compara la Cuenta, UnidadNegocio, Departamento, Marca y Gama. El canal se deja vacio 
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Canales = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_2 ON Contabilidad.Cuenta = VAL_2.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_2.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_2.CodDepartamento
						AND Contabilidad.Marca = VAL_2.Marca 
						AND Contabilidad.Gama = VAL_2.Gamas 

			
			--Validación 3: Se compara la Cuenta, UnidadNegocio, Departamento, Marca y Canal. La gama queda nulo
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Gamas = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_3 ON Contabilidad.Cuenta = VAL_3.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_3.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_3.CodDepartamento
						AND Contabilidad.Marca = VAL_3.Marca 
						AND Contabilidad.Canal = VAL_3.Canales


			--Validación 4: Se compara la Cuenta, UnidadNegocio, Departamento, Canal y Gama. La Marca queda nulo
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_4 ON Contabilidad.Cuenta = VAL_4.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_4.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_4.CodDepartamento
						AND Contabilidad.Gama = VAL_4.Gamas 
						AND Contabilidad.Canal = VAL_4.Canales


			--Validación 5: Se compara la Cuenta, UnidadNegocio, Departamento y Marca. La Gama y el Canal quedan nulos
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Gamas = 'TODOS') AND (Canales = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_5 ON Contabilidad.Cuenta = VAL_5.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_5.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_5.CodDepartamento
						AND Contabilidad.Marca = VAL_5.Marca 
			

			--Validación 6: Se compara la Cuenta, UnidadNegocio, Departamento y Canal. La Marca y la Gama quedan nulos
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Gamas = 'TODOS') AND (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_6 ON Contabilidad.Cuenta = VAL_6.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_6.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_6.CodDepartamento
						AND Contabilidad.Canal = VAL_6.Canales 
			
			
			--Validación 7: Se compara la Cuenta, UnidadNegocio, Departamento y Gama. La Marca y el Canal quedan nulos
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_1
				WHERE (Canales = 'TODOS') AND (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_7 ON Contabilidad.Cuenta = VAL_7.Cuenta
						AND Contabilidad.CodUnidadNegocio = VAL_7.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_7.CodDepartamento
						AND Contabilidad.Gama = VAL_7.Gamas 
			
			
			--Validación 8: Se compara la Cuenta y UnidadNegocio, Departamento. La Marca, Gama y Canal quedan nulos.
			LEFT OUTER JOIN
			(
				SELECT TOP (100) PERCENT IdRegistro, Cuenta, CodUnidadNegocio, CodDepartamento, Canales, Marca, Gamas, CodDepartamentoEquivalencia, 
					Depto_Equivalencia, Marca_Equivalencia, DFA_Equivalencia, Cero_Equivalencia, Sucursal_Equivalencia, Cuenta_Equivalencia, Activo
				FROM  dbo.DFA_Parametrizacion_Equivalencia AS DFA_Parametrizacion_Equivalencia_2
				WHERE (Gamas = 'TODOS') AND (Canales = 'TODOS') AND (Marca = 'TODOS') AND (Fuente <> 'EquEspeciales') AND (Activo = 1)
				ORDER BY Marca
			) AS VAL_8 ON Contabilidad.Cuenta = VAL_8.Cuenta 
						AND Contabilidad.CodUnidadNegocio = VAL_8.CodUnidadNegocio 
						AND Contabilidad.CodDepartamento = VAL_8.CodDepartamento
		) A
	) temp
	


	--UNIFICAR LAS CONSULTAS DE LAS EQUIVALENCIAS EN UNA SOLA TABLA TEMPORAL
	SELECT DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.Ano_Periodo)) AS INT),0) AS IdRegistro, Ano_Periodo, Mes_Periodo, 
		IdRegistroContabilidad, IdRegistroEquivalencia 
	
	INTO #tmpDFA_CruceEquivalencias

	FROM 
	(
		SELECT Ano_Periodo, Mes_Periodo, IdRegistroContabilidad, IdRegistroEquivalencia 
		FROM
		(
			SELECT Ano_Periodo, Mes_Periodo, IdRegistroContabilidad, IdRegistroEquivalencia 
			FROM #tmpDFA_Jerarquia

			UNION ALL 

			SELECT Ano_Periodo, Mes_Periodo, IdRegistroContabilidad, IdRegistroEquivalencia 
			FROM #tmpDFAContabilidad_SinDepto

			UNION ALL 

			SELECT Ano_Periodo, Mes_Periodo, IdRegistroContabilidad, IdRegistroEquivalencia 
			FROM #tmpDFAContabilidad_ConDepto
		) A
	) A
		

	--ACTUALIZACIÓN FINAL DE DATOS
	IF OBJECT_ID (N'dbo.DFA_ContabilidadEquivalencia', N'U') IS NOT NULL
		BEGIN
			DELETE FROM dbo.DFA_ContabilidadEquivalencia WHERE Ano_Periodo = @Año AND Mes_Periodo = @Mes
			INSERT INTO dbo.DFA_ContabilidadEquivalencia SELECT * FROM #tmpDFA_CruceEquivalencias
		END	
	ELSE
		BEGIN
			SELECT * INTO dbo.DFA_ContabilidadEquivalencia from #tmpDFA_CruceEquivalencias
		END


	--ELIMINAR LAS TABLAS TEMPORALES
	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_ConsultaContabilidad', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_ConsultaContabilidad

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia2', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia2

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia3', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia3

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia4', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia4

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia5', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia5

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia6', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia6

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia7', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia7

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia8', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia8

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia9', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia9

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia10', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia10

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia11', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia11

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia12', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia12

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_Jerarquia13', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_Jerarquia13

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_EquEspeciales', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_EquEspeciales

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidad_SinDepto', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidad_SinDepto

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidad_ConDepto', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidad_ConDepto

	IF OBJECT_ID(N'tempdb.dbo.#tmpDFA_CruceEquivalencias', N'U') IS NOT NULL
		DROP TABLE #tmpDFA_CruceEquivalencias

END 

```
