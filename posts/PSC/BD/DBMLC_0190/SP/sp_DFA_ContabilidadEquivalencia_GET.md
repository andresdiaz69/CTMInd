# Stored Procedure: sp_DFA_ContabilidadEquivalencia_GET

## Usa los objetos:
- [[DFA_ContabilidadEquivalencia]]
- [[DFA_Parametrizacion_CuentasProvision]]
- [[DFA_Parametrizacion_Equivalencia]]
- [[vw_DFA_Contabilidad]]

```sql
CREATE PROCEDURE [dbo].[sp_DFA_ContabilidadEquivalencia_GET]
(
	@Ano_Periodo INT, 
	@Mes_Periodo INT
) AS
BEGIN

	--DECLARE @Ano_Periodo INT, @Mes_Periodo INT
	--SET @Ano_Periodo = 2023
	--SET @Mes_Periodo = 3

	SELECT 	DISTINCT
		IdRegistro,					Ano_Periodo,				Mes_Periodo,			Cuenta,						CodigoConcepto,					NombreConcepto,			
		Cta = LEFT(Cuenta, 1), 		CodigoEmpresa,				NombreEmpresa,			CodUnidadNegocio, 			NombreUnidadNegocio,			CodigoCentro, 
		NombreCentro,				CodigoSeccion,				Seccion,				CodDepartamento,			NombreDepartamento,				CodigoMarca, 
		NombreMarca,				Gama,						Canal,					Debe,						Haber,							Saldo, 
		CO,							VN,							VO,						RE,							TM,								TC, 
		XX,							FechaAsientoInicial,		FechaAsientoFinal,		Fuente,						CodDepartamentoEquivalencia,	Depto_Equivalencia, 
		Marca_Equivalencia,			DFA_Equivalencia,			Cero_Equivalencia,		Sucursal_Equivalencia,		Cuenta_Equivalencia,			Provision, 
	
		CASE WHEN Provision = 1 THEN 'Cuentas de provisión'
			WHEN CodigoSeccion = 0 THEN 'Movimientos sin sección' 
			ELSE '' END Comentarios
	
		--CASE WHEN Cuenta IN ('4250350505','4250351505','5299101010','5299150505','5299150510','5299150515','5299150520','5299150525', '5199950505') THEN 'Cuentas de provisión'
		--	WHEN CodigoSeccion = 0 THEN 'Movimientos sin sección' 
		--	ELSE '' END Comentarios
	FROM 
	(
		SELECT 
			--CONTABILIDAD DFA
			C.IdRegistro,					C.Ano_Periodo,							C.Mes_Periodo,					C.Cuenta, 					C.CodigoConcepto,		
			C.NombreConcepto,				C.CodigoEmpresa,						C.NombreEmpresa,				C.CodUnidadNegocio,			C.NombreUnidadNegocio,				
			C.CodigoCentro,					C.NombreCentro,							C.CodigoSeccion,				C.Seccion,					C.CodDepartamento,			
			C.NombreDepartamento, 			C.CodigoMarca,							C.NombreMarca,					C.Gama,						C.Canal, 
			C.Debe,							C.Haber,								C.Saldo,						C.CO,						C.VN,					
			C.VO,							C.RE,									C.TM,							C.TC,						C.XX,								
			C.FechaAsientoInicial, 			C.FechaAsientoFinal,					Provision = 0,

			--EQUIVALENCIAS DFA
			E.Fuente,						E.CodDepartamentoEquivalencia,			E.Depto_Equivalencia,			E.Marca_Equivalencia, 		E.DFA_Equivalencia,		
			E.Cero_Equivalencia,			E.Sucursal_Equivalencia,				E.Cuenta_Equivalencia


		FROM 
		(
			SELECT * FROM vw_DFA_Contabilidad 
			WHERE Ano_Periodo = @Ano_Periodo AND Mes_Periodo = @Mes_Periodo
				AND Cuenta NOT IN (SELECT Cuenta FROM DFA_Parametrizacion_CuentasProvision)
		) C
		LEFT JOIN 
		(
			SELECT 
				C.IdRegistroContabilidad,		Fuente,						E.CodDepartamentoEquivalencia,		E.Depto_Equivalencia, 		E.Marca_Equivalencia,			
				E.DFA_Equivalencia, 			E.Cero_Equivalencia,		E.Sucursal_Equivalencia, 			E.Cuenta_Equivalencia,		Ano_Periodo,			
				Mes_Periodo
			FROM 
			(
				SELECT * FROM DFA_ContabilidadEquivalencia 
				WHERE Ano_Periodo = @Ano_Periodo AND Mes_Periodo = @Mes_Periodo
			) C
			LEFT JOIN 
			(	
				SELECT * FROM DFA_Parametrizacion_Equivalencia WHERE Activo = 1
			) E ON E.IdRegistro = C.IdRegistroEquivalencia
		) E ON C.IdRegistro = E.IdRegistroContabilidad

		UNION ALL

		SELECT 
			--CONTABILIDAD DFA
			IdRegistro,						Ano_Periodo,						Mes_Periodo,					Cuenta, 						CodigoConcepto,		
			NombreConcepto,					CodigoEmpresa,						NombreEmpresa,					CodUnidadNegocio,				NombreUnidadNegocio,				
			CodigoCentro,					NombreCentro,						CodigoSeccion,					Seccion,						CodDepartamento,			
			NombreDepartamento, 			CodigoMarca,						NombreMarca,					Gama,							Canal, 
			Debe,							Haber,								Saldo,							CO,								VN,					
			VO,								RE,									TM,								TC,								XX,								
			FechaAsientoInicial, 			FechaAsientoFinal,					Provision = 1,					Fuente = NULL,					CodDepartamentoEquivalencia = NULL,				
			Depto_Equivalencia = NULL,		Marca_Equivalencia = NULL,			DFA_Equivalencia = NULL,		Cero_Equivalencia = NULL,		Sucursal_Equivalencia = NULL,			
			Cuenta_Equivalencia = NULL
		FROM vw_DFA_Contabilidad 
		WHERE Ano_Periodo = @Ano_Periodo AND Mes_Periodo = @Mes_Periodo
			AND Cuenta IN (SELECT Cuenta FROM DFA_Parametrizacion_CuentasProvision)
	) A 
END

```
