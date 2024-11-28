# View: vw_Spiga_Diferidos_Presupuesto

## Usa los objetos:
- [[AsientosDet]]
- [[Centros]]
- [[Marcas]]
- [[Periodificaciones]]
- [[PeriodificacionesAsientos]]
- [[PeriodificacionesDesglose]]
- [[PeriodificacionesTipos]]
- [[Terceros]]

```sql

CREATE view vw_Spiga_Diferidos_Presupuesto as
  select distinct AñoPeriodificacion,p.MesInicio,p.PkFkEmpresas,p.PkPeriodificaciones_Iden,p.FechaAlta, 
         p.Importe, p.FkTerceros, ISNULL(t.Nombre,'')+' '+ISNULL(t.Apellido1,'')+' '+ISNULL(t.Apellido1,'') proveedor, 
		 FkCentros_Desglose, c.Nombre Centro,  pti.Periodos,pti.FkContCtas_Contrapartida,
         pti.FkContCtas_Haber,pd.PkPeriodificacionesDesglose_Iden,pd.Porcentaje,FechaValor,
		 ad.importeDebe, p.Descripcion,pd.FkMarcas, mr.Nombre marca         
    from [192.168.80.18].[DMS90280].[FI].[Periodificaciones]	p
    left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesDesglose] pd on pd.PkFkEmpresas =p.PkFkEmpresas
    																	    and pd.PkFKPeriodificaciones = p.PkPeriodificaciones_Iden
    LEFT join [192.168.80.18].[DMS90280].CM.Centros	c on c.PkCentros = pd.FkCentros_Desglose
	left join [192.168.80.18].[DMS90280].cm.Marcas mr on mr.PkMarcas = pd.FkMarcas   
    left join [192.168.80.18].[DMS90280].CM.Terceros t on t.PkTerceros = p.FkTerceros
    left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesTipos] pti  on pti.PkPeriodificacionesTipos_Iden = p.FkPeriodificacionesTipos
    																	   and pti.PkFkEmpresas = p.PkFkEmpresas
    left join [192.168.80.18].[DMS90280].[FI].[PeriodificacionesAsientos] pa on pa.PkFkEmpresas = p.PkFkEmpresas
    																		and pa.PkFkPeriodificaciones = p.PkPeriodificaciones_Iden
    left join [192.168.80.18].[DMS90280].fi.AsientosDet ad on ad.PkFkEmpresas = p.PkFkEmpresas
       													  and ad.FkTerceros = p.FkTerceros
       													  and ad.PkFkAsientos = pa.FkAsientos_Periodificacion        
														  AND ad.PkFkAñoAsiento = pa.FkAñoAsiento_Periodificacion
   where --FechaValor < GETDATE()
      p.PkFkEmpresas = 1
     and year(FechaValor) >year(getdate())+1
	 and ImporteDebe >0
  
```
