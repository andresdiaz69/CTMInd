# View: Vw_agendamiento_datos_clientes

## Usa los objetos:
- [[vw_Terceros_Correos]]
- [[vw_Terceros_Registro_Unico]]
- [[vw_Terceros_Telefonos]]

```sql
CREATE view Vw_agendamiento_datos_clientes as
select pkterceros, nifcif, nombre,apellido1,apellido2, tc.numero telefono,  
			   cp.email
  from dbo.vw_terceros_registro_unico (NOLOCK)	t                                                               
  left join dbo.VW_Terceros_Telefonos (NOLOCK)	tc on t.pkterceros = tc.PkFkTerceros 
	                                              and tc.principal  =1
  left join dbo.VW_Terceros_correos   (NOLOCK)  cp on t.pkterceros = cp.PkFkTerceros 
                             and cp.principal  =1
 where nifcif is not null

```
