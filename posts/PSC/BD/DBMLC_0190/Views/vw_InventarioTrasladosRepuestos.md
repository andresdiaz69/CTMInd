# View: vw_InventarioTrasladosRepuestos

## Usa los objetos:
- [[spiga_RemisionesDeVentasSinFacturar]]
- [[spiga_StockRepuestos]]
- [[spiga_TrasladosDeRepuestosPendientes]]

```sql
CREATE view VW_InventarioTrasladosRepuestos as 

select distinct Ano_Periodo,       Mes_Periodo,
       IdEmpresas,                 IdCentros,
	   IdSecciones,                IdMR,
	   IdReferencias,              
	   PrecioMedio=sum(PrecioMedio*Stock),                ValorBruto =0,
	   Stock,                      unidades   =0 ,	  
	   ValorMedioMovimiento=0,
	   IdClasificacion1,           DenominacionClasificacion1,
	   Denominacionclasificacion5, Denominacionclasificacion6
  from PSCService_DB.dbo.spiga_StockRepuestos  ssr
 group by Ano_Periodo,			   Mes_Periodo,
       IdEmpresas,                 IdCentros,
	   IdSecciones,                IdMR,
	   IdReferencias,              Descripcion,	                
	   Stock,                      FechaUltimaCompra,         
	   FechaTraspasoTRE,     	   IdClasificacion1,     
	   DenominacionClasificacion1, Denominacionclasificacion5,
	   Denominacionclasificacion6

 union all

select distinct trp.Ano_Periodo,    trp.Mes_Periodo,
       trp.IdEmpresas_Entrada,      trp.IdCentros_Entrada,
	   trp.IdSecciones_Entrada,     trp.MR,
	   trp.Referencia,              
	   PrecioMedio = 0,             trp.ValorBruto,
	   Stock = 0,                   trp.Unidades,
	   ValorMedioMovimiento =0,
	   IdClasificacion1,            DenominacionClasificacion1,
	   Denominacionclasificacion5,  Denominacionclasificacion6 
  from PSCService_DB.dbo.spiga_TrasladosDeRepuestosPendientes trp 
 inner join (select distinct s.IdMR,            s.IdReferencias,
                    IdClasificacion1,            DenominacionClasificacion1,
				    IdClasificacion5,            s.DenominacionClasificacion5,
				    s.IdClasificacion6,          s.DenominacionClasificacion6,
				    IdCentros
		       from  PSCService_DB.dbo.spiga_StockRepuestos    s
			  where Ano_Periodo = year(GETDATE())
			    and Mes_Periodo = month(GETDATE()) ) ssr  on trp.Referencia        = ssr.IdReferencias
                                                         and trp.IdCentros_Entrada = ssr.IdCentros
 union all
select distinct srv.Ano_Periodo,      srv.Mes_Periodo,
       srv.PkFkEmpresas,             srv.PkFkCentros,
	   srv.IdSecciones,              srv.mr,
	   srv.idreferencias, 			 PrecioMedio = 0,    
	   ValorBruto =0,	             Stock = 0,                   
	   Unidades= 0, 				 ValorMedioMovimiento,
   	   IdClasificacion1,             DenominacionClasificacion1,
	   Denominacionclasificacion5,   Denominacionclasificacion6 
 from (select srv.Ano_Periodo,             srv.Mes_Periodo,
              srv.PkFkEmpresas,            srv.PkFkCentros,
           	  srv.IdSecciones,             srv.mr,
		      srv.idreferencias,           
			  ValorMedioMovimiento = sum(ValorMedioMovimiento)
         from [PSCService_DB].dbo.spiga_RemisionesDeVentasSinFacturar  srv
        where srv.PrefijoFactura  is null 
        group by srv.Ano_Periodo,             srv.Mes_Periodo,
                 srv.PkFkEmpresas,            srv.PkFkCentros,
				 srv.IdSecciones,             srv.mr,
				 srv.idreferencias) srv
        left join (select distinct s.IdMR,     s.IdReferencias,s.
                          IdClasificacion1,    s.DenominacionClasificacion1,
				          IdClasificacion5,    s.DenominacionClasificacion5,
				          s.IdClasificacion6,  s.DenominacionClasificacion6,
				          IdCentros
		             from PSCService_DB.dbo.spiga_StockRepuestos    s
			        where Ano_Periodo = year(GETDATE())
			          and Mes_Periodo = month(GETDATE()) ) ssr  on srv.IdReferencias   = ssr.IdReferencias
                                                               and srv.PkFkCentros     = ssr.IdCentros
					    					                   and srv.MR              = ssr.IdMR

```
