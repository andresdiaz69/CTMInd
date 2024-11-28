# View: vw_ComisionesManualesNovedadesEmparejadas

## Usa los objetos:
- [[ComisionesManualesNovedades]]
- [[vw_ComisionesMaestrasManuales]]

```sql


CREATE view [com].[vw_ComisionesManualesNovedadesEmparejadas] 
as
select ISNULL(a.IdRegistro, 0) AS IdRegistro,
	   a.IdRangoMaestra,      a.IdEsquema,         a.IdComisionModelo,  a.CodigoEmpleado,    a.Ano_Periodo,       
	   a.Mes_Periodo,         a.ValorNovedad,      a.UserIdCreo,        a.FechaCreacion,     a.UserIdModifico,
	   a.FechaModificacion,   a.IdCriterio, 	   a.IdEje,             b.IdRegistro         IdRegistro2,
	   b.IdRangoMaestra       IdRangoMaestra2, 	   b.CodigoEmpleado     CodigoEmpleado2,     b.Ano_Periodo   
	   Ano_Periodo2,          b.Mes_Periodo        Mes_Periodo2,        b.ValorNovedad       ValorNovedad2,
	   b.UserIdCreo           UserIdCreo2,         b.FechaCreacion      FechaCreacion2,      b.UserIdModifico
	   UserIdModifico2,       b.FechaModificacion  FechaModificacion2,  b.IdCriterio         IdCriterio2,
	   b.IdEje                IdEje2

	from(SELECT    IdRegistro         ,cmm.IdEsquema       ,cmm.IdComisionModelo
				  ,IdRangoMaestra     ,CodigoEmpleado      ,Ano_Periodo      
				  ,Mes_Periodo		  ,ValorNovedad        ,UserIdCreo  
				  ,FechaCreacion      ,UserIdModifico      ,FechaModificacion
				  ,cmn.IdCriterio     ,IdEje
				  FROM com.ComisionesManualesNovedades cmn
				  join com.vw_ComisionesMaestrasManuales cmm on cmm.IdMaestra = cmn.IdRangoMaestra
					where IdEje =1 or IdEje is null)   a

			full outer join (SELECT    IdRegistro         ,cmm.IdEsquema       ,cmm.IdComisionModelo
									  ,IdRangoMaestra     ,CodigoEmpleado      ,Ano_Periodo      
									  ,Mes_Periodo		  ,ValorNovedad        ,UserIdCreo  
									  ,FechaCreacion      ,UserIdModifico      ,FechaModificacion
									  ,cmn.IdCriterio     ,IdEje
								  FROM com.ComisionesManualesNovedades cmn
									join com.vw_ComisionesMaestrasManuales cmm on cmm.IdMaestra = cmn.IdRangoMaestra
								  where IdEje =2)b on a.CodigoEmpleado = b.CodigoEmpleado
												  and a.IdRangoMaestra = b.IdRangoMaestra
												  and a.Ano_Periodo    = b.Ano_Periodo
												  and a.Mes_Periodo    = b.Mes_Periodo

```
