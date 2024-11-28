# Stored Procedure: sp_DFA_Contabilidad

## Usa los objetos:
- [[DFA_Contabilidad]]
- [[InformesArboles]]
- [[InformesDatosArbol]]
- [[spiga_ContabilidadSpigaJD]]
- [[vw_DFA_Centros]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE PROC [dbo].[sp_DFA_Contabilidad]
(
	@Año int,
	@Mes int
) AS
BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|08|01 - ALEXIS - Ajuste en la Sección 551 - Se adiciono el valor por defecto
	-- 2024|11|27 - ALEXIS - Se ajustan las consultas para que se realicen por medio del Año y Mes.
	-- =============================================

	SET NOCOUNT ON
	SET FMTONLY OFF

	--Declaración de variables y asignación de parametros para consulta
	--DECLARE @Año int = 2024, @Mes int = 1;
	DECLARE @FechaAsientoInicial DATETIME = DATEFROMPARTS(@Año, @Mes, 1),
		@FechaAsientoFinal DATETIME = DATEADD(DAY, -1, DATEADD(MONTH,1,DATEFROMPARTS(@Año, @Mes, 1)));
		

	--VALIDACIÓN DE TABLAS TEMPORALES
	---Tabla Temporal Cuentas 4, 5 y 6 
	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidadPyG', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidadPyG
	
	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidadPyG_Final', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidadPyG_Final
	

	--CONSULTA DE INFORMACIÓN
	---Cuentas PyG 4, 5 y 6
	SELECT DISTINCT					(@Año)Ano_Periodo,			(@Mes)Mes_Periodo,			Cuenta,						CodigoConcepto,			CodigoEmpresa,			
		CodUnidadNegocio,			CodigoCentro,				CodigoSeccion,				CodDepartamento,			Marca,					Gama,					
		Canal,						debe,						haber,						saldo,						CO,						VN,						
		VO,							RE,							TM,							TC,							XX,						FechaAsientoInicial,		
		FechaAsientoFinal		

	INTO #tmpDFAContabilidadPyG

	FROM
	(
		SELECT LTRIM(RTRIM(DFA.Cuenta))Cuenta,			CPT.CodigoConcepto,			DFA.CodigoEmpresa,			LTRIM(RTRIM(DFA.CodUnidadNegocio))CodUnidadNegocio,
			DFA.CodigoCentro,							DFA.CodigoSeccion,			DFA.Marca,					DFA.Gama,
			LTRIM(RTRIM(DFA.Canal))Canal,				SUM(DFA.debe)debe,			SUM(DFA.haber)haber,		SUM(DFA.saldo)saldo,
			SUM(DFA.CO)CO,								SUM(DFA.VN)VN,				SUM(DFA.VO)VO,				SUM(DFA.RE)RE,								
			SUM(DFA.TM)TM,								SUM(DFA.TC)TC,				SUM(DFA.XX)XX,				DFA.FechaAsientoInicial,
			DFA.FechaAsientoFinal,
			CASE WHEN DFA.CodDepartamento IS NOT NULL AND LTRIM(RTRIM(DFA.CodDepartamento)) NOT IN ('TM','RE','VN') THEN 'VN' ELSE CodDepartamento END CodDepartamento
		FROM 
		(
			SELECT	s.Cuenta,					s.CodigoEmpresa,								s.CodigoCentro,								s.CodigoSeccion,			
					S.Marca,					S.Gama,											S.Canal,									debe = SUM(debe),			
					haber = SUM(haber),			saldo = SUM(saldo),								CO = SUM(CO),								VN = SUM(VN),				
					VO = SUM(VO),				RE = SUM(RE),									TM = SUM(TM),								TC = SUM(TC),
					XX = SUM(XX),				FechaAsientoInicial=@FechaAsientoInicial, 		FechaAsientoFinal=@FechaAsientoFinal,
					CodUnidadNegocio = CASE WHEN S.CodigoSeccion = 551 AND C.CodUnidadNegocio IS NULL THEN D.CodUnidadNegocio ELSE C.CodUnidadNegocio END,
					CodDepartamento = CASE WHEN S.CodigoSeccion = 551 AND C.CodUnidadNegocio IS NULL THEN D.CodDepartamento ELSE C.CodDepartamento END
			FROM [PSCService_DB]..[spiga_ContabilidadSpigaJD] s
			LEFT JOIN 
			(
				SELECT DISTINCT CodUnidadNegocio, a.CodCentro, a.CodSeccion, CodDepartamento
				FROM [DBMLC_0190]..[vw_DFA_Centros] a
				WHERE Activo = 1
			) c ON s.CodigoCentro= c.CodCentro AND s.CodigoSeccion=c.CodSeccion
			LEFT JOIN (
				SELECT CodUnidadNegocio = 410, CodSeccion = 551, CodDepartamento = 'VN'
			) d ON s.CodigoSeccion = d.CodSeccion
			WHERE s.Ano_Periodo = @Año
				AND s.Mes_Periodo = @Mes
				AND (Cuenta LIKE '4%' OR Cuenta LIKE '5%' OR Cuenta LIKE '6%')
				AND CodigoEmpresa IN (1,19)
				AND CodigoCentro <> (146)
			GROUP BY	s.CodigoEmpresa,		s.CodigoCentro,			s.CodigoSeccion,			s.Cuenta,				s.canal,					
						s.marca,				s.Gama,					c.CodCentro,				c.CodSeccion,			c.CodUnidadNegocio,
						c.CodDepartamento,		D.CodSeccion,			D.CodUnidadNegocio,			D.CodDepartamento

			UNION ALL

			SELECT	s.Cuenta,					s.CodigoEmpresa,								s.CodigoCentro,								s.CodigoSeccion,			
					S.Marca,					S.Gama,											S.Canal,									debe = SUM(debe),			
					haber = SUM(haber),			saldo = SUM(saldo),								CO = SUM(CO),								VN = SUM(VN),				
					VO = SUM(VO),				RE = SUM(RE),									TM = SUM(TM),								TC = SUM(TC),
					XX = SUM(XX),				FechaAsientoInicial=@FechaAsientoInicial, 		FechaAsientoFinal=@FechaAsientoFinal,		c.CodUnidadNegocio,
					c.CodDepartamento
			FROM [PSCService_DB]..[spiga_ContabilidadSpigaJD] s
			LEFT JOIN 
			(
				SELECT DISTINCT CodUnidadNegocio, a.CodCentro, a.CodSeccion, CodDepartamento
				FROM [DBMLC_0190]..[vw_DFA_Centros] a
				WHERE Activo = 1
			) c ON s.CodigoCentro= c.CodCentro AND s.CodigoSeccion=c.CodSeccion
			WHERE s.Ano_Periodo = @Año
				AND s.Mes_Periodo = @Mes
				AND (Cuenta LIKE '4%' OR Cuenta LIKE '5%' OR Cuenta LIKE '6%')
				AND CodigoEmpresa IN (1,19)
				AND CodigoCentro = 146 
				AND CodigoSeccion NOT IN (0,669,874,875,876,877,878,889,890,891,892,893,894,895,909,955,1094,1095,1096)
			GROUP BY	s.CodigoEmpresa,		s.CodigoCentro,			s.CodigoSeccion,		s.Cuenta,				canal,					marca,
						Gama,					CodCentro,				CodSeccion,				CodUnidadNegocio,		c.CodDepartamento
		) DFA
		LEFT JOIN 
		(
			SELECT A.Empresa, A.Balance, A.CodigoConcepto, B.NombreConcepto, A.Cuenta, A.NombreCuenta
			FROM [InformesComiteDB].[dbo].[InformesDatosArbol]		AS A
			LEFT JOIN [InformesComiteDB].[dbo].[InformesArboles]	AS B	ON A.CodigoConcepto = B.CodigoConcepto 
																			AND A.Balance = B.Balance
			WHERE A.Balance = 17
		) CPT ON DFA.Cuenta = CPT.Cuenta
		GROUP BY DFA.Cuenta, CPT.CodigoConcepto, DFA.CodigoEmpresa, DFA.CodUnidadNegocio, DFA.CodigoCentro, DFA.CodigoSeccion, DFA.CodDepartamento, 
			DFA.Marca, DFA.Gama, DFA.Canal, DFA.FechaAsientoInicial, DFA.FechaAsientoFinal
	)A



	SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.Cuenta)) AS INT),0) AS IdRegistro,
		Ano_Periodo,			Mes_Periodo,			Cuenta,					CodigoConcepto,			CodigoEmpresa,				CodUnidadNegocio,		
		CodigoCentro,			CodigoSeccion,			CodDepartamento,		Marca,					Gama,						Canal,					
		debe,					haber,					saldo,					CO,						VN,							VO,
		RE,						TM,						TC,						XX,						FechaAsientoInicial,		FechaAsientoFinal
	
	INTO #tmpDFAContabilidadPyG_Final
	
	FROM 
	(
		SELECT Ano_Periodo,			Mes_Periodo,			Cuenta,					CodigoConcepto,			CodigoEmpresa,				CodUnidadNegocio,		
			CodigoCentro,			CodigoSeccion,			CodDepartamento,		Marca,					Gama,						Canal,					
			SUM(debe)debe,			SUM(haber)haber,		SUM(saldo)saldo,		SUM(CO)CO,				SUM(VN)VN,					SUM(VO)VO,
			SUM(RE)RE,				SUM(TM)TM,				SUM(TC)TC,				SUM(XX)XX,				FechaAsientoInicial,		FechaAsientoFinal
		FROM 
		(
			SELECT Ano_Periodo,			Mes_Periodo,			Cuenta,					CodigoConcepto,			CodigoEmpresa,				CodUnidadNegocio,		
				CodigoCentro,			CodigoSeccion,			CodDepartamento,		Marca,					Gama,						Canal,					
				debe,					haber,					saldo,					CO,						VN,							VO,
				RE,						TM,						TC,						XX,						FechaAsientoInicial,		FechaAsientoFinal
			FROM #tmpDFAContabilidadPyG 
			WHERE Marca <> '0'

			UNION ALL 

			SELECT DISTINCT 
				A.Ano_Periodo,				A.Mes_Periodo,			A.Cuenta,						A.CodigoConcepto,			A.CodigoEmpresa,				
				A.CodUnidadNegocio,			A.CodigoCentro,			A.CodigoSeccion,				A.CodDepartamento,			Marca=U.CodUnidadNegocio,					
				A.Gama,						A.Canal,				A.debe,							A.haber,					A.saldo,					
				A.CO,						A.VN,					A.VO,							A.RE,						A.TM,						
				A.TC,						A.XX,					A.FechaAsientoInicial,			A.FechaAsientoFinal
			FROM
			(
				SELECT Ano_Periodo,			Mes_Periodo,			Cuenta,					CodigoConcepto,			CodigoEmpresa,				CodUnidadNegocio,		
					CodigoCentro,			CodigoSeccion,			CodDepartamento,		Marca,					Gama,						Canal,					
					debe,					haber,					saldo,					CO,						VN,							VO,
					RE,						TM,						TC,						XX,						FechaAsientoInicial,		FechaAsientoFinal
				FROM #tmpDFAContabilidadPyG 
				WHERE Marca = '0'
			) A
			LEFT JOIN 
			(
				SELECT DISTINCT CodSeccion, CodUnidadNegocio
				FROM vw_UnidadDeNegocio 
			) U ON U.CodSeccion = A.CodigoSeccion
		) A
		GROUP BY Ano_Periodo,			Mes_Periodo,			Cuenta,					CodigoConcepto,			CodigoEmpresa,				CodUnidadNegocio,		
			CodigoCentro,				CodigoSeccion,			CodDepartamento,		Marca,					Gama,						Canal,
			FechaAsientoInicial,		FechaAsientoFinal
	) A



	--ACTUALIZACIÓN FINAL DE DATOS EN TABLA DE CONTABILIDAD
	IF OBJECT_ID (N'dbo.DFA_Contabilidad', N'U') IS NOT NULL
		BEGIN
			DELETE FROM dbo.DFA_Contabilidad WHERE Ano_Periodo = @Año AND Mes_Periodo = @Mes
			INSERT INTO dbo.DFA_Contabilidad SELECT * FROM #tmpDFAContabilidadPyG_Final
		END	
	ELSE
		BEGIN
			SELECT * INTO dbo.DFA_Contabilidad from #tmpDFAContabilidadPyG_Final
		END


	--ELIMINAR TABLAS TEMPORALES
	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidadPyG', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidadPyG
	
	IF OBJECT_ID(N'tempdb.dbo.#tmpDFAContabilidadPyG_Final', N'U') IS NOT NULL
		DROP TABLE #tmpDFAContabilidadPyG_Final

END

```
