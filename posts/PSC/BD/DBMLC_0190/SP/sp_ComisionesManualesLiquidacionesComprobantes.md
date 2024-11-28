# Stored Procedure: sp_ComisionesManualesLiquidacionesComprobantes

## Usa los objetos:
- [[ComisionesEsquemasManuales]]
- [[ComisionesManualesLiquidacionesComprobantes]]

```sql

CREATE PROCEDURE [com].[sp_ComisionesManualesLiquidacionesComprobantes]   
    @Ano_Periodo smallint,
	@Mes_Periodo smallint

AS   

    SELECT cmld.* , cem.NombreEsquema
    FROM com.ComisionesManualesLiquidacionesComprobantes cmld 
	join com.ComisionesEsquemasManuales cem on cem.IdEsquema = cmld.IdEsquema 
    WHERE cmld.Ano_Periodo =  @Ano_Periodo AND cmld.Mes_Periodo = @Mes_Periodo

```
