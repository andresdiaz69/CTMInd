# Stored Procedure: sp_ComisionesManualesLiquidacionesGeneradas

## Usa los objetos:
- [[ComisionesManualesLiquidacionesDetalles]]
- [[vw_ComisionesEsquemasManuales]]

```sql
CREATE PROCEDURE [com].[sp_ComisionesManualesLiquidacionesGeneradas]   
    @Ano_Periodo smallint,
	@Mes_Periodo smallint

AS   
    SELECT IdRegistro       ,IdLiquidacion              ,Ano_Periodo           ,Mes_Periodo
      ,CodigoEmpleado       ,NombreEmpleado             ,CodigoCargo           ,NombreCargo
	  ,cmld.IdEsquema       ,cmld.NombreEsquema         ,cmld.IdComisionModelo ,cmld.NombreModelo
      ,cmld.IdUnidadNegocio ,cmld.NombreUnidadNegocio   ,cmld.DiaCorte         ,IdCriterio
      ,NombreCriterio       ,IdMaestra                  ,NombreMaestra         ,CodigoConcepto
      ,IdRangoVersion       ,ConsecutivoVersion         ,IdRangoDetalle        ,ValorNovedad
      ,Desde                ,Hasta                      ,Comision              ,IdCriterio2      
	  ,NombreCriterio2      ,ValorNovedadCriterio2      ,DesdeCriterio2        ,HastaCriterio2      
	  ,Anulada              ,cem.IdTipoEsquema          ,cem.NombreTipoEsquema
    FROM com.ComisionesManualesLiquidacionesDetalles cmld 
	join com.vw_ComisionesEsquemasManuales cem on cmld.IdEsquema = cem.IdEsquema
    WHERE cmld.Ano_Periodo = @Ano_Periodo AND cmld.Mes_Periodo = @Mes_Periodo

```
