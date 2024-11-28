# View: Vw_InchcapeTallerMecDaiMoHr

## Usa los objetos:
- [[spiga_InformaFacturacion]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerMecDaiMoHr as

select distinct year(FechaFactura) año,
       month(FechaFactura) mes,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion,
	   f.VIN,
	   IdCargoTipos,
	   f.IdTerceroFactura,
	   NombreTercero,
	   f.NombreMarcas,     
	   (convert(decimal(10,2),HorasFacturadas) / 100) hrs,
       cantidad = case    when HorasFacturadas           >= 0  then 1 
                          else -1 end
  from [PSCService_DB].dbo.spiga_InformaFacturacion    f
  left join [DBMLC_0190].dbo.UnidadDeNegocio           u    on f.IdEmpresas  = u.CodEmpresa 
                                                           and f.IdCentros   = u.CodCentro
                                                           and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3
   and IdCargoTipos not in ('S') 
   


 
```
