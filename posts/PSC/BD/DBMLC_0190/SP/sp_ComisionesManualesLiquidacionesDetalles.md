# Stored Procedure: sp_ComisionesManualesLiquidacionesDetalles

## Usa los objetos:
- [[HitosManualesDetalles]]
- [[MatricesManualesDetalles]]
- [[RangosManualesDetalles]]
- [[RangosManualesVersiones]]
- [[sp_ComisionesManualesNovedadesExogenas]]
- [[VariablesManualesDetalles]]
- [[vw_ComisionesMaestrasManuales]]
- [[vw_ComisionesManualesEmpleados]]

```sql

CREATE PROCEDURE [com].[sp_ComisionesManualesLiquidacionesDetalles]   
    @Ano_Periodo smallint,
	@Mes_Periodo smallint,
	@IdComisionModelo smallint,
	@IdTipoExogena smallint

AS

SET NOCOUNT ON
	SET FMTONLY OFF
	
	CREATE TABLE #NovedadesExogenas (Idregistro int , IdRangoMaestra smallint   ,IdEsquema smallint   ,IdComisionModelo smallint   ,CodigoEmpleado bigint
      ,Ano_Periodo int   ,Mes_Periodo int   ,ValorNovedad decimal(18, 2)   ,UserIdCreo nvarchar(128)    ,FechaCreacion datetime
      ,UserIdModifico nvarchar(128)  ,FechaModificacion datetime   ,IdCriterio smallint   ,IdEje smallint   ,IdRegistro2 int
      ,IdRangoMaestra2 smallint   ,CodigoEmpleado2 bigint   ,Ano_Periodo2 smallint   ,Mes_Periodo2 smallint   ,ValorNovedad2 bigint
	  ,UserIdCreo2 nvarchar(128)   ,FechaCreacion2 datetime   ,UserIdModifico2 nvarchar(128)   ,FechaModificacion2 datetime
	  ,IdCriterio2 smallint   ,IdEje2 smallint)

	INSERT INTO #NovedadesExogenas
	EXEC	com.sp_ComisionesManualesNovedadesExogenas @Ano_Periodo, @Mes_Periodo, @IdComisionModelo, @IdTipoExogena

	SELECT ISNULL(ROW_NUMBER() OVER(ORDER BY Ano_Periodo, Mes_Periodo, cmn.CodigoEmpleado ASC), 0) AS IdConsecutivo,
       case when cmn.Ano_Periodo is null then cmn.Ano_Periodo2 else  cmn.Ano_Periodo end Ano_Periodo,      
       case when cmn.Mes_Periodo is null then cmn.Mes_Periodo2 else  cmn.Mes_Periodo end Mes_Periodo,
	   case when cmn.CodigoEmpleado is null then cmn.CodigoEmpleado2 else  cmn.CodigoEmpleado end CodigoEmpleado,
	   cme.NombreEmpleado,      cme.CodigoCargo,          cme.NombreCargo,       cmm.IdEsquema, 
	   cmm.NombreEsquema,       cmm.IdComisionModelo,     cmm.NombreModelo,      cmm.IdUnidadNegocio, 
	   cmm.NombreUnidadNegocio, cmm.DiaCorte,             cmm.IdCriterio,        cmm.NombreCriterio, 
	   cmm.IdCriterio2, 		cmm.NombreCriterio2,     
	   case when cmn.IdRangoMaestra is null then cmn.IdRangoMaestra2 else  cmn.IdRangoMaestra end IdRangoMaestra,
	   cmm.NombreMaestra,       cmm.IdTipoMaestra,     cmm.NombreTipoMaestra,    cmm.CodigoConcepto,
	   rmv.IdRangoVersion,    case when rmd.IdRangoDetalle is null    and hmd.IdHitoDetalle is null      and mmd.IdRangoDetalle is null      then  vmd.IdVariableDetalle
	                               when vmd.IdVariableDetalle is null and hmd.IdHitoDetalle is null      and mmd.IdRangoDetalle is null      then rmd.IdRangoDetalle 
							       when vmd.IdVariableDetalle is null and rmd.IdRangoDetalle is null     and mmd.IdRangoDetalle is null      then hmd.IdHitoDetalle
								   when vmd.IdVariableDetalle is null and rmd.IdRangoDetalle is null     and hmd.IdHitoDetalle is null       then mmd.IdRangoDetalle      
								   end IdDetalle,
	   rmv.ConsecutivoVersion, cmn.ValorNovedad       ValorNovedadCriterio1,     cmn.ValorNovedad2        ValorNovedadCriterio2,
							  case when rmd.Desde is null             and hmd.Desde is null              and mmd.DesdeCriterio1 is null      then vmd.Desde
	                               when vmd.Desde is null             and hmd.Desde is null              and mmd.DesdeCriterio1 is null      then rmd.Desde          
								   when vmd.Desde is null             and rmd.Desde is null              and mmd.DesdeCriterio1 is null      then hmd.Desde             
								   when vmd.Desde is null             and rmd.Desde is null              and hmd.Desde is null               then mmd.DesdeCriterio1 
								   end DesdeCriterio1,
							  case when rmd.Hasta is null             and hmd.Hasta is null              and mmd.HastaCriterio2 is null      then vmd.Hasta
								   when vmd.Hasta is null			  and hmd.Hasta is null              and mmd.HastaCriterio2 is null      then rmd.Hasta             
								   when vmd.Hasta is null			  and rmd.Hasta is null              and mmd.HastaCriterio2 is null      then hmd.Hasta             
								   when vmd.Hasta is null			  and rmd.Hasta is null              and hmd.Hasta is null               then mmd.HastaCriterio1             
								   end HastaCriterio1,
							  case when mmd.DesdeCriterio2  is not null  then mmd.DesdeCriterio2    end DesdeCriterio2,
							  case when mmd.HastaCriterio2 is not null   then mmd.HastaCriterio2    end HastaCriterio2,
							  case when rmd.Valor is null             and mmd.Valor is null         and hmd.IdhitoDetalle is null          and vmd.IdVariableDetalle is not null       then cmn.ValorNovedad     
								   when rmd.Valor is null             and mmd.Valor is null         and hmd.IdhitoDetalle is not null      and vmd.IdVariableDetalle is null           then cmn.ValorNovedad     
								   when rmd.Valor is not null         and mmd.Valor is null			and cmm.NombreTipoMaestra = 'RANGO POR VARIABLE'                                   then (rmd.Valor * cmn.ValorNovedad) 
								   when rmd.Valor is not null         and mmd.Valor is null			and cmm.NombreTipoMaestra = 'RANGOS'                                               then rmd.Valor
								   when rmd.Valor is null             and mmd.Valor is not null		then mmd.Valor
							  end Comision, 
		cmm.Activa, cmm.Activar, cme.FechaRetiro					  
	  FROM #NovedadesExogenas as cmn 
	  join (select max(IdRangoVersion)IdRangoVersion, IdRangoMaestra, Max(ConsecutivoVersion)ConsecutivoVersion
			  from com.RangosManualesVersiones
			  group by IdRangoMaestra) rmv on rmv.IdRangoMaestra = cmn.IdRangoMaestra or rmv.IdRangoMaestra = cmn.IdRangoMaestra2

	  join com.vw_ComisionesMaestrasManuales cmm on  cmm.IdMaestra = cmn.IdRangoMaestra or cmm.IdMaestra = cmn.IdRangoMaestra2

	  left join com.RangosManualesDetalles rmd on rmd.IdRangoVersion = rmv.IdRangoVersion 
									  --cmm.IdTipoMaestra = 1 (Rangos) and	cmm.IdTipoMaestra = 5 (Rangos * valor)			
									  and (case when cmn.ValorNovedad  > 0 then cmn.ValorNovedad 
												else 0.01 end )  > Desde 
									  and cmn.ValorNovedad  <= Hasta 

	  left join com.VariablesManualesDetalles vmd on vmd.IdVariableVersion = rmv.IdRangoVersion
									  --cmm.IdTipoMaestra = 2 (Variables)

	  left join com.HitosManualesDetalles hmd on hmd.IdHitoVersion = rmv.IdRangoVersion
									  --cmm.IdTipoMaestra = 3 (Hitos)

	  left join com.MatricesManualesDetalles mmd on mmd.IdRangoVersion = rmv.IdRangoVersion
									  --cmm.IdTipoMaestra = 4 (Matrices)
									  and (case when cmn.ValorNovedad  > 0 then cmn.ValorNovedad 
												else 0.01 end )  > DesdeCriterio1   
									  and cmn.ValorNovedad  <=  HastaCriterio1 

									  and (case when cmn.ValorNovedad2  > 0 then cmn.ValorNovedad2 
												else 0.01 end )  > DesdeCriterio2   
									  and cmn.ValorNovedad2  <= HastaCriterio2 

	  join com.vw_ComisionesManualesEmpleados cme on cme.CodigoEmpleado = cmn.CodigoEmpleado

	 GROUP BY cmn.Ano_Periodo,       cmn.Mes_Periodo,         cmn.CodigoEmpleado,      cmn.IdRangoMaestra,    cmn.Ano_Periodo2,      
			  cmn.Mes_Periodo2,      cmn.CodigoEmpleado2,     rmv.ConsecutivoVersion,  cme.NombreEmpleado,    cme.CodigoCargo,
			  cme.NombreCargo,       cmm.IdEsquema,           cmm.NombreEsquema,       cmm.IdComisionModelo,  cmm.NombreModelo, 
			  cmm.IdUnidadNegocio,   cmm.NombreUnidadNegocio, cmm.DiaCorte,            cmm.IdCriterio,        cmm.NombreCriterio, 
			  cmm.IdCriterio2, 		 cmm.NombreCriterio2,	  cmn.IdRangoMaestra2,     rmd.Hasta,             cmm.IdTipoMaestra,     
			  cmm.NombreTipoMaestra, rmv.IdRangoVersion,      rmd.IdRangoDetalle,      vmd.IdVariableDetalle, hmd.IdHitoDetalle,    
			  cmm.NombreMaestra,     cmm.CodigoConcepto,      cmn.ValorNovedad,        rmd.Desde,             rmd.Valor,	           
			  vmd.Desde,             vmd.Hasta,				  hmd.Desde,               hmd.Hasta,      		  cmn.ValorNovedad2,    
			  mmd.DesdeCriterio1,    mmd.HastaCriterio1,      mmd.DesdeCriterio2,      mmd.HastaCriterio2,    mmd.Valor,    
			  mmd.IdRangoDetalle,    cmm.Activa,              cmm.Activar,             cme.FechaRetiro

	 DROP TABLE #NovedadesExogenas;

```
