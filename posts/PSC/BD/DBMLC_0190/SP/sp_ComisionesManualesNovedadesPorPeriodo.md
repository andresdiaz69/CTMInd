# Stored Procedure: sp_ComisionesManualesNovedadesPorPeriodo

## Usa los objetos:
- [[ComisionesManualesNovedades]]
- [[vw_ComisionesMaestrasManuales]]

```sql


CREATE PROCEDURE [com].[sp_ComisionesManualesNovedadesPorPeriodo]   
    @Ano_Periodo smallint,
	@Mes_Periodo smallint
AS   

    SELECT  ISNULL(ROW_NUMBER() OVER(ORDER BY IdRegistro, cmn.IdRangoMaestra, rmm.IdEsquema, CodigoEmpleado, Ano_Periodo, Mes_Periodo ASC), 0) AS Id,
			IdRegistro, cmn.IdRangoMaestra, rmm.IdEsquema, CodigoEmpleado, Ano_Periodo, Mes_Periodo,
			cmn.IdCriterio, ValorNovedad, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
    FROM ComisionesManualesNovedades cmn 
	join vw_ComisionesMaestrasManuales as rmm on rmm.IdMaestra = cmn.IdRangoMaestra
    WHERE cmn.Ano_Periodo =  @Ano_Periodo AND cmn.Mes_Periodo = @Mes_Periodo;  

```
