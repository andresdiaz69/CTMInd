# View: vw_VentaRepuestos_ClientesJD_terceros

## Usa los objetos:
- [[spiga_Terceros]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]

```sql
CREATE view [dbo].[vw_VentaRepuestos_ClientesJD_terceros] as
select distinct NifCif,   PkTerceros,    Nombre,       Apellido1,         Apellido2,     Celular,
	   Fijo,              Direccion,     Poblacion,	   Email,             EmailOtro,     tipoPersona
from (
		select distinct cant=row_number() over (partition by NIfCif order by email,celular desc),
             NifCif,       PkTerceros,    Nombre,             Apellido1,    Apellido2,     Celular,
		     Fijo,         Direccion,     Poblacion,	Email,        EmailOtro,     tipoPersona
       from (
				select distinct t.NifCif,   t.Nombre,           t.Apellido1, t.Apellido2,         
				case when len(f.Numero) = 10 and 
				f.Numero like '3%'  and f.FkTelefonoTipos = 3
							then f.Numero else null end Celular,
							
				case when len(f1.numero) <= 7 then f1.numero
	                     when f1.numero like '60%'then f1.numero
			             else null end Fijo,

				   isnull(d.FkCalleTipos,' ')    +' '+  isnull(d.NombreCalle,'')  +' '+   isnull(d.Numero,'')    +' '+  isnull(d.Complemento,'') Direccion,    
				   d.Poblacion,         m.Email,            o.email EmailOtro,        
				    t.PkTerceros,        case when t.FkTerceroClases = '1' then 'Natural'
				                              when t.FkTerceroClases = '2'    then 'Juridica'
					  						   end tipoPersona
              from [PSCService_DB].dbo.spiga_Terceros			        t
              left join [PSCService_DB].dbo.spiga_TercerosTelefonos	    f on t.PkTerceros = f.PkFkTerceros 		                                                  	
														                 and f.FechaBaja  is null	and f.FkTelefonoTipos in (2,3)
			  left join [PSCService_DB].dbo.spiga_TercerosTelefonos		f1 on t.PkTerceros = f1.PkFkTerceros 		                                                  	
														                 and f1.FechaBaja  is null	and f1.FkTelefonoTipos in (1,2)
              left join [PSCService_DB].dbo.spiga_TercerosCorreos	    m on t.PkTerceros = m.PkFkTerceros 
		                                                                 and m.Principal  = 1
              left join [PSCService_DB].dbo.spiga_TercerosCorreos	    o on t.PkTerceros = o.PkFkTerceros 
		                                                                 and o.Principal  = 0
              left join [PSCService_DB].dbo.spiga_TercerosDirecciones   d on t.PkTerceros = d.PkFkTerceros
		                                                                 and d.Principal  = 1
             where t.NifCif is not null
--and t.nifcif = '8600030201'
             )a 
    )b       
where cant = 1
--and nifcif = '8600030201'
--order by NifCif   ---

```
