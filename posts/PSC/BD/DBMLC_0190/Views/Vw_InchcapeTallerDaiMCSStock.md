# View: Vw_InchcapeTallerDaiMCSStock

## Usa los objetos:
- [[spiga_InventarioRepuestosDetallado]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerDaiMCSStock as

select distinct YEAR(FechaDeCorte) año,
	   month(FechaDeCorte) mes,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion, 
	   idMR,
	   IdReferencias
  from [PSCService_DB].dbo.spiga_InventarioRepuestosDetallado  f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresas  = u.CodEmpresa 
                                                                 and f.IdCentros   = u.CodCentro
                                                                 and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3

```
