# View: Vw_InchcapeTallerMecDaiRepe

## Usa los objetos:
- [[spiga_EntradasATaller]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerMecDaiRepe as
select distinct año=year(FechaEntrada),
       mes=month(FechaEntrada),
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.IdSecciones,
	   u.NombreSeccion,
	   f.VIN,
	   IdCargoTipos
       
  from [PSCService_DB].dbo.spiga_EntradasATaller   f
  left join [DBMLC_0190].dbo.UnidadDeNegocio       U   on f.IdEmpresas  = u.CodEmpresa 
                                                      and f.IdCentros   = u.CodCentro
                                                      and f.IdSecciones = u.CodSeccion
 where u.CodUnidadNegocio = 3
   and trabajoRepetido    > 0
   and idtrabajoestados   ='F'

```
