# View: Vw_safarii_datos_terceros

## Usa los objetos:
- [[vw_Terceros_Direcciones]]
- [[vw_Terceros_Registro_Unico]]
- [[vw_Terceros_Telefonos]]

```sql
CREATE view Vw_safarii_datos_terceros as
select pkterceros,          nifcif,       nombre,  apellido1,  apellido2, 
       tc.numero telefono,  cp.provincia, ciudad,  direccion
	   
  from dbo.vw_terceros_registro_unico (NOLOCK)	t                                                               
  left join dbo.VW_Terceros_Telefonos (NOLOCK)	tc on t.pkterceros = tc.PkFkTerceros 
	                                              and tc.principal  =1
  left join dbo.VW_Terceros_direcciones (NOLOCK)  cp on t.pkterceros = cp.PkFkTerceros 
                                                    and cp.principal  =1
 where nifcif is not null



```
