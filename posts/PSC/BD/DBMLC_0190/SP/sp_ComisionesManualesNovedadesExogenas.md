# Stored Procedure: sp_ComisionesManualesNovedadesExogenas

## Usa los objetos:
- [[vw_ComisionesManualesExogenasTecnicos]]
- [[vw_ComisionesManualesNovedadesEmparejadas]]
- [[vw_ComisionesManualesVendedoresItinerantesBonaparte]]

```sql
CREATE PROCEDURE [com].[sp_ComisionesManualesNovedadesExogenas]   
    @Ano_Periodo smallint,
	@Mes_Periodo smallint,
	@IdComisionModelo smallint,
	@IdTipoExogena smallint

AS   

	IF @IdTipoExogena = 1
		select ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro, 
		cmne.IdRangoMaestra,      cmne.IdEsquema,         cmne.IdComisionModelo,   cmne.CodigoEmpleado,    cmne.Ano_Periodo,       
	    cmne.Mes_Periodo,         cmne.ValorNovedad,      cmne.UserIdCreo,         cmne.FechaCreacion,     cmne.UserIdModifico,
	    cmne.FechaModificacion,   cmne.IdCriterio, 	      cmne.IdEje,              cmne.IdRegistro2,	   cmne.IdRangoMaestra2, 	   
		cmne.CodigoEmpleado2,     cmne.Ano_Periodo2,      cmne.Mes_Periodo2,       cmne.ValorNovedad2,	   cmne.UserIdCreo2,
		cmne.FechaCreacion2,      cmne.UserIdModifico2,   cmne.FechaModificacion2, cmne.IdCriterio2,	   cmne.IdEje2
		from com.vw_ComisionesManualesNovedadesEmparejadas cmne
		where cmne.Ano_Periodo = @Ano_Periodo and cmne.Mes_Periodo = @Mes_Periodo and cmne.IdComisionModelo = @IdComisionModelo
	ELSE 
		IF @IdComisionModelo = 3 or @IdComisionModelo = 4
			select ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro, 
			cmet.IdRangoMaestra,      cmet.IdEsquema,         cmet.IdComisionModelo,   cmet.CodigoEmpleado,    
			cmet.Ano_Periodo,         cmet.Mes_Periodo,       cmet.UnidadesVendidas,   cmet.UserIdCreo,
			cmet.FechaCreacion,       cmet.UserIdModifico,    cmet.FechaModificacion,  cmet.IdCriterio, 
			cmet.IdEje,               cmet.IdRegistro2,       cmet.IdRangoMaestra2,    cmet.CodigoEmpleado2,
			cmet.Ano_Periodo2,   	  cmet.Mes_Periodo2,      cmet.ValorNovedad2,      cmet.UserIdCreo2,
			cmet.FechaCreacion2,      cmet.UserIdModifico2,   cmet.FechaModificacion2, cmet.IdCriterio2,
			cmet.IdEje2
			from com.vw_ComisionesManualesExogenasTecnicos cmet
			where cmet.Ano_Periodo = @Ano_Periodo and cmet.Mes_Periodo = @Mes_Periodo and cmet.IdComisionModelo = @IdComisionModelo

		IF @IdComisionModelo = 2
			select ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro, 
			cmet.IdRangoMaestra,      cmet.IdEsquema,         cmet.IdComisionModelo,   cmet.CodigoEmpleado,    
			cmet.Ano_Periodo,         cmet.Mes_Periodo,       cmet.UnidadesVendidas,   cmet.UserIdCreo,
			cmet.FechaCreacion,       cmet.UserIdModifico,    cmet.FechaModificacion,  cmet.IdCriterio, 
			cmet.IdEje,               cmet.IdRegistro2,       cmet.IdRangoMaestra2,    cmet.CodigoEmpleado2,
			cmet.Ano_Periodo2,   	  cmet.Mes_Periodo2,      cmet.ValorNovedad2,      cmet.UserIdCreo2,
			cmet.FechaCreacion2,      cmet.UserIdModifico2,   cmet.FechaModificacion2, cmet.IdCriterio2,
			cmet.IdEje2
			from com.vw_ComisionesManualesVendedoresItinerantesBonaparte cmet
			where cmet.Ano_Periodo = @Ano_Periodo and cmet.Mes_Periodo = @Mes_Periodo and cmet.IdComisionModelo = @IdComisionModelo
		

```
