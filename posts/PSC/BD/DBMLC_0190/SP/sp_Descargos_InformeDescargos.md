# Stored Procedure: sp_Descargos_InformeDescargos

## Usa los objetos:
- [[Descargos_HistoricoSolicitud]]
- [[vw_Descargos_Estados]]
- [[vw_Descargos_Solicitudes]]

```sql

CREATE PROC [dbo].[sp_Descargos_InformeDescargos]
(
	@TipoConsulta SMALLINT, 
	@FechaInicial DATE,	
	@FechaFinal DATE
) AS

BEGIN
	DECLARE --@TipoConsulta SMALLINT, @FechaInicial DATE,	@FechaFinal DATE,
		@Estado NVARCHAR(50)

	--SET @TipoConsulta = 0
	--SET @FechaInicial = '20230501'
	--SET @FechaFinal = '20230801'

	--ACTIVAS
	IF @TipoConsulta = 1
		BEGIN
			SELECT DISTINCT
				IdDescargo,								IdEstado,							NombreEstado,						DetalleEstado,					
				FechaSolicitud,							FechaCierre = NULL,					DescripcionHechos,					CodigoFalta,						
				NombreFalta,							CodigoSancion,						NombreSancion,						Enfermedad,							
				PrePension,								CabezaFamilia,						Maternidad,
				Convivencia,							OtrosFueros,						DescOtrosFueros,					CodSAI,				
				CartaSancionFirmada,					SancionDefitiva,					NombreSancionDefitiva,				CodEstadoFinalizado = NULL,
				EstadoFinalizado = NULL,				CedulaEmpleado,						NombreEmpleado,						CodCargoEmpleado,
				NombreCargoEmpelado,					CodEmpresaEmpleado,					NombreEmpresaEmpleado,				CodUnidadEmpleado,
				NombreUnidadEmpleado,					CodCentroEmpleado,					NombreCentroEmpleado,				CodSeccionEmpleado,
				NombreSeccionEmpleado,					CodDepartamentoEmpleado,			NombreDepartamentoEmpleado,			IdSolicitante,
				CedulaSolicitante,						NombreSolicitante,					CodCargoSolicitante,				NombreCargoSolicitante,
				CodEmpresaSolicitante,					NombreEmpresaSolicitante,			CodUnidadSolicitante,				NombreUnidadSolicitante,
				CodCentroSolicitante,					NombreCentroSolicitante,			CodSeccionSolicitante,				NombreSeccionSolicitante,
				CodDepartamentoSolicitante,				NombreDepartamentoSolicitante,		Email
			FROM vw_Descargos_Solicitudes S			
			WHERE S.TipoEstado = 'Activo' AND CONVERT(DATE,FechaSolicitud) BETWEEN @FechaInicial AND @FechaFinal
		END

	--FINALIZADAS
	ELSE IF @TipoConsulta = 2 
		BEGIN
			SELECT DISTINCT
				IdDescargo,								IdEstado,							NombreEstado,						DetalleEstado,					
				FechaSolicitud,							FechaCierre,						DescripcionHechos,					CodigoFalta,						
				NombreFalta,							CodigoSancion,						NombreSancion,						Enfermedad,							
				PrePension,								CabezaFamilia,						Maternidad,
				Convivencia,							OtrosFueros,						DescOtrosFueros,					CodSAI,
				CartaSancionFirmada,					SancionDefitiva,					NombreSancionDefitiva,				CodEstadoFinalizado,
				EstadoFinalizado,						CedulaEmpleado,						NombreEmpleado,						CodCargoEmpleado,
				NombreCargoEmpelado,					CodEmpresaEmpleado,					NombreEmpresaEmpleado,				CodUnidadEmpleado,
				NombreUnidadEmpleado,					CodCentroEmpleado,					NombreCentroEmpleado,				CodSeccionEmpleado,
				NombreSeccionEmpleado,					CodDepartamentoEmpleado,			NombreDepartamentoEmpleado,			IdSolicitante,
				CedulaSolicitante,						NombreSolicitante,					CodCargoSolicitante,				NombreCargoSolicitante,
				CodEmpresaSolicitante,					NombreEmpresaSolicitante,			CodUnidadSolicitante,				NombreUnidadSolicitante,
				CodCentroSolicitante,					NombreCentroSolicitante,			CodSeccionSolicitante,				NombreSeccionSolicitante,
				CodDepartamentoSolicitante,				NombreDepartamentoSolicitante,		Email
			FROM 
			(
				SELECT DISTINCT
					S.IdDescargo,								S.IdEstado,								S.NombreEstado,							S.DetalleEstado,					
					S.FechaSolicitud,							S.DescripcionHechos,					S.CodigoFalta,							S.NombreFalta,				
					S.CodigoSancion,							S.NombreSancion,						S.Enfermedad,							S.PrePension,						
					S.CabezaFamilia,							S.Maternidad,							S.Convivencia,
					S.OtrosFueros,								S.DescOtrosFueros,						S.CodSAI,								S.CartaSancionFirmada,
					S.SancionDefitiva,							S.NombreSancionDefitiva,				S.CedulaEmpleado,						S.NombreEmpleado,
					S.CodCargoEmpleado,							S.NombreCargoEmpelado,					S.CodEmpresaEmpleado,					S.NombreEmpresaEmpleado,
					S.CodUnidadEmpleado,						S.NombreUnidadEmpleado,					S.CodCentroEmpleado,					S.NombreCentroEmpleado,
					S.CodSeccionEmpleado,						S.NombreSeccionEmpleado,				S.CodDepartamentoEmpleado,				S.NombreDepartamentoEmpleado,
					S.IdSolicitante,							S.CedulaSolicitante,					S.NombreSolicitante,					S.CodCargoSolicitante,
					S.NombreCargoSolicitante,					S.CodEmpresaSolicitante,				S.NombreEmpresaSolicitante,				S.CodUnidadSolicitante,
					S.NombreUnidadSolicitante,					S.CodCentroSolicitante,					S.NombreCentroSolicitante,				S.CodSeccionSolicitante,
					S.NombreSeccionSolicitante,					S.CodDepartamentoSolicitante,			S.NombreDepartamentoSolicitante,		S.Email,
					H.FechaModificacion AS FechaCierre,
					CASE WHEN s.IdEstado = 12 THEN SancionDefitiva ELSE s.IdEstado END AS CodEstadoFinalizado,
					CASE WHEN s.IdEstado = 12 THEN NombreSancionDefitiva ELSE s.NombreEstado END AS EstadoFinalizado
				FROM vw_Descargos_Solicitudes S
				LEFT JOIN Descargos_HistoricoSolicitud AS H ON H.IdSolicitud = S.IdDescargo AND H.IdEstado = S.IdEstado		
				WHERE S.TipoEstado = 'Finalizado' AND CONVERT(DATE,FechaSolicitud) BETWEEN @FechaInicial AND @FechaFinal
			) A
		END

	ELSE
		BEGIN
			SELECT DISTINCT
				IdDescargo,								IdEstado,							NombreEstado,						DetalleEstado,					
				FechaSolicitud,							FechaCierre,						DescripcionHechos,					CodigoFalta,						
				NombreFalta,							CodigoSancion,						NombreSancion,						Enfermedad,							
				PrePension,								CabezaFamilia,						Maternidad,
				Convivencia,							OtrosFueros,						DescOtrosFueros,					CodSAI,
				CartaSancionFirmada,					SancionDefitiva,					NombreSancionDefitiva,				CodEstadoFinalizado,
				EstadoFinalizado,						CedulaEmpleado,						NombreEmpleado,						CodCargoEmpleado,
				NombreCargoEmpelado,					CodEmpresaEmpleado,					NombreEmpresaEmpleado,				CodUnidadEmpleado,
				NombreUnidadEmpleado,					CodCentroEmpleado,					NombreCentroEmpleado,				CodSeccionEmpleado,
				NombreSeccionEmpleado,					CodDepartamentoEmpleado,			NombreDepartamentoEmpleado,			IdSolicitante,
				CedulaSolicitante,						NombreSolicitante,					CodCargoSolicitante,				NombreCargoSolicitante,
				CodEmpresaSolicitante,					NombreEmpresaSolicitante,			CodUnidadSolicitante,				NombreUnidadSolicitante,
				CodCentroSolicitante,					NombreCentroSolicitante,			CodSeccionSolicitante,				NombreSeccionSolicitante,
				CodDepartamentoSolicitante,				NombreDepartamentoSolicitante,		Email
			FROM 
			(
				SELECT DISTINCT
					S.IdDescargo,								S.IdEstado,								S.NombreEstado,							S.DetalleEstado,					
					S.FechaSolicitud,							S.DescripcionHechos,					S.CodigoFalta,							S.NombreFalta,				
					S.CodigoSancion,							S.NombreSancion,						S.Enfermedad,							S.PrePension,						
					S.CabezaFamilia,							S.Maternidad,							S.Convivencia,
					S.OtrosFueros,								S.DescOtrosFueros,						S.CodSAI,								S.CartaSancionFirmada,
					S.SancionDefitiva,							S.NombreSancionDefitiva,				S.CedulaEmpleado,						S.NombreEmpleado,
					S.CodCargoEmpleado,							S.NombreCargoEmpelado,					S.CodEmpresaEmpleado,					S.NombreEmpresaEmpleado,
					S.CodUnidadEmpleado,						S.NombreUnidadEmpleado,					S.CodCentroEmpleado,					S.NombreCentroEmpleado,
					S.CodSeccionEmpleado,						S.NombreSeccionEmpleado,				S.CodDepartamentoEmpleado,				S.NombreDepartamentoEmpleado,
					S.IdSolicitante,							S.CedulaSolicitante,					S.NombreSolicitante,					S.CodCargoSolicitante,
					S.NombreCargoSolicitante,					S.CodEmpresaSolicitante,				S.NombreEmpresaSolicitante,				S.CodUnidadSolicitante,
					S.NombreUnidadSolicitante,					S.CodCentroSolicitante,					S.NombreCentroSolicitante,				S.CodSeccionSolicitante,
					S.NombreSeccionSolicitante,					S.CodDepartamentoSolicitante,			S.NombreDepartamentoSolicitante,		S.Email,
					H.FechaModificacion AS FechaCierre,
					CASE WHEN s.TipoEstado = 'Finalizado' THEN (CASE WHEN s.IdEstado = 12 THEN SancionDefitiva ELSE s.IdEstado END) ELSE NULL END AS CodEstadoFinalizado,
					CASE WHEN s.TipoEstado = 'Finalizado' THEN (CASE WHEN s.IdEstado = 12 THEN NombreSancionDefitiva ELSE s.NombreEstado END) ELSE NULL END AS EstadoFinalizado 
				FROM vw_Descargos_Solicitudes S	
				LEFT JOIN 
				(
					SELECT HS.* FROM Descargos_HistoricoSolicitud HS
					LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = HS.IdEstado
					WHERE E.TipoEstado = 'Finalizado'						
				) AS H ON H.IdSolicitud = S.IdDescargo AND H.IdEstado = S.IdEstado		
				WHERE CONVERT(DATE,FechaSolicitud) BETWEEN @FechaInicial AND @FechaFinal
			) A
		END
END

```