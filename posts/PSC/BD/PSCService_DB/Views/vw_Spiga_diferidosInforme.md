# View: vw_Spiga_diferidosInforme

## Usa los objetos:
- [[AsientosDet]]
- [[Centros]]
- [[Marcas]]
- [[Periodificaciones]]
- [[PeriodificacionesAsientos]]
- [[PeriodificacionesDesglose]]
- [[PeriodificacionesTipos]]
- [[Secciones]]
- [[Terceros]]

```sql
create view vw_Spiga_diferidosInforme  as
select AñoPeriodificacion, MesInicio, PkFkEmpresas,PkPeriodificaciones_Iden,descripcion,FkMarcas,marca,FechaAlta, Importe, FkTerceros,  proveedor,
	   FkCentros_Desglose,Centro, FkDepartamentos_Desglose,FkSecciones_Desglose, seccion,  Periodos,FkContCtas_Contrapartida,
	   FkContCtas_Haber,PkPeriodificacionesDesglose_Iden,Porcentaje,sum(Amortizacion_acumulada)Amortizacion_acumulada,sum(saldo_inicial)saldo_inicial ,
	   sum(Amortizacion_año_Actual)Amortizacion_año_Actual,   sum(saldo_diferido_hoy)saldo_diferido_hoy,sum(pagado)pagado
  from (select AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden,p.FechaAlta, p.Importe, p.FkTerceros, 
	           ISNULL(t.Nombre,'')+' '+ISNULL(t.Apellido1,'')+' '+ISNULL(t.Apellido1,'') proveedor,  FkCentros_Desglose,
	           c.Nombre Centro, FkDepartamentos_Desglose,FkSecciones_Desglose,s.Descripcion seccion, pti.Periodos,pti.FkContCtas_Contrapartida,
			   pti.FkContCtas_Haber,pd.PkPeriodificacionesDesglose_Iden,pd.Porcentaje,Amortizacion_acumulada=0,saldo_inicial=0,
			   sum(ad.ImporteHaber*pd.Porcentaje) Amortizacion_año_Actual,       saldo_diferido_hoy=0,pagado=0	,
			   p.descripcion,pd.FkMarcas, mr.Nombre marca
          from [192.168.80.18].[DMS90280].[FI].[Periodificaciones]	p
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesDesglose] pd on pd.PkFkEmpresas =p.PkFkEmpresas
        											                              and pd.PkFKPeriodificaciones = p.PkPeriodificaciones_Iden
          LEFT join [192.168.80.18].[DMS90280].CM.Centros	c on c.PkCentros = pd.FkCentros_Desglose
		  left join [192.168.80.18].[DMS90280].cm.Marcas mr on mr.PkMarcas = pd.FkMarcas
          LEFT join [192.168.80.18].[DMS90280].CM.Secciones s on s.PkSecciones_Iden = pd.FkSecciones_Desglose 
								                             and s.FkDepartamentos  = pd.FkDepartamentos_Desglose 
          left join [192.168.80.18].[DMS90280].CM.Terceros t on t.PkTerceros = p.FkTerceros
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesTipos] pti  on pti.PkPeriodificacionesTipos_Iden = p.FkPeriodificacionesTipos
        											                             and pti.PkFkEmpresas = p.PkFkEmpresas
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesAsientos] pa on pa.PkFkEmpresas = p.PkFkEmpresas
        											                              and pa.PkFkPeriodificaciones = p.PkPeriodificaciones_Iden
          left join [192.168.80.18].[DMS90280].fi.AsientosDet ad on ad.PkFkEmpresas = p.PkFkEmpresas
        							                            and ad.FkTerceros = p.FkTerceros
        							                            and ad.PkFkAsientos = pa.FkAsientos_Periodificacion    
									                            AND ad.PkFkAñoAsiento = pa.FkAñoAsiento_Periodificacion
         where PkFkAñoAsiento = YEAR( GETDATE())
           and month(FechaValor) < month( GETDATE())
           --and p.PkFkEmpresas = 1
           --and p.MesInicio =2
           --and p.AñoPeriodificacion= 2024
           --and PkPeriodificaciones_Iden = 1340
         group by AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden, p.Importe, p.FkTerceros, pd.Porcentaje,
         	      t.Nombre,t.Apellido1,t.Apellido1,c.Nombre,s.Descripcion, FkCentros_Desglose, FkDepartamentos_Desglose,pd.PkPeriodificacionesDesglose_Iden,
				  FkSecciones_Desglose, pti.Periodos,pti.FkContCtas_Contrapartida, pti.FkContCtas_Haber,p.FechaAlta,
				  p.descripcion,pd.FkMarcas, mr.Nombre 
         union all

        select AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden,p.FechaAlta, p.Importe, p.FkTerceros, 
        	   ISNULL(t.Nombre,'')+' '+ISNULL(t.Apellido1,'')+' '+ISNULL(t.Apellido1,'') proveedor,  FkCentros_Desglose,
        	   c.Nombre Centro, FkDepartamentos_Desglose,FkSecciones_Desglose,s.Descripcion seccion, pti.Periodos,pti.FkContCtas_Contrapartida,
        	   pti.FkContCtas_Haber,pd.PkPeriodificacionesDesglose_Iden,pd.Porcentaje,sum(ad.ImporteHaber*pd.Porcentaje) Amortizacion_acumulada,
			   (p.Importe-isnull(sum(ad.ImporteHaber),0))*pd.Porcentaje saldo_inicial,  Amortizacion_año_Actual=0,saldo_diferido_hoy=0,pagado=0,
			   p.Descripcion,pd.FkMarcas, mr.Nombre marca
          from [192.168.80.18].[DMS90280].[FI].[Periodificaciones]	p
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesDesglose] pd on pd.PkFkEmpresas =p.PkFkEmpresas
        											                              and pd.PkFKPeriodificaciones = p.PkPeriodificaciones_Iden
          LEFT join [192.168.80.18].[DMS90280].CM.Centros	c on c.PkCentros = pd.FkCentros_Desglose
		  left join [192.168.80.18].[DMS90280].cm.Marcas mr on mr.PkMarcas = pd.FkMarcas
          LEFT join [192.168.80.18].[DMS90280].CM.Secciones s on s.PkSecciones_Iden = pd.FkSecciones_Desglose
          left join [192.168.80.18].[DMS90280].CM.Terceros t on t.PkTerceros = p.FkTerceros
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesTipos] pti  on pti.PkPeriodificacionesTipos_Iden = p.FkPeriodificacionesTipos
        																		 and pti.PkFkEmpresas = p.PkFkEmpresas
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesAsientos] pa on pa.PkFkEmpresas = p.PkFkEmpresas
        																		  and pa.PkFkPeriodificaciones = p.PkPeriodificaciones_Iden
          left join [192.168.80.18].[DMS90280].fi.AsientosDet	 ad on ad.PkFkEmpresas = p.PkFkEmpresas
        							                               and ad.FkTerceros = p.FkTerceros
        							                               and ad.PkFkAsientos = pa.FkAsientos_Periodificacion    
									                               AND ad.PkFkAñoAsiento = pa.FkAñoAsiento_Periodificacion
         where PkFkAñoAsiento < year(GETDATE())
           --and p.PkFkEmpresas = 1
     --      and p.MesInicio =12
     --      and p.AñoPeriodificacion= 2022
           --and PkPeriodificaciones_Iden = 185
		   --and FkCentros_Desglose = 185
         group by AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden, p.Importe, p.FkTerceros, pd.Porcentaje,
        	      t.Nombre,t.Apellido1,t.Apellido1,c.Nombre,s.Descripcion, FkCentros_Desglose, FkDepartamentos_Desglose,pd.PkPeriodificacionesDesglose_Iden,
				  FkSecciones_Desglose, pti.Periodos,pti.FkContCtas_Contrapartida, pti.FkContCtas_Haber,p.FechaAlta,
				  p.Descripcion,pd.FkMarcas, mr.Nombre --,ad.FkContCtas       
        
         union all
        
        select distinct AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden,p.FechaAlta, p.Importe, p.FkTerceros, 
        	   ISNULL(t.Nombre,'')+' '+ISNULL(t.Apellido1,'')+' '+ISNULL(t.Apellido1,'') proveedor,  FkCentros_Desglose,
        	   c.Nombre Centro, FkDepartamentos_Desglose,FkSecciones_Desglose,s.Descripcion seccion, pti.Periodos,pti.FkContCtas_Contrapartida,
        	   pti.FkContCtas_Haber,pd.PkPeriodificacionesDesglose_Iden,pd.Porcentaje,Amortizacion_acumulada=0,saldo_inicial=0,
			   Amortizacion_año_Actual=0,(p.Importe-isnull(sum(ad.ImporteHaber),0))*pd.Porcentaje saldo_diferido_hoy, sum(ad.ImporteHaber*pd.Porcentaje) pagado	  ,
			   p.Descripcion,pd.FkMarcas, mr.Nombre marca
        	  -- ,case when pti.FkContCtas_Contrapartida <>' 0' and PkFkAñoAsiento = min (PkFkAñoAsiento)then sum(ad.ImporteDebe)
        			--else 0 end AmortizacionAñoAnterior,
        		--(select sum(ad.ImporteDebe)  from fi.AsientosDet	 ad 
        		--  where ad.PkFkEmpresas = p.PkFkEmpresas
        	 --	    and ad.FkTerceros   = p.FkTerceros
        	 --	    and ad.PkFkAsientos = pa.FkAsientos_Periodificacion
        		--  group by ad.Referencia) prueba
          from [192.168.80.18].[DMS90280].[FI].[Periodificaciones]	p
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesDesglose] pd on pd.PkFkEmpresas =p.PkFkEmpresas
        																		  and pd.PkFKPeriodificaciones = p.PkPeriodificaciones_Iden
          LEFT join [192.168.80.18].[DMS90280].CM.Centros	c on c.PkCentros = pd.FkCentros_Desglose
		  left join [192.168.80.18].[DMS90280].cm.Marcas mr on mr.PkMarcas = pd.FkMarcas
          LEFT join [192.168.80.18].[DMS90280].CM.Secciones s on s.PkSecciones_Iden = pd.FkSecciones_Desglose
          left join [192.168.80.18].[DMS90280].CM.Terceros t on t.PkTerceros = p.FkTerceros
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesTipos] pti  on pti.PkPeriodificacionesTipos_Iden = p.FkPeriodificacionesTipos
        																		 and pti.PkFkEmpresas = p.PkFkEmpresas
          left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesAsientos] pa on pa.PkFkEmpresas = p.PkFkEmpresas
        																		  and pa.PkFkPeriodificaciones = p.PkPeriodificaciones_Iden
          left join [192.168.80.18].[DMS90280].fi.AsientosDet	 ad on ad.PkFkEmpresas = p.PkFkEmpresas
        														   and ad.FkTerceros = p.FkTerceros
        														   and ad.PkFkAsientos = pa.FkAsientos_Periodificacion        
																   AND ad.PkFkAñoAsiento = pa.FkAñoAsiento_Periodificacion
         where FechaValor < GETDATE()
           --and p.PkFkEmpresas = 1
           --and p.MesInicio =2
           --and p.AñoPeriodificacion= 2024
           --and PkPeriodificaciones_Iden = 56
         group by AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden, p.Importe, p.FkTerceros, pd.Porcentaje,
        	      t.Nombre,t.Apellido1,t.Apellido1,c.Nombre,s.Descripcion,  FkCentros_Desglose, FkDepartamentos_Desglose,pd.PkPeriodificacionesDesglose_Iden,
				  FkSecciones_Desglose, pti.Periodos,pti.FkContCtas_Contrapartida,  pti.FkContCtas_Haber,p.FechaAlta,
				  p.Descripcion,pd.FkMarcas, mr.Nombre 
	   )a
 --where PkFkEmpresas = 1
  -- and YEAR(FechaAlta) in (2025)
  -- and MesInicio =2
   --and AñoPeriodificacion= 2024
 -- and saldo_diferido_hoy >0
   --and sum(Amortizacion_acumulada) = sum(pagado)
   --and PkPeriodificaciones_Iden =185

 group by AñoPeriodificacion,MesInicio,PkFkEmpresas,PkPeriodificaciones_Iden,FechaAlta, Importe, FkTerceros, 
	      proveedor,  FkCentros_Desglose,Centro, FkDepartamentos_Desglose,FkSecciones_Desglose, seccion, 
	      Periodos,FkContCtas_Contrapartida,FkContCtas_Haber,Porcentaje,PkPeriodificacionesDesglose_Iden,
		  Descripcion,FkMarcas,marca

```
