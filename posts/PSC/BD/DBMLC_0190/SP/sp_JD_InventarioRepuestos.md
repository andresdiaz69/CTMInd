# Stored Procedure: sp_JD_InventarioRepuestos

## Usa los objetos:
- [[JD_InventarioRepuestos]]
- [[PrecioRepuestosJDAgricola]]
- [[PrecioRepuestosJDCania]]
- [[PrecioRepuestosJDConstruccion]]
- [[spiga_StockRepuestos]]
- [[UnidadDeNegocio]]

```sql
CREATE PROC [dbo].[sp_JD_InventarioRepuestos]
(
	@FechaConsulta DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @FechaConsulta DATE
	--SET @FechaConsulta = '20210930'

	--VALIDACION TABLA TEMPORAL
	IF OBJECT_ID(N'tempdb.dbo.#tmpInventarioJD', N'U') IS NOT NULL
		DROP TABLE #tmpInventarioJD
		

	--CONSULTA GENERAL JD ÁGRICOLA, JD CONSTRUCCIÓN Y WIRTGEN
	SELECT	Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
		IdMR,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio,Stock

	INTO #tmpInventarioJD

	FROM 
	(
		SELECT CONVERT(INT, Ano_Periodo)Ano_Periodo, CONVERT(INT, Mes_Periodo)Mes_Periodo, CONVERT(SMALLINT,IdEmpresas)IdEmpresas, CONVERT(NVARCHAR,NombreEmpresa)NombreEmpresa,
			CONVERT(SMALLINT,IdMarcas)IdMarcas, CONVERT(NVARCHAR,NombreMarca)NombreMarca, CONVERT(SMALLINT,IdCentros)IdCentros, CONVERT(NVARCHAR,NombreCentro)NombreCentro,
			CONVERT(SMALLINT,IdSecciones)IdSecciones, CONVERT(NVARCHAR,NombreSeccion)NombreSeccion,CONVERT(NVARCHAR,IdReferencias)IdReferencias,
			CONVERT(NVARCHAR,IdClasificacion5)IdClasificacion5, CONVERT(NVARCHAR,DenominacionClasificacion5)DenominacionClasificacion5, 
			CONVERT(NVARCHAR,IdClasificacion6)IdClasificacion6, CONVERT(NVARCHAR,DenominacionClasificacion6)DenominacionClasificacion6,
			CONVERT(DECIMAL(22,8),PrecioMedio)PrecioMedio,CONVERT(DECIMAL(22,8),stock)Stock,CONVERT(NVARCHAR,IdMR)IdMR
		FROM
		(
			SELECT	Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
				CASE WHEN IdClasificacion5 IN ('4','5') THEN 'JOH' ELSE IdMR END AS IdMR,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,
				DenominacionClasificacion6,PrecioMedio,Stock
			FROM
			(
				--CLASIFICACION 5 Y 6 COMPLETA 
				SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
					IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio,stock,IdMR 
				FROM
				(
					SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
						CASE WHEN IdClasificacion6 in ('3','1','9') THEN '4'					
							WHEN IdClasificacion6 = '2' THEN '5'
							WHEN IdClasificacion6 = '5' THEN '7'
							WHEN IdClasificacion5 NOT IN ('4','5','6','7','10') THEN NULL
							ELSE IdClasificacion5 END AS IdClasificacion5,

						CASE WHEN IdClasificacion6 in ('3','1','9') THEN 'AGRÍCOLA'
							WHEN IdClasificacion6 = '2' THEN 'CONSTRUCCIÓN'
							WHEN IdClasificacion6 = '5' THEN 'WIRTGEN'
							WHEN IdClasificacion5 NOT IN ('4','5','6','7','10') THEN NULL
							ELSE DenominacionClasificacion5 END AS DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio,stock,IdMR
					FROM 
					(
						SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, CONVERT(smallint,CodigoMarca)IdMarcas, NombreMarca, IdCentros, NombreCentro, IdSecciones, 
							NombreSeccion,IdReferencias, PrecioMedio,stock,IdMR,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6
						FROM
						(
							SELECT i.Ano_Periodo,i.Mes_Periodo,i.IdEmpresas,CASE WHEN i.IdEmpresas=1 THEN 'CasaToro'  end NombreEmpresa,
								CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN  411
										WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 410
										WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
										WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 520
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 410
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 411
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN  520
										ELSE 410 END 'CodigoMarca',
								CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN 'JD Construccion' 
										WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 'JD Agricola'
										WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 'JD Construccion'
										WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 'JD Wirtgen'
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 'JD Agricola'
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 'JD Construccion'
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN 'JD Wirtgen'
										ELSE 'JD Agricola' END 'NombreMarca',
								i.IdCentros,n.nombrecentro,i.IdSecciones,n.nombreseccion,i.IdReferencias,i.IdClasificacion5,i.DenominacionClasificacion5,
								IdClasificacion6,i.DenominacionClasificacion6,i.PrecioMedio,i.stock,IdMR
							FROM [PSCService_DB].dbo.spiga_StockRepuestos i
							LEFT JOIN DBMLC_0190.dbo.UnidadDeNegocio n on i.IdEmpresas = n.CodEmpresa
							AND i.IdCentros = n.CodCentro
							AND i.IdSecciones = n.CodSeccion
							WHERE i.IdEmpresas = 1 AND i.IdCentros in (21,25,124,22,65,46,18,16,49,44,29,149,41,26)
								AND Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) AND FechaDeCorte >= '20190101'
								and IdClasificacion6 IN ('1','2','3','4','5','6','9','10') 
						)A 
					) A
				) A
				WHERE IdClasificacion5 IS NOT NULL
		
				UNION ALL

				----CLASIFICACION 6 COMPLETA Y 5 INCOMPLETA
				SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
					CASE WHEN IdClasificacion6 IN ('4','6')  THEN '4'					
						WHEN IdClasificacion6 = '10' THEN '7'
						WHEN IdClasificacion6 = '6' THEN '4'
						ELSE IdClasificacion5 END AS IdClasificacion5,

					CASE WHEN IdClasificacion6 IN ('4','6') THEN 'AGRÍCOLA'
						WHEN IdClasificacion6 = '10' THEN 'WIRTGEN'
						ELSE DenominacionClasificacion5 END AS DenominacionClasificacion5,
					IdClasificacion6,DenominacionClasificacion6,PrecioMedio,stock,IdMR
				FROM 
				(
					SELECT DISTINCT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
						CASE WHEN RefAgr.Referencia IS NOT NULL OR RefCania.PartNumber IS NOT NULL THEN '4' 			
							WHEN RefContr.Referencia IS NOT NULL THEN '5'
							ELSE IdClasificacion5 END AS IdClasificacion5,
						CASE WHEN RefAgr.Referencia IS NOT NULL OR RefCania.PartNumber IS NOT NULL THEN 'AGRÍCOLA'
							WHEN RefContr.Referencia IS NOT NULL THEN 'CONSTRUCCIÓN'
							ELSE DenominacionClasificacion5 END AS DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6, PrecioMedio,stock, IdMR
					FROM 
					(	
						SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
							IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio,stock,IdMR 
						FROM
						(
							SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
								CASE WHEN IdClasificacion6 in ('3','1','9') THEN '4'					
									WHEN IdClasificacion6 = '2' THEN '5'
									WHEN IdClasificacion6 = '5' THEN '7'
									WHEN IdClasificacion5 NOT IN ('4','5','6','7','10') THEN NULL
									ELSE IdClasificacion5 END AS IdClasificacion5,

								CASE WHEN IdClasificacion6 in ('3','1','9') THEN 'AGRÍCOLA'
									WHEN IdClasificacion6 = '2' THEN 'CONSTRUCCIÓN'
									WHEN IdClasificacion5 NOT IN ('4','5','6','7','10') THEN NULL
									ELSE DenominacionClasificacion5 END AS DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio,stock,IdMR
							FROM 
							(
								SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, CONVERT(smallint,CodigoMarca)IdMarcas, NombreMarca, IdCentros, NombreCentro, IdSecciones, 
									NombreSeccion,IdReferencias, PrecioMedio,stock,IdMR,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6
								FROM
								(
									SELECT i.Ano_Periodo,i.Mes_Periodo,i.IdEmpresas,CASE WHEN i.IdEmpresas=1 THEN 'CasaToro'  end NombreEmpresa,
										CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN  411
												WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 410
												WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
												WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 520
												WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 410
												WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 411
												WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN  520
												ELSE 410 END 'CodigoMarca',
										CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN 'JD Construccion' 
												WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 'JD Agricola'
												WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 'JD Construccion'
												WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 'JD Wirtgen'
												WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 'JD Agricola'
												WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 'JD Construccion'
												WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN 'JD Wirtgen'
												ELSE 'JD Agricola' END 'NombreMarca',
										i.IdCentros,n.nombrecentro,i.IdSecciones,n.nombreseccion,i.IdReferencias,i.IdClasificacion5,i.DenominacionClasificacion5,
										IdClasificacion6,i.DenominacionClasificacion6,i.PrecioMedio,i.stock,IdMR
									FROM [PSCService_DB].dbo.spiga_StockRepuestos i
									LEFT JOIN DBMLC_0190.dbo.UnidadDeNegocio n on i.IdEmpresas = n.CodEmpresa
									AND i.IdCentros = n.CodCentro
									AND i.IdSecciones = n.CodSeccion
									WHERE i.IdEmpresas = 1 AND i.IdCentros in (21,25,124,22,65,46,18,16,49,44,29,149,41,26)
										AND Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) AND FechaDeCorte >= '20190101'
										AND IdClasificacion6 IN ('1','2','3','4','5','6','9','10') 
								)A 
							) A
						)a
						WHERE IdClasificacion5 IS NULL
					)a
					LEFT JOIN 
					(
						SELECT * FROM PrecioRepuestosJDAgricola
						WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDAgricola WHERE FechaRegistro <= @FechaConsulta)
					) RefAgr on A.IdReferencias = RefAgr.Referencia

					LEFT JOIN 
					(
						SELECT * FROM PrecioRepuestosJDConstruccion
						WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDConstruccion WHERE FechaRegistro <= @FechaConsulta)
					) RefContr on A.IdReferencias = RefContr.Referencia

					LEFT JOIN 
					(
						SELECT * FROM PrecioRepuestosJDCania
						WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDCania WHERE FechaRegistro <= @FechaConsulta)
					) RefCania on A.IdReferencias = RefCania.PartNumber
				)A

				UNION ALL

				--CLASIFICACION 6 VACIA
				SELECT DISTINCT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
					CASE WHEN RefAgr.Referencia IS NOT NULL OR RefCania.PartNumber IS NOT NULL THEN '4' 			
						WHEN RefContr.Referencia IS NOT NULL THEN '5'
						ELSE IdClasificacion5 END AS IdClasificacion5,
					CASE WHEN RefAgr.Referencia IS NOT NULL OR RefCania.PartNumber IS NOT NULL THEN 'AGRÍCOLA'
						WHEN RefContr.Referencia IS NOT NULL THEN 'CONSTRUCCIÓN'
						ELSE DenominacionClasificacion5 END AS DenominacionClasificacion5,
					CASE WHEN RefAgr.Referencia IS NOT NULL THEN '1'
						WHEN RefCania.PartNumber IS NOT NULL THEN '3'
						WHEN RefContr.Referencia IS NOT NULL THEN '2'
						ELSE IdClasificacion6 END AS IdClasificacion6,
					CASE WHEN RefAgr.Referencia IS NOT NULL	THEN 'Agricola'		
						WHEN RefCania.PartNumber IS NOT NULL THEN 'Caña'
						WHEN RefContr.Referencia IS NOT NULL THEN 'Construccion'
						ELSE DenominacionClasificacion6 END AS DenominacionClasificacion6, PrecioMedio,stock, IdMR
				FROM 
				(	
					SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, CONVERT(smallint,CodigoMarca)IdMarcas, NombreMarca, IdCentros, NombreCentro, IdSecciones, 
						NombreSeccion,IdReferencias, PrecioMedio,stock,IdMR,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6
					FROM
					(
						SELECT i.Ano_Periodo,i.Mes_Periodo,i.IdEmpresas,CASE WHEN i.IdEmpresas=1 THEN 'CasaToro'  end NombreEmpresa,
							CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN  411
									WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 410
									WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
									WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 520
									WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 410
									WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 411
									WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN  520
									ELSE 410 END 'CodigoMarca',
							CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN 'JD Construccion' 
									WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 'JD Agricola'
									WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 'JD Construccion'
									WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 'JD Wirtgen'
									WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 'JD Agricola'
									WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 'JD Construccion'
									WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN 'JD Wirtgen'
									ELSE 'JD Agricola' END 'NombreMarca',
							i.IdCentros,n.nombrecentro,i.IdSecciones,n.nombreseccion,i.IdReferencias,i.IdClasificacion5,i.DenominacionClasificacion5,
							IdClasificacion6,i.DenominacionClasificacion6,i.PrecioMedio,i.stock,IdMR
						FROM [PSCService_DB].dbo.spiga_StockRepuestos i
						LEFT JOIN DBMLC_0190.dbo.UnidadDeNegocio n on i.IdEmpresas = n.CodEmpresa
						AND i.IdCentros = n.CodCentro
						AND i.IdSecciones = n.CodSeccion
						WHERE i.IdEmpresas = 1 AND i.IdCentros in (21,25,124,22,65,46,18,16,49,44,29,149,41,26)
							AND Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) AND FechaDeCorte >= '20190101'
							AND IdClasificacion6 IS NULL
					)A
				)A
				LEFT JOIN 
				(
					SELECT * FROM PrecioRepuestosJDAgricola
					WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDAgricola WHERE FechaRegistro <= @FechaConsulta)
				) RefAgr on A.IdReferencias = RefAgr.Referencia

				LEFT JOIN 
				(
					SELECT * FROM PrecioRepuestosJDConstruccion
					WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDConstruccion WHERE FechaRegistro <= @FechaConsulta)
				) RefContr on A.IdReferencias = RefContr.Referencia

				LEFT JOIN 
				(
					SELECT * FROM PrecioRepuestosJDCania
					WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDCania WHERE FechaRegistro <= @FechaConsulta)
				) RefCania on A.IdReferencias = RefCania.PartNumber


				UNION ALL

				--CLASIFICACION 6 NO VACIA PERO CON DATOS INCORRECTOS
				SELECT DISTINCT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
					CASE WHEN RefAgr.Referencia IS NOT NULL OR RefCania.PartNumber IS NOT NULL THEN '4' 			
						WHEN RefContr.Referencia IS NOT NULL THEN '5'
						ELSE IdClasificacion5 END AS IdClasificacion5,
					CASE WHEN RefAgr.Referencia IS NOT NULL OR RefCania.PartNumber IS NOT NULL THEN 'AGRÍCOLA'
						WHEN RefContr.Referencia IS NOT NULL THEN 'CONSTRUCCIÓN'
						ELSE DenominacionClasificacion5 END AS DenominacionClasificacion5,
					CASE WHEN RefAgr.Referencia IS NOT NULL THEN '1'
						WHEN RefCania.PartNumber IS NOT NULL THEN '3'
						WHEN RefContr.Referencia IS NOT NULL THEN '2'
						ELSE IdClasificacion6 END AS IdClasificacion6,
					CASE WHEN RefAgr.Referencia IS NOT NULL	THEN 'Agricola'		
						WHEN RefCania.PartNumber IS NOT NULL THEN 'Caña'
						WHEN RefContr.Referencia IS NOT NULL THEN 'Construccion'
						ELSE DenominacionClasificacion6 END AS DenominacionClasificacion6, PrecioMedio,stock, IdMR
				FROM 
				(	
					SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
						IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio,stock,IdMR 
					FROM
					(	
						SELECT Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,CONVERT(smallint,CodigoMarca)IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion,IdReferencias,
							IdClasificacion5,DenominacionClasificacion5,
							CASE WHEN IdClasificacion5 = '4' THEN '1'					
								WHEN IdClasificacion5 = '5' THEN '2'
								WHEN IdClasificacion5 = '7' THEN '5'
								ELSE IdClasificacion6 END AS IdClasificacion6,

							CASE WHEN IdClasificacion5 = '4' THEN 'Agricola'					
								WHEN IdClasificacion5 = '5' THEN 'Construccion'
								WHEN IdClasificacion5 = '7' THEN 'Wirtgen'
								ELSE DenominacionClasificacion6 END AS DenominacionClasificacion6,PrecioMedio,stock,IdMR
						FROM 
						(
							SELECT i.Ano_Periodo,i.Mes_Periodo,i.IdEmpresas,CASE WHEN i.IdEmpresas=1 THEN 'CasaToro'  end NombreEmpresa,
								CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN  411
										WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 410
										WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
										WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 520
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 410
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 411
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN  520
										ELSE 410 END 'CodigoMarca',
								CASE WHEN  denominacionclasificacion6 like '%Merchandising%' THEN 'JD Construccion' 
										WHEN  denominacionclasificacion6 like '%Lubricantes%'THEN 'JD Agricola'
										WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 'JD Construccion'
										WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 'JD Wirtgen'
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%AGR%'THEN 'JD Agricola'
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6 is null AND nombreseccion like '%CONS%'THEN 'JD Construccion'
										WHEN denominacionclasificacion5 is null AND denominacionclasificacion6  is null AND nombreseccion like '%WIR%'THEN 'JD Wirtgen'
										ELSE 'JD Agricola' END 'NombreMarca',
								i.IdCentros,n.nombrecentro,i.IdSecciones,n.nombreseccion,i.IdReferencias,i.IdClasificacion5,i.DenominacionClasificacion5,
								IdClasificacion6,i.DenominacionClasificacion6,i.PrecioMedio,i.stock,IdMR
							FROM [PSCService_DB].dbo.spiga_StockRepuestos i
							LEFT JOIN DBMLC_0190.dbo.UnidadDeNegocio n on i.IdEmpresas = n.CodEmpresa
							AND i.IdCentros = n.CodCentro
							AND i.IdSecciones = n.CodSeccion
							WHERE i.IdEmpresas = 1 AND i.IdCentros in (21,25,124,22,65,46,18,16,49,44,29,149,41,26)
								AND Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) AND FechaDeCorte >= '20190101'
								and IdClasificacion6 NOT IN ('1','2','3','4','5','6','9','10') and IdClasificacion6 IS NOT NULL
						)A
					) A
				)A
				LEFT JOIN 
				(
					SELECT * FROM PrecioRepuestosJDAgricola
					WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDAgricola WHERE FechaRegistro <= @FechaConsulta)
				) RefAgr on A.IdReferencias = RefAgr.Referencia

				LEFT JOIN 
				(
					SELECT * FROM PrecioRepuestosJDConstruccion
					WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDConstruccion WHERE FechaRegistro <= @FechaConsulta)
				) RefContr on A.IdReferencias = RefContr.Referencia

				LEFT JOIN 
				(
					SELECT * FROM PrecioRepuestosJDCania
					WHERE FechaRegistro = (SELECT FechaMaxima = MAX(FechaRegistro) FROM PrecioRepuestosJDCania WHERE FechaRegistro <= @FechaConsulta)
				) RefCania on A.IdReferencias = RefCania.PartNumber
			) A
		) A
	)A

	--ACTUALIZACIÓN DE DATOS
	IF OBJECT_ID (N'dbo.JD_InventarioRepuestos', N'U') IS NOT NULL
		BEGIN
			DELETE FROM dbo.JD_InventarioRepuestos WHERE  Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
			INSERT INTO dbo.JD_InventarioRepuestos SELECT * FROM #tmpInventarioJD
		END	
	ELSE
		BEGIN
			SELECT * INTO dbo.JD_InventarioRepuestos from #tmpInventarioJD
		END

	--ELIMINAR LAS TABLAS TEMPORALES
	IF OBJECT_ID(N'tempdb.dbo.#tmpInventarioJD', N'U') IS NOT NULL
		DROP TABLE #tmpInventarioJD
	
END 

```
