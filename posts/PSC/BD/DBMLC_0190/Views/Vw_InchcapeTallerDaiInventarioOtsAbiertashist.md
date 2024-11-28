# View: Vw_InchcapeTallerDaiInventarioOtsAbiertashist

## Usa los objetos:
- [[spiga_InventarioRepuestosDetallado]]
- [[spiga_ordenesdetrabajoabiertas]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerDaiInventarioOtsAbiertashist as
select distinct YEAR(FechaDeCorte) año,
	   month(FechaDeCorte) mes,
	   FechaDeCorte fecha,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion, 
	   idMR NombreMarcas,
	   sum(CONVERT(BIGINT,ISNULL(f.PrecioMedio,0))    *   CONVERT(decimal(10,2),ISNULL(f.Stock,0))) valor
  from [PSCService_DB].dbo.spiga_InventarioRepuestosDetallado  f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresas  = u.CodEmpresa 
                                                                 and f.IdCentros   = u.CodCentro
                                                                 and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3

 group by FechaDeCorte,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion, 
	   idMR

union all

select distinct YEAR(FechaDeCorte) año,
	   month(FechaDeCorte) mes,
	   FechaFacturacion fecha,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion, 	
	   NombreMarcas,
	   PrecioMedio valor
  from [PSCService_DB].dbo.spiga_ordenesdetrabajoabiertas      f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresas  = u.CodEmpresa 
                                                                 and f.IdCentros   = u.CodCentro
                                                                 and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3 



```
