# View: Vw_InchcapeTallerMecDaiCita

## Usa los objetos:
- [[spiga_OrdenesDeTrabajoCitasConOT]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerMecDaiCita as
select distinct año=year(FechaCita),
       mes=month(FechaCita),
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.IdCentros,
       u.NombreCentro,
	   f.VIN,IdCargoTipos,
	   NombreTercero
       
  from [PSCService_DB].dbo.spiga_OrdenesDeTrabajoCitasConOT  f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                 u  on f.IdEmpresas  = u.CodEmpresa 
                                                               and f.IdCentros   = u.CodCentro
 where u.CodUnidadNegocio = 3
   and FechaBaja      is null
;
```
