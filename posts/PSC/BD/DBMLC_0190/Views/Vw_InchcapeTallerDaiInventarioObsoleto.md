# View: Vw_InchcapeTallerDaiInventarioObsoleto

## Usa los objetos:
- [[spiga_inventariorepuestosdetallado]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerDaiInventarioObsoleto as

select * from (select distinct YEAR(FechaDeCorte) año,
	                  month(FechaDeCorte) mes,
					  u.CodUnidadNegocio,
					  UltFechaCompra=(case when FechaUltimaCompra IS NOT NULL then FechaUltimaCompra 
	                                  else FechaTraspasoTRE end),
                      UltFechaVenta =(case when  FechaUltimaVenta IS NOT NULL then FechaUltimaVenta 
	                                  else FechaTraspasoTRS end), 
				      u.NombreUnidadNegocio,
					  f.IdCentros,
					  u.NombreCentro,
					  f.IdSecciones,
					  u.NombreSeccion, 	
					  IdMR,
					  PrecioMedio
                 from [PSCService_DB].dbo.spiga_inventariorepuestosdetallado  f
                 left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresas  = u.CodEmpresa 
                                                                                and f.IdCentros   = u.CodCentro
                                                                                and f.IdSecciones = u.CodSeccion
                where u.CodUnidadNegocio = 3) bs
 where UltFechaCompra <= GETDATE() -365 
   and UltFechaVenta  <= GETDATE() -365 


 




 

```
