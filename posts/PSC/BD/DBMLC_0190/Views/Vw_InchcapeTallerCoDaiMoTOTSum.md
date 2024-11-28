# View: Vw_InchcapeTallerCoDaiMoTOTSum

## Usa los objetos:
- [[spiga_InformaFacturacion]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerCoDaiMoTOTSum as

select distinct año=year(FechaFactura),
       mes=month(FechaFactura),
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
       ValorMO  = CONVERT(BIGINT,ISNULL(f.ImporteSUBBruto,0))  + CONVERT(BIGINT,ISNULL(f.ImporteSubAceptada,0)) -
	              CONVERT(BIGINT,ISNULL(f.DescuentoSUB,0)) ,           
       cantidad = case    when HorasFacturadas           >= 0  then 1 
                          else -1 end
  from [PSCService_DB].dbo.spiga_InformaFacturacion    f
  left join [DBMLC_0190].dbo.UnidadDeNegocio           u    on f.IdEmpresas  = u.CodEmpresa 
                                                           and f.IdCentros   = u.CodCentro
                                                           and f.IdSecciones = u.CodSeccion
 where ((CodUnidadNegocio    = 5 and NombreSeccion like '%PC%'    )or
        (CodUnidadNegocio    = 3 and NombreSeccion like '%colisi%')or
        f.IdSecciones in (1053))

```
