# Stored Procedure: sp_ComisionesManualesNovedadesPorGrupoGerencial

## Usa los objetos:
- [[vw_ComisionesManualesLiquidacionesDetalles]]

```sql


CREATE PROCEDURE [com].[sp_ComisionesManualesNovedadesPorGrupoGerencial]   

    @IdUnidadNegocio int,
	@CodSeccion int

AS

SELECT	    ISNULL(ROW_NUMBER() OVER(ORDER BY Ano_Periodo, Mes_Periodo, CodigoEmpleado ASC), 0) AS Id,
			lp.Ano_Periodo, lp.Mes_Periodo, lp.CodigoEmpleado, lp.NombreEmpleado, lp.CodigoCargo, lp.NombreCargo,
			lp.IdEsquema, lp.NombreEsquema, lp.IdComisionModelo, lp.NombreModelo, lp.IdUnidadNegocio, lp.NombreUnidadNegocio,
			lp.DiaCorte, lp.IdCriterio, lp.NombreCriterio, lp.IdRangoMaestra, lp.NombreMaestra, lp.IdTipoMaestra, lp.NombreTipoMaestra,
			lp.CodigoConcepto, lp.IdRangoVersion, lp.ConsecutivoVersion, lp.IdDetalle, lp.ValorNovedadCriterio1, lp.DesdeCriterio1, lp.HastaCriterio1, lp.Comision

FROM		(select *, 
				SeccionGerenciaGeneral = case when IdUnidadNegocio in (22, 5, 12, 2, 6, 417) then 1179 -- Gerencia General Vehículos 1
										 when IdUnidadNegocio in (3, 1, 7, 20, 245, 19) then 1180 -- Gerencia General Vehículos A
										 when IdUnidadNegocio in (410, 411, 520, 14) then 551 -- Gerencia General Maquinaria (Ag & Co)
										 when IdUnidadNegocio in (700) then 1182 -- Gerencia General Mayorista VH Importados
										 when IdUnidadNegocio in (15, 418) then 655 -- Gerencia De Transformación
										 end
				from com.vw_ComisionesManualesLiquidacionesDetalles) lp

WHERE		lp.Ano_Periodo = (case when  MONTH(GETDATE()) = 1 then YEAR(GETDATE()) -1 else YEAR(GETDATE()) end)
			AND lp.Mes_Periodo = (case when  MONTH(GETDATE()) = 1 then 12 else  MONTH(GETDATE()) - 1 end)
			AND (case when @CodSeccion > 0 then lp.SeccionGerenciaGeneral else lp.IdUnidadNegocio end) 
					= (Case when @CodSeccion > 0 then @CodSeccion else @IdUnidadNegocio end) 

GROUP BY	lp.Ano_Periodo, lp.Mes_Periodo, lp.CodigoEmpleado, lp.NombreEmpleado, lp.CodigoCargo, lp.NombreCargo,
			lp.IdEsquema, lp.NombreEsquema, lp.IdComisionModelo, lp.NombreModelo, lp.IdUnidadNegocio, lp.NombreUnidadNegocio,
			lp.DiaCorte, lp.IdCriterio, lp.NombreCriterio, lp.IdRangoMaestra, lp.NombreMaestra, lp.IdTipoMaestra, lp.NombreTipoMaestra,
			lp.CodigoConcepto, lp.IdRangoVersion, lp.ConsecutivoVersion, lp.IdDetalle, lp.ValorNovedadCriterio1, lp.DesdeCriterio1, lp.HastaCriterio1, lp.Comision

```
