# Stored Procedure: sp_Requisiciones_Solicitudes_Informes_TipoSolicitud

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Estados]]
- [[Requisiciones_HistoricoSolicitud]]
- [[Requisiciones_Solicitudes]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_Solicitudes_Informes_TipoSolicitud] 
(
	@AñoPeriodo int, 
	@MesPeriodo int
) AS
BEGIN

--DECLARE @AñoPeriodo int, @MesPeriodo int
--SET @AñoPeriodo = 2020
--SET @MesPeriodo = 9

SELECT CargoGenerico, Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, SUM(Cantidad) AS Cantidad
FROM
(
	SELECT Año, Mes, CargoGenerico, CodigoUnidadNegocio, 
		CASE WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '1' THEN 'DAIMLER VC' 
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '2' THEN 'VOLKSWAGEN'
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '3' THEN 'DAIMLER PC'
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '4' THEN 'USC'
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '5' THEN 'CENTRO DE COLISION'		
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '7' THEN 'USADOS'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '12' THEN 'FORD'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '19' THEN 'RENAULT'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '20' THEN 'MITSUBISHI'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '22' THEN 'MAZDA'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '23' THEN 'BELLPI'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '245' THEN 'BYD'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '410' THEN 'JD AGRICOLA'	
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '411' THEN 'JD CONSTRUCCION'
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '417' THEN 'BONAPARTE'
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '418' THEN 'CENTRO DIGITAL'
			WHEN LTRIM(RTRIM(CodigoUnidadNegocio)) = '520' THEN 'WIRTGEN'
			ELSE LTRIM(RTRIM(UPPER(UnidadNegocio))) END AS UnidadNegocio, Tipo, Empresa, Cantidad
	FROM 
	(
		SELECT Año, Mes, CargoGenerico = 'ASESOR COMERCIAL', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio,	LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT NombreCargo = REPLACE(REPLACE(REPLACE(b.NombreCargo,' ','<>'),'><',''),'<>',' '), a.*
				FROM
				(
					SELECT IdSolicitud, IdEstado,
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
						CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
								WHEN Empresa = 'CASATORO' THEN 'CASATORO'
								WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
								WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
								WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
								WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
								ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) LIKE '%NUEVO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) 
					OR (RTRIM(LTRIM(Departamento)) LIKE '%USADO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
					OR (RTRIM(LTRIM(Departamento)) LIKE '%OCASI%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%' AND NombreCargo LIKE '%ASESOR COMERCIAL%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'COMERCIAL', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT NombreCargo = REPLACE(REPLACE(REPLACE(b.NombreCargo,' ','<>'),'><',''),'<>',' '), a.*
				FROM
				(
					SELECT IdSolicitud, IdEstado,
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
						CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
								WHEN Empresa = 'CASATORO' THEN 'CASATORO'
								WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
								WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
								WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
								WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
								ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) LIKE '%NUEVO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) 
					OR (RTRIM(LTRIM(Departamento)) LIKE '%USADO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
					OR (RTRIM(LTRIM(Departamento)) LIKE '%OCASI%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%' AND NombreCargo NOT LIKE '%ASESOR COMERCIAL%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		
		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'POSTVENTA', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT b.NombreCargo, a.*
				FROM
				(
					SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
							CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
								WHEN Empresa = 'CASATORO' THEN 'CASATORO'
								WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
								WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
								WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
								WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
								ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) LIKE '%TALLER MEC%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) OR 
					(RTRIM(LTRIM(Departamento)) LIKE '%TALLER COL%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) 
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'ADMINISTRATIVO', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT b.NombreCargo, a.*
				FROM
				(
					SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,	
						CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE RTRIM(LTRIM(Departamento)) LIKE '%ADMINIS%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74) 
					AND Empresa NOT LIKE '%BELLPI%' AND LTRIM(RTRIM(CodigoUnidadNegocio)) <> '418'	
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'REPUESTOS', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT b.NombreCargo, a.*
				FROM
				(
					SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
						CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) = 'REPUESTOS') AND NombreCargo NOT LIKE '%JEFE%' 
					AND A.CodigoCargo NOT IN (166,167,74)			
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'DIGITAL', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
					CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
						WHEN Empresa = 'CASATORO' THEN 'CASATORO'
						WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
						WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
						WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
						WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
						ELSE Empresa END AS Empresa
				FROM 
				(
					SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
						C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
						a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
					FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
					LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
					LEFT JOIN (--En busqueda
								SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
								FROM Requisiciones_HistoricoSolicitud 
								where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
					LEFT JOIN (--Autorizada Gerente de Linea
								SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
								FROM Requisiciones_HistoricoSolicitud 
								WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
				) A
				WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
					(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
			) A
			WHERE (Empresa LIKE '%BELLPI%' AND CodigoCargo NOT IN (166,167,74)) OR (LTRIM(RTRIM(CodigoUnidadNegocio)) = '418' AND CodigoCargo NOT IN (166,167,74))
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'PRACTICANTE UNIVERSITARIO', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
					CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
						WHEN Empresa = 'CASATORO' THEN 'CASATORO'
						WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
						WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
						WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
						WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
						ELSE Empresa END AS Empresa
				FROM 
				(
					SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
						C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
						a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
					FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
					LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
					LEFT JOIN (--En busqueda
								SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
								FROM Requisiciones_HistoricoSolicitud 
								where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
					LEFT JOIN (--Autorizada Gerente de Linea
								SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
								FROM Requisiciones_HistoricoSolicitud 
								WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
				) A
				WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
					(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
			) A
			WHERE CodigoCargo = 74
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'JEFATURA', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT b.NombreCargo, a.*
				FROM
				(
					SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
						CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)		
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (NombreCargo LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) OR (NombreCargo LIKE '%GERENTE%' AND A.CodigoCargo NOT IN (166,167,74))			
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

		UNION ALL

		SELECT Año, Mes, CargoGenerico = 'APRENDIZ SENA', CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, Count(*) AS Cantidad, CodigoUnidadNegocio, LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, Tipo, Empresa
			FROM
			(
				SELECT IdSolicitud, IdEstado, DiasHabiles = 0, 
						CASE WHEN FechaAuGteLinea IS NULL THEN 'RECLUTAMIENTO'
							WHEN FechaAuGteLinea IS NOT NULL THEN 'HDV' 
							ELSE NULL END AS Tipo, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento,
						CASE WHEN Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE Empresa END AS Empresa
					FROM 
					(
						SELECT GetEstados.Estado, a.IdSolicitud, a.IdEstado, a.FechaCreacion, b.IdEstado AS Busqueda, b. FechaModificacion AS FechaAuBusqueda,
							C.IdEstado AS GteLinea, C.FechaModificacion AS FechaAuGteLinea, UPPER(Empresa) AS Empresa,
							a.CodigoCargo, a.CodigoUnidadNegocio, a.UnidadNegocio, Departamento
						FROM (
								SELECT * FROM Requisiciones_Solicitudes 
								WHERE YEAR(FechaCreacion) = @AñoPeriodo AND MONTH(FechaCreacion) = @MesPeriodo
							) AS a
						LEFT JOIN Requisiciones_Estados AS GetEstados ON a.IdEstado = GetEstados.IdEstado
						LEFT JOIN (--En busqueda
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
						LEFT JOIN (--Autorizada Gerente de Linea
									SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
									FROM Requisiciones_HistoricoSolicitud 
									WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud		
					) A
					WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
						(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)
			) A
			WHERE CodigoCargo IN (166,167)
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
		) A
		GROUP BY Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa
	)A
)A
GROUP BY CargoGenerico, Año, Mes, CodigoUnidadNegocio, UnidadNegocio, Tipo, Empresa

END

```
