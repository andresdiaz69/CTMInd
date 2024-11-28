# Stored Procedure: sp_Requisiciones_Solicitudes_Informes

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_HistoricoSolicitud]]
- [[Requisiciones_Solicitudes]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_Solicitudes_Informes]
(
	@AñoPeriodo int,
	@MesPeriodo int
)
AS 

BEGIN

--DECLARE @AñoPeriodo int, @MesPeriodo int
--SET @AñoPeriodo = 2020
--SET @MesPeriodo = 9

SELECT Año = @AñoPeriodo, Mes = @MesPeriodo, CargoGenerico, CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, SUM(Cantidad) AS Cantidad
FROM
(
	SELECT CargoGenerico, CodigoUnidadNegocio, 
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
			ELSE LTRIM(RTRIM(UPPER(UnidadNegocio))) END AS UnidadNegocio, EstadoSolcitud, Empresa, Cantidad
	FROM 
	(
		SELECT CargoGenerico = 'ASESOR COMERCIAL', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio, UnidadNegocio, Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, NombreCargo = REPLACE(REPLACE(REPLACE(b.NombreCargo,' ','<>'),'><',''),'<>',' '), 
					A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento,
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
						WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
						WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
						WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
						WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
						WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
						ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9, 12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) LIKE '%NUEVO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) 
					OR (RTRIM(LTRIM(Departamento)) LIKE '%USADO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
					OR (RTRIM(LTRIM(Departamento)) LIKE '%OCASI%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%' AND NombreCargo LIKE '%ASESOR COMERCIAL%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa
		
		UNION ALL

		SELECT CargoGenerico = 'COMERCIAL', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio, UnidadNegocio, Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, NombreCargo = REPLACE(REPLACE(REPLACE(b.NombreCargo,' ','<>'),'><',''),'<>',' '), 
					A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento,
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
						WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
						WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
						WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
						WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
						WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
						ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) LIKE '%NUEVO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) 
					OR (RTRIM(LTRIM(Departamento)) LIKE '%USADO%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
					OR (RTRIM(LTRIM(Departamento)) LIKE '%OCASI%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74))
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%' AND NombreCargo NOT LIKE '%ASESOR COMERCIAL%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa

		UNION ALL

		SELECT CargoGenerico = 'POSTVENTA', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, b.NombreCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Empresa, A.Departamento 
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Departamento, FechaFinal,
						CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) LIKE '%TALLER MEC%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) OR 
					(RTRIM(LTRIM(Departamento)) LIKE '%TALLER COL%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) 
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa

		UNION ALL

		SELECT CargoGenerico = 'ADMINISTRATIVO', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, b.NombreCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento,
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE RTRIM(LTRIM(Departamento)) LIKE '%ADMINIS%' AND NombreCargo NOT LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74) 
					AND Empresa NOT LIKE '%BELLPI%' AND LTRIM(RTRIM(CodigoUnidadNegocio)) <> '418'	
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa

		UNION ALL

		SELECT CargoGenerico = 'REPUESTOS', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, b.NombreCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento,
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (RTRIM(LTRIM(Departamento)) = 'REPUESTOS') AND NombreCargo NOT LIKE '%JEFE%' 
					AND A.CodigoCargo NOT IN (166,167,74)			
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa
		
		UNION ALL

		SELECT CargoGenerico = 'DIGITAL', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento,
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
			) A
			WHERE (Empresa LIKE '%BELLPI%' AND CodigoCargo NOT IN (166,167,74)) OR (LTRIM(RTRIM(CodigoUnidadNegocio)) = '418' AND CodigoCargo NOT IN (166,167,74))
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa

		UNION ALL

		SELECT CargoGenerico = 'PRACTICANTE UNIVERSITARIO', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento, 
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion 
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
			) A
			WHERE CodigoCargo = 74
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa

		UNION ALL

		SELECT CargoGenerico = 'JEFATURA', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, b.NombreCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento,
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion 
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion 
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
				LEFT JOIN Cargos AS b  ON A.CodigoCargo = b.CodigoCargo
				WHERE (NombreCargo LIKE '%JEFE%' AND A.CodigoCargo NOT IN (166,167,74)) OR (NombreCargo LIKE '%GERENTE%' AND A.CodigoCargo NOT IN (166,167,74))			
			) A
			WHERE NombreCargo NOT LIKE '%GERENTE%'
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa

		UNION ALL

		SELECT CargoGenerico = 'APRENDIZ SENA', CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa, Cantidad = SUM(Cantidad)
		FROM
		(
			SELECT Count(*) AS Cantidad, CodigoUnidadNegocio = LTRIM(RTRIM(CodigoUnidadNegocio)), 
				UnidadNegocio = LTRIM(RTRIM(UPPER(UnidadNegocio))), Empresa,
				CASE WHEN IdEstado IN (1,2,3,4,5,10) THEN 'PENDIENTES'
					WHEN IdEstado = 7 THEN 'FINALIZADAS'
					WHEN IdEstado IN (8,9,12) THEN 'CANCELADAS' ELSE 'NO SE ENCONTRARON SOLICITUDES' END AS EstadoSolcitud 
			FROM
			(
				SELECT A.IdSolicitud, A.TipoSolicitud, A.IdEstado, A.CodigoCargo, A.CodigoUnidadNegocio, A.UnidadNegocio, A.Departamento, 
					CASE WHEN A.Empresa like '%BONAPARTE%' THEN 'BONAPARTE' 
							WHEN A.Empresa = 'CASATORO' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%SABANA%' THEN 'CASATORO DE LA SABANA'
							WHEN A.Empresa LIKE '%ANDES%' THEN 'CASATORO DE LOS ANDES'
							WHEN A.Empresa = 'CASATORO S.A.' THEN 'CASATORO'
							WHEN A.Empresa LIKE '%MOTORES Y M%' THEN 'MOTORES Y MÁQUINAS'
							ELSE A.Empresa END AS Empresa
				FROM
				(
					SELECT DISTINCT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, CodigoUnidadNegocio, UnidadNegocio, Empresa, Departamento
					FROM 
					(
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(Empresa) AS Empresa, Departamento, 
							CASE WHEN FechaAuGteLinea IS NULL THEN CONVERT(date, FechaAuBusqueda)
								WHEN FechaAuGteLinea IS NOT NULL THEN CONVERT(date, FechaAuGteLinea)
								ELSE NULL END AS FechaFinal
						FROM 
						(
							SELECT a.*, b.IdEstado AS Busqueda, CONVERT(date, b.FechaModificacion) AS FechaAuBusqueda, C.IdEstado AS GteLinea, 
								CONVERT(date, C.FechaModificacion) AS FechaAuGteLinea
							FROM Requisiciones_Solicitudes AS a
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion 
										FROM Requisiciones_HistoricoSolicitud 
										where IdEstado = 2) AS b ON a.IdSolicitud = b.IdSolicitud
							LEFT JOIN (
										SELECT DISTINCT IdSolicitud, IdEstado, CONVERT(date, FechaModificacion) AS FechaModificacion 
										FROM Requisiciones_HistoricoSolicitud 
										WHERE IdEstado = 5) AS c ON a.IdSolicitud = c.IdSolicitud
							WHERE YEAR(A.FechaCreacion) = @AñoPeriodo AND MONTH(A.FechaCreacion) = @MesPeriodo
						) A
						WHERE (Busqueda IS NOT NULL AND GteLinea IS NULL AND YEAR(FechaAuBusqueda) = @AñoPeriodo AND MONTH(FechaAuBusqueda) = @MesPeriodo) OR 
							(GteLinea IS NOT NULL AND YEAR(FechaAuGteLinea) = @AñoPeriodo AND MONTH(FechaAuGteLinea) = @MesPeriodo)

						UNION ALL
		
						SELECT IdSolicitud, TipoSolicitud, IdEstado, CodigoCargo, LTRIM(RTRIM(UPPER(CodigoUnidadNegocio))) AS CodigoUnidadNegocio, 
							LTRIM(RTRIM(UPPER(UnidadNegocio))) AS UnidadNegocio, UPPER(A.Empresa) AS Empresa, Departamento, CONVERT(date, FechaModificacion) AS FechaFinal
						FROM Requisiciones_Solicitudes AS A
						WHERE IdEstado IN (9,12) AND YEAR(FechaModificacion) = @AñoPeriodo AND MONTH(FechaModificacion) = @MesPeriodo
					) A
				) A
			) A
			WHERE CodigoCargo IN (166,167)
			GROUP BY IdEstado, CodigoUnidadNegocio, UnidadNegocio, Empresa
		) A
		GROUP BY CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa
	) A
)A
GROUP BY CargoGenerico, CodigoUnidadNegocio, UnidadNegocio, EstadoSolcitud, Empresa
END

```
