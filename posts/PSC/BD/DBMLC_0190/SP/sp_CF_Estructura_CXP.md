# Stored Procedure: sp_CF_Estructura_CXP

## Usa los objetos:
- [[CF_CXP]]
- [[Provision_CA_Datos]]
- [[spiga_CuentasPorPagar]]
- [[v_CF_AgrupacionLinea]]
- [[vw_Empresas]]
- [[vw_Spiga_Terceros]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE PROC [dbo].[sp_CF_Estructura_CXP] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
)AS

BEGIN
	--DECLARE @FechaConsulta DATE, @FechaIngreso DATE
	--SET @FechaConsulta = '20240301'
	--SET @FechaIngreso = '20240301'

	--Consulta de las cuentas por pagar y guardado en la tabla temporal (#TmpCF_StrCXP)
	SELECT	ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY IdEmpresas)) AS INT),0) AS Id						,Ano_Periodo = YEAR(@FechaIngreso)
		,Mes_Periodo = MONTH(@FechaIngreso)				,CXP.FechaDeCorte								,IdEmpresa = CXP.IdEmpresas
		,EM.NombreEmpresa								,CodCentro = CE.Id_Centro						,CXP.NombreCentro
		,NombreSeccion = CXP.DescripcionSeccion			,CXP.IdTerceros									,NombreTercero=Ter_Gen.Nombre
		,CXP.IdTerceros_Pagador							,NombreTerceros_Pagador=Ter_Pag.Nombre			,Valor = ISNULL(CXP.ImportePendiente, 0)
		,CASE WHEN FAB.IdTercero IS NULL THEN 'Otros'
			WHEN FAB.IdTercero IS NOT NULL AND CXP.IdTerceros <> CXP.IdTerceros_Pagador THEN 'Bancos'
			WHEN FAB.IdTercero IS NOT NULL AND ISNULL(CXP.ImportePendiente, 0) >= 0 THEN 'Fabricas'
			WHEN FAB.IdTercero IS NOT NULL AND ISNULL(CXP.ImportePendiente, 0) < 0 THEN 'NC Fabricas'
			END Tipo
	INTO #TmpCF_StrCXP
	FROM [PSCService_DB].[dbo].[spiga_CuentasPorPagar] AS CXP WITH(NOLOCK)
	
	LEFT JOIN vw_Spiga_Terceros AS Ter_Pag ON CXP.IdTerceros_Pagador = Ter_Pag.PkTerceros

	LEFT JOIN vw_Spiga_Terceros AS Ter_Gen ON CXP.IdTerceros = Ter_Gen.PkTerceros

	LEFT JOIN vw_Empresas AS EM ON CXP.IdEmpresas = EM.CodigoEmpresa
	
	LEFT JOIN (SELECT DISTINCT Id_Centro, Centro FROM v_CF_AgrupacionLinea) AS CE ON LTRIM(RTRIM(CE.Centro)) = LTRIM(RTRIM(CXP.NombreCentro))

	LEFT JOIN (
		SELECT DISTINCT IdTercero = Valor, NombreTercero = Dato
		FROM Provision_CA_Datos 
		WHERE IdTipo IN (2,3)
	) FAB ON FAB.IdTercero = CXP.IdTerceros
	
	WHERE CXP.FechaDeCorte >= '20190101' AND CXP.Ano_Periodo = YEAR(@FechaConsulta) AND CXP.Mes_Periodo = MONTH(@FechaConsulta)
		AND CXP.IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)



	--Se estructura la informacion para guardar en la tabla  #TmpCF_CXP
	SELECT Id				,Ano_Periodo			,Mes_Periodo				,FechaDeCorte
		,IdEmpresa			,NombreEmpresa			,IdLinea					,CodLinea
		,NombreLinea		,CodCentro				,NombreCentro				,NombreSeccion
		,IdTerceros 		,NombreTercero			,IdTerceros_Pagador 		,NombreTerceros_Pagador
		,Tipo				,Valor
	
	INTO #TmpCF_CXP
	
	FROM 
	(
		--LINEAS CON CENTROS NO COMPARTIDOS
		SELECT	Id						,Ano_Periodo		,Mes_Periodo				,FechaDeCorte	
			,IdEmpresa					,NombreEmpresa		,IdLinea = B.Id_Linea		,CodLinea = B.Cod_Linea
			,NombreLinea = B.Linea		,CodCentro			,NombreCentro				,NombreSeccion				
			,IdTerceros 				,NombreTercero		,IdTerceros_Pagador 		,NombreTerceros_Pagador		
			,Tipo						,Valor
		FROM #TmpCF_StrCXP CXP
		LEFT JOIN (
			SELECT DISTINCT Id_Linea,Cod_Linea,Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON CXP.CodCentro = B.Id_Centro
		WHERE CodCentro NOT IN (83, 191, 137) AND NombreCentro NOT LIKE 'CO-%' AND NombreCentro NOT LIKE 'JD-%'
		

		UNION ALL
		
		
		--LINEAS CON CENTROS NO COMPARTIDOS
		SELECT	Id						,Ano_Periodo			,Mes_Periodo				,FechaDeCorte	
			,IdEmpresa					,NombreEmpresa			,IdLinea = B.Sigla			,CodLinea = B.CodUnidadNegocio
			,NombreLinea = B.Linea		,CXP.CodCentro			,NombreCentro				,NombreSeccion				
			,IdTerceros 				,NombreTercero			,IdTerceros_Pagador 		,NombreTerceros_Pagador		
			,Tipo						,Valor
		FROM #TmpCF_StrCXP CXP
		LEFT JOIN (
			SELECT DISTINCT CodEmpresa ,CodCentro , Sigla, CodUnidadNegocio, NombreUnidadNegocio AS Linea 
			FROM [vw_UnidadDeNegocio] WHERE CodCentro = 137 AND CodUnidadNegocio = 418
		) B ON CXP.CodCentro = B.CodCentro AND CXP.IdEmpresa = B.CodEmpresa 
		WHERE CXP.CodCentro = 137

		
		UNION ALL


		--MITSUBISHI Y BYD POR ADUANAS Y MAYORISTA Centro 83 - BN CENTRO 191
		SELECT Id						,Ano_Periodo		,Mes_Periodo				,FechaDeCorte
			,IdEmpresa					,NombreEmpresa		,IdLinea					,CodLinea
			,NombreLinea				,CodCentro			,NombreCentro				,NombreSeccion
			,IdTerceros 				,NombreTercero		,IdTerceros_Pagador 		,NombreTerceros_Pagador
			,Tipo						,Valor
		FROM 
		(			
			--Informacion del Centro 83 (MIT-Bta Aduanas Repuestos)
			SELECT Id						,Ano_Periodo		,Mes_Periodo				,FechaDeCorte	
				,IdEmpresa					,NombreEmpresa		,CodCentro					,NombreCentro		
				,NombreSeccion				,IdTerceros 		,NombreTercero				,IdTerceros_Pagador 		
				,NombreTerceros_Pagador		,Tipo				,Valor
				,IdLinea = CASE WHEN B.Id_Linea	IS NOT NULL THEN B.Id_Linea ELSE 'MIT' END
				,CodLinea = CASE WHEN B.Cod_Linea IS NOT NULL THEN B.Cod_Linea ELSE 20 END
				,NombreLinea = CASE WHEN B.Linea IS NOT NULL THEN B.Linea ELSE 'MMC - MITSUBISHI' END		
			FROM #TmpCF_StrCXP CXP 
			LEFT JOIN (
				SELECT DISTINCT Id_Linea,Cod_Linea,Linea,Seccion FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
			) B ON CXP.NombreSeccion = B.Seccion
			WHERE CodCentro = 83 
				
			UNION ALL

			--Informacion del Centro 191 (BN-Bta-Pte Aranda Taller Independiente)
			SELECT Id						,Ano_Periodo		,Mes_Periodo				,FechaDeCorte	
				,IdEmpresa					,NombreEmpresa		,CodCentro					,NombreCentro		
				,NombreSeccion				,IdTerceros 		,NombreTercero				,IdTerceros_Pagador 		
				,NombreTerceros_Pagador		,Tipo				,Valor						,IdLinea = 'BN'
				,CodLinea = 20				,NombreLinea = 'BONAPARTE'		
			FROM #TmpCF_StrCXP CXP 
			LEFT JOIN (
				SELECT DISTINCT Id_Linea,Cod_Linea,Linea,Seccion FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
			) B ON CXP.NombreSeccion = B.Seccion
			WHERE CodCentro = 191 
		) A

	
		UNION ALL


		--JD
		SELECT	Id						,Ano_Periodo		,Mes_Periodo				,FechaDeCorte	
			,IdEmpresa					,NombreEmpresa		,IdLinea = L.Id_Linea		,CodLinea		
			,NombreLinea = L.Linea		,CodCentro			,NombreCentro				,NombreSeccion				
			,IdTerceros 				,NombreTercero		,IdTerceros_Pagador 		,NombreTerceros_Pagador		
			,Tipo						,Valor
		FROM 
		(			
			SELECT *,	CodLinea = CASE WHEN IdTerceros IN (441634, 245933) THEN 410
							WHEN IdTerceros IN (245949) THEN 411
							WHEN IdTerceros IN (931248, 794428, 517951, 517941, 517912, 517941, 517972) THEN 520 
							WHEN CodCentro IN (25, 29, 43, 153) THEN 411
							WHEN CodCentro IN (26) THEN 520 ELSE 410 END
			FROM #TmpCF_StrCXP CXP
			WHERE NombreCentro LIKE 'JD-%' 
		) A
		LEFT JOIN (SELECT DISTINCT Cod_Linea, Id_Linea, Linea FROM v_CF_AgrupacionLinea) AS L ON L.Cod_Linea = A.CodLinea


		UNION ALL


		--COLISION
		SELECT	Id						,Ano_Periodo		,Mes_Periodo				,FechaDeCorte
			,IdEmpresa					,NombreEmpresa		,IdLinea = b.Id_Linea		,CodLinea
			,NombreLinea = B.Linea		,CodCentro			,NombreCentro				,NombreSeccion
			,IdTerceros 				,NombreTercero		,IdTerceros_Pagador 		,NombreTerceros_Pagador
			,Tipo						,Valor
		FROM 
		(
			SELECT *, CodLinea = CASE WHEN CodCentro IN (178,179) THEN 3 ELSE 5 END				
			FROM #TmpCF_StrCXP CXP 
			WHERE NombreCentro LIKE 'CO-%'
		) A
		INNER JOIN (
			SELECT DISTINCT Id_Linea, Cod_Linea, Linea FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON A.CodLinea = B.Cod_Linea

	)A




	--Eliminar e Insertar la informacion en la tabla de cuentas por pagar del PSC
	DELETE FROM CF_CXP WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
	INSERT INTO CF_CXP SELECT * FROM #TmpCF_CXP

END

```
