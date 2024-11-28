# View: Vw_InchcapeTallerMovDaiBouRepSum

## Usa los objetos:
- [[spiga_REConsultaMovimientosDigital]]
- [[UnidadDeNegocio]]

```sql
create view Vw_InchcapeTallerMovDaiBouRepSum as
select distinct YEAR(FechaFactura) año,
	   month(FechaFactura) mes,
	   FechaAlta,
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
       ValorRep =  CONVERT(BIGINT,ISNULL(f.Unidades,0))    *   CONVERT(BIGINT,ISNULL(f.Precio,0)),
	   ValorNet = (CONVERT(BIGINT,ISNULL(f.Unidades,0))    *   CONVERT(BIGINT,ISNULL(f.Precio,0)))  
	             -(CONVERT(BIGINT,ISNULL(f.Unidades,0))    *   CONVERT(BIGINT,ISNULL(f.Precio,0)) * 
				   CONVERT(decimal(10,2),ISNULL(f.DtoPorc,0)))
  from [PSCService_DB].dbo.spiga_REConsultaMovimientosDigital  f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresas  = u.CodEmpresa 
                                                                 and f.IdCentros   = u.CodCentro
                                                                 and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3
   and idmovimientotipos not in ('VIN','VINA','CM','TRE','TRS')
   and NombreSeccion like '%bouti%'

```
