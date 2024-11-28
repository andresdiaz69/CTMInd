# View: Vw_InchcapeTallerDaiOtsabiertasRep

## Usa los objetos:
- [[spiga_ordenesdetrabajoabiertas]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerDaiOtsabiertasRep as

select distinct YEAR(FechaDeCorte) año,
	   month(FechaDeCorte) mes,
	   FechaFacturacion,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion, 	
	   NombreMarcas,
	   PrecioMedio
  from [PSCService_DB].dbo.spiga_ordenesdetrabajoabiertas      f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresas  = u.CodEmpresa 
                                                                 and f.IdCentros   = u.CodCentro
                                                                 and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3
    
```
