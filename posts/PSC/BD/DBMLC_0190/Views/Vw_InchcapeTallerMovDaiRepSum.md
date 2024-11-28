# View: Vw_InchcapeTallerMovDaiRepSum

## Usa los objetos:
- [[spiga_REConsultaMovimientosDigital]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerMovDaiRepSum as
select distinct YEAR(FechaDocumento) año,
	   month(FechaDocumento) mes,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion,
	   f.VIN,
	   tipoCargoTaller,
	   f.idTerceros,
	   NombreTercero,
	   idMR,
	   f.descripcionMR,
	   f.Serie,
	   f.Numero,
	   f.IdAño,
	   f.IdReferencias,
	   f.Stock,
	   f.DescripcionTipoCompra,
	   DescripcionClasificacion1,
	   DescripcionClasificacion6,
       ValorRep =  CONVERT(BIGINT,ISNULL(f.Unidades,0))    *   CONVERT(BIGINT,ISNULL(f.Precio,0))     
  from [PSCService_DB].dbo.spiga_REConsultaMovimientosDigital  f
  left join UnidadDeNegocio                                    u  on f.IdEmpresas  = u.CodEmpresa 
                                                                 and f.IdCentros   = u.CodCentro
                                                                 and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3
   and idmovimientotipos = 'CM' 

  
```
