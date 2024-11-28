# Stored Procedure: sp_Descargos_InformeNomina

## Usa los objetos:
- [[Descargos_HistoricoSolicitud]]
- [[vw_Descargos_Solicitudes]]

```sql

CREATE PROC [dbo].[sp_Descargos_InformeNomina]
(
	@FechaInicial DATE,
	@FechaFinal DATE,
	@Estado BIT
) AS

BEGIN
	
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @FechaInicial DATE, @FechaFinal DATE, @Estado BIT;
	--SET @FechaInicial = '20230503'
	--SET @FechaFinal = '20230523'
	--SET @Estado = 1

	IF @Estado = 1
		BEGIN
			SELECT DISTINCT 
				IdDescargo,								IdEstado,							NombreEstado,						DetalleEstado,					
				FechaSolicitud,							DescripcionHechos,					CodigoFalta,						NombreFalta,				
				CodigoSancion,							NombreSancion,						Enfermedad,							PrePension,						
				CabezaFamilia,							Maternidad,							Convivencia,
				OtrosFueros,							DescOtrosFueros,					CodSAI,								CartaSancionFirmada,
				SancionDefitiva,						NombreSancionDefitiva,				FechaCierre=GETDATE(),				CodEstadoFinalizado=NULL,
				EstadoFinalizado=NULL,					CedulaEmpleado,						NombreEmpleado,						CodCargoEmpleado,
				NombreCargoEmpelado,					CodEmpresaEmpleado,					NombreEmpresaEmpleado,				CodUnidadEmpleado,
				NombreUnidadEmpleado,					CodCentroEmpleado,					NombreCentroEmpleado,				CodSeccionEmpleado,
				NombreSeccionEmpleado,					CodDepartamentoEmpleado,			NombreDepartamentoEmpleado,			IdSolicitante,
				CedulaSolicitante,						NombreSolicitante,					CodCargoSolicitante,				NombreCargoSolicitante,
				CodEmpresaSolicitante,					NombreEmpresaSolicitante,			CodUnidadSolicitante,				NombreUnidadSolicitante,
				CodCentroSolicitante,					NombreCentroSolicitante,			CodSeccionSolicitante,				NombreSeccionSolicitante,
				CodDepartamentoSolicitante,				NombreDepartamentoSolicitante,		Email
			FROM vw_Descargos_Solicitudes
			WHERE CONVERT(DATE,FechaSolicitud) BETWEEN @FechaInicial AND @FechaFinal 
				AND TipoEstado = 'Activo'
		END

	ELSE 
		BEGIN
			SELECT DISTINCT
				IdDescargo,								IdEstado,							NombreEstado,						DetalleEstado,	
				FechaSolicitud,							DescripcionHechos,					CodigoFalta,						NombreFalta,
				CodigoSancion,							NombreSancion,						Enfermedad,							PrePension,
				CabezaFamilia,							Maternidad,							Convivencia,
				OtrosFueros,							DescOtrosFueros,					CodSAI,								CartaSancionFirmada,
				SancionDefitiva,						NombreSancionDefitiva,				FechaCierre,						CodEstadoFinalizado,
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
				INNER JOIN Descargos_HistoricoSolicitud AS H ON H.IdSolicitud = S.IdDescargo 
															AND H.IdEstado = S.IdEstado		
				WHERE S.TipoEstado = 'Finalizado' 
			) A
			WHERE CONVERT(DATE,FechaCierre) BETWEEN @FechaInicial AND @FechaFinal 
		END

END

```
