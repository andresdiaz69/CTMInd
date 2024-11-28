# View: vw_Terceros_Consolidado_Correos

## Usa los objetos:
- [[vw_Terceros_Correos]]

```sql

CREATE view  [dbo].[vw_Terceros_Consolidado_Correos] as
select t.PkfkTerceros PkTerceros,      t.Email email_principal, 
       cp.Email email_particular1,     cps.Email email_particular2,               
	   cf.email email_facturacion1,    cfs.email email_facturacion2,  
	   ct.email email_trabajo1,        cts.email email_trabajo2
	   
  from [DBMLC_0190].dbo.VW_Terceros_correos        t
  left join [DBMLC_0190].dbo.VW_Terceros_correos 	(NOLOCK)    cp on t.PkfkTerceros = cp.PkFkTerceros 
	                                                              and cp.orden  =1	
														          and cp.fkEmailTipos     = 1
  left join [DBMLC_0190].dbo.VW_Terceros_correos 	(NOLOCK)   cps on t.PkfkTerceros = cps.PkFkTerceros 
                                                                  and cps.orden =2
  												                  and cps.fkEmailTipos    = 1
  left join [DBMLC_0190].dbo.VW_Terceros_correos 	(NOLOCK)	cf on t.PkfkTerceros = cf.PkFkTerceros 
                                                                  and cf.orden  =1
  													              and cf.fkEmailTipos     = 3
  left join [DBMLC_0190].dbo.VW_Terceros_correos 	(NOLOCK)   cfs on t.PkfkTerceros = cfs.PkFkTerceros 
                                                                  and cfs.orden =2
													              and cfs.fkEmailTipos    = 3
  left join [DBMLC_0190].dbo.VW_Terceros_correos 	(NOLOCK)	ct on t.PkfkTerceros = ct.PkFkTerceros 
                                                                  and ct.orden  =1
													              and ct.fkEmailTipos     = 2
  left join [DBMLC_0190].dbo.VW_Terceros_correos 	(NOLOCK)   cts on t.PkfkTerceros = cts.PkFkTerceros 
	                                                              and cts.orden =2
														          and cts.fkEmailTipos     = 2
where t.principal =1
--and t.PkfkTerceros = '774692'

```
