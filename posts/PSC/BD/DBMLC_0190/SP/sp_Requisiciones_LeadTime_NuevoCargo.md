# Stored Procedure: sp_Requisiciones_LeadTime_NuevoCargo

## Usa los objetos:
- [[Requisiciones_EstadoNuevoCargo]]
- [[Requisiciones_HistoricoNuevoCargo]]
- [[v_Requisiciones_DatosNuevoCargo]]
- [[vw_DiasFestivos]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_LeadTime_NuevoCargo]
(
	@AnoPeriodo int, 
	@MesInicial int,
	@MesFinal int
) AS

BEGIN
	--DECLARE @AnoPeriodo int, @MesInicial int, @MesFinal int
	--SET @AnoPeriodo = 2022
	--SET @MesInicial = 1
	--SET @MesFinal = 5

	SELECT Año=YEAR(FechaSolicitud),Mes=MONTH(FechaSolicitud),IdCargoNuevo,NombreNuevoCargo,Unidad_Negocio,NombreUnidadNegocio,FechaSolicitud,FechaCargoRechazado,
		DiasCargoRechazado,FechaAceptadoGerente,DiasAceptadoGerente,FechaAceptadoGestionHumana,DiasAceptadoGestionHumana,FechaCargoCreadoNomina,DiasCargoCreadoNomina,
		TotalDias=(DiasCargoRechazado+DiasAceptadoGerente+DiasAceptadoGestionHumana+DiasCargoCreadoNomina),
		TiempoAreaSolicitante=(DiasAceptadoGerente),
		TiempoAreaGestionHumana=(DiasAceptadoGestionHumana),
		TiempoAreaNomina=(DiasCargoCreadoNomina)
	FROM
	(
		SELECT IdCargoNuevo, NombreNuevoCargo, Unidad_Negocio, NombreUnidadNegocio, FechaSolicitud,FechaCargoRechazado=ISNULL(CONVERT(varchar,FechaCargoRechazado,20),''),
			FechaAceptadoGerente=ISNULL(CONVERT(varchar,FechaAceptadoGerente,20),''),FechaAceptadoGestionHumana=ISNULL(CONVERT(varchar,FechaAceptadoGestionHumana,20),''),
			FechaCargoCreadoNomina=ISNULL(CONVERT(varchar,FechaCargoCreadoNomina,20),''),
	
			CASE WHEN ISNULL(DiasCargoRechazado,0) < 0 THEN 0 ELSE ISNULL(DiasCargoRechazado,0) END DiasCargoRechazado,
			CASE WHEN ISNULL(DiasAceptadoGerente,0) < 0 THEN 0 ELSE ISNULL(DiasAceptadoGerente,0) END DiasAceptadoGerente,
			CASE WHEN ISNULL(DiasAceptadoGestionHumana,0) < 0 THEN 0 ELSE ISNULL(DiasAceptadoGestionHumana,0) END DiasAceptadoGestionHumana,
			CASE WHEN ISNULL(DiasCargoCreadoNomina,0) < 0 THEN 0 ELSE ISNULL(DiasCargoCreadoNomina,0) END DiasCargoCreadoNomina
		FROM
		(
			SELECT IdCargoNuevo, NombreNuevoCargo, Unidad_Negocio, NombreUnidadNegocio, FechaSolicitud,
	
				FechaCargoRechazado,
				DiasCargoRechazado = (DATEDIFF(DAY,FechaSolicitud,FechaCargoRechazado)
					- ((SELECT  
						(SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) + 
						(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
						WHERE Fechafestivo >= FechaSolicitud
						AND Fechafestivo <= FechaCargoRechazado)) AS DiasInhabiles
						FROM  (
							SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCargoRechazado)/7-DATEDIFF(DAY, -6, FechaSolicitud)/7 AS Cant UNION
							SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCargoRechazado)/7-DATEDIFF(DAY, -5, FechaSolicitud)/7 AS Cant UNION
							SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCargoRechazado)/7-DATEDIFF(DAY, -4, FechaSolicitud)/7 AS Cant UNION
							SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCargoRechazado)/7-DATEDIFF(DAY, -3, FechaSolicitud)/7 AS Cant UNION
							SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCargoRechazado)/7-DATEDIFF(DAY, -2, FechaSolicitud)/7 AS Cant UNION
							SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCargoRechazado)/7-DATEDIFF(DAY, -1, FechaSolicitud)/7 AS Cant UNION
							SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCargoRechazado)/7-DATEDIFF(DAY,  0, FechaSolicitud)/7 AS Cant
						) F))),

				FechaAceptadoGerente,
				DiasAceptadoGerente = (DATEDIFF(DAY,FechaSolicitud,FechaAceptadoGerente)
					- ((SELECT  
						(SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) + 
						(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
						WHERE Fechafestivo >= FechaSolicitud
						AND Fechafestivo <= FechaAceptadoGerente)) AS DiasInhabiles
						FROM  (
							SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaAceptadoGerente)/7-DATEDIFF(DAY, -6, FechaSolicitud)/7 AS Cant UNION
							SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaAceptadoGerente)/7-DATEDIFF(DAY, -5, FechaSolicitud)/7 AS Cant UNION
							SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaAceptadoGerente)/7-DATEDIFF(DAY, -4, FechaSolicitud)/7 AS Cant UNION
							SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaAceptadoGerente)/7-DATEDIFF(DAY, -3, FechaSolicitud)/7 AS Cant UNION
							SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaAceptadoGerente)/7-DATEDIFF(DAY, -2, FechaSolicitud)/7 AS Cant UNION
							SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaAceptadoGerente)/7-DATEDIFF(DAY, -1, FechaSolicitud)/7 AS Cant UNION
							SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaAceptadoGerente)/7-DATEDIFF(DAY,  0, FechaSolicitud)/7 AS Cant
						) F))),

				FechaAceptadoGestionHumana,
				DiasAceptadoGestionHumana = (DATEDIFF(DAY,FechaAceptadoGerente,FechaAceptadoGestionHumana)
					- ((SELECT  
						(SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) + 
						(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
						WHERE Fechafestivo >= FechaAceptadoGerente
						AND Fechafestivo <= FechaAceptadoGestionHumana)) AS DiasInhabiles
						FROM  (
							SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY, -6, FechaAceptadoGerente)/7 AS Cant UNION
							SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY, -5, FechaAceptadoGerente)/7 AS Cant UNION
							SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY, -4, FechaAceptadoGerente)/7 AS Cant UNION
							SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY, -3, FechaAceptadoGerente)/7 AS Cant UNION
							SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY, -2, FechaAceptadoGerente)/7 AS Cant UNION
							SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY, -1, FechaAceptadoGerente)/7 AS Cant UNION
							SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaAceptadoGestionHumana)/7-DATEDIFF(DAY,  0, FechaAceptadoGerente)/7 AS Cant
						) F))),

				FechaCargoCreadoNomina,
				DiasCargoCreadoNomina = (DATEDIFF(DAY,FechaAceptadoGestionHumana,FechaCargoCreadoNomina)
					- ((SELECT  
						(SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) + 
						(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
						WHERE Fechafestivo >= FechaAceptadoGestionHumana
						AND Fechafestivo <= FechaCargoCreadoNomina)) AS DiasInhabiles
						FROM  (
							SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCargoCreadoNomina)/7-DATEDIFF(DAY, -6, FechaAceptadoGestionHumana)/7 AS Cant UNION
							SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCargoCreadoNomina)/7-DATEDIFF(DAY, -5, FechaAceptadoGestionHumana)/7 AS Cant UNION
							SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCargoCreadoNomina)/7-DATEDIFF(DAY, -4, FechaAceptadoGestionHumana)/7 AS Cant UNION
							SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCargoCreadoNomina)/7-DATEDIFF(DAY, -3, FechaAceptadoGestionHumana)/7 AS Cant UNION
							SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCargoCreadoNomina)/7-DATEDIFF(DAY, -2, FechaAceptadoGestionHumana)/7 AS Cant UNION
							SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCargoCreadoNomina)/7-DATEDIFF(DAY, -1, FechaAceptadoGestionHumana)/7 AS Cant UNION
							SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCargoCreadoNomina)/7-DATEDIFF(DAY,  0, FechaAceptadoGestionHumana)/7 AS Cant
						) F)))

			FROM
			(
				SELECT IdCargoNuevo, NombreNuevoCargo, Unidad_Negocio, NombreUnidadNegocio, FechaSolicitud=MAX(FechaSolicitud), FechaAceptadoGerente=MAX(FechaAceptadoGerente),
					FechaAceptadoGestionHumana=MAX(FechaAceptadoGestionHumana),FechaCargoCreadoNomina=MAX(FechaCargoCreadoNomina),FechaCargoRechazado=MAX(FechaCargoRechazado)
				FROM 
				(
					SELECT HC.IdCargoNuevo, DC.NombreNuevoCargo, DC.Unidad_Negocio, DC.NombreUnidadNegocio,
						CASE WHEN HC.IdEstadoCargo = 1 THEN HC.FechaModificacion END FechaSolicitud,
						CASE WHEN HC.IdEstadoCargo = 2 THEN HC.FechaModificacion END FechaAceptadoGerente,
						CASE WHEN HC.IdEstadoCargo = 3 THEN HC.FechaModificacion END FechaAceptadoGestionHumana,
						CASE WHEN HC.IdEstadoCargo = 4 THEN HC.FechaModificacion END FechaCargoCreadoNomina,
						CASE WHEN HC.IdEstadoCargo = 5 THEN HC.FechaModificacion END FechaCargoRechazado
					FROM Requisiciones_HistoricoNuevoCargo HC
					LEFT JOIN v_Requisiciones_DatosNuevoCargo DC ON HC.IdCargoNuevo = DC.IdNuevoCargo
					LEFT JOIN Requisiciones_EstadoNuevoCargo EC ON HC.IdEstadoCargo = EC.IdEstadoCargo
				) A
				GROUP BY IdCargoNuevo, NombreNuevoCargo, Unidad_Negocio, NombreUnidadNegocio
			)B
		)C
	)D
	WHERE YEAR(FechaSolicitud) = @AnoPeriodo
		AND MONTH(FechaSolicitud) >= @MesInicial
		AND MONTH(FechaSolicitud) <= @MesFinal

	ORDER BY IdCargoNuevo

END

```
