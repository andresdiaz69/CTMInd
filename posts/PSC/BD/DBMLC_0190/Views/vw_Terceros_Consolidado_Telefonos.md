# View: vw_Terceros_Consolidado_Telefonos

## Usa los objetos:
- [[vw_Terceros_Telefonos]]

```sql

CREATE view [dbo].[vw_Terceros_Consolidado_Telefonos] as
select t.PkfkTerceros PkTerceros,      
       t.Numero TelPrincipal,       t.extension ExtPrincipal,      t.fkpaises PaisTelprincipal,     
       tf.Numero TelParticular1,    tf.extension partExt1,         tf.fkpaises partPais1,        
	   tfs.Numero TelParticular2,   tfs.extension partExt2,        tfs.fkpaises partPais2,      
	   tc.Numero celular1,          tc.extension   celExt1,  	   tc.fkpaises celPais1,		
	   tcs.Numero celular2,         tcs.extension   celExt2,   	   tcs.fkpaises celPais2,  
	   tt.Numero TelTrabajo1,       tt.extension traExt1,    	   tt.fkpaises traPaises1,      
	   tts.Numero TelTrabajo2,      tts.extension traExt2,   	   tts.fkpaises traPaises2
  from [DBMLC_0190].dbo.VW_Terceros_Telefonos        t
  left join [DBMLC_0190].dbo.VW_Terceros_Telefonos (NOLOCK)	   tc on t.PkfkTerceros = tc.PkFkTerceros 
  	                                                             and tc.orden  =1
  														         and tc.FkTelefonoTipos = 3
  left join [DBMLC_0190].dbo.VW_Terceros_Telefonos (NOLOCK)   tcs on t.PkfkTerceros = tcs.PkFkTerceros 
  	                                                             and tcs.orden =2
  														         and tcs.FkTelefonoTipos = 3
  left join [DBMLC_0190].dbo.VW_Terceros_Telefonos (NOLOCK)    tf on t.PkfkTerceros = tf.PkFkTerceros 
                                                                 and tf.orden  =1
  											                     and tf.FkTelefonoTipos  = 1
  left join [DBMLC_0190].dbo.VW_Terceros_Telefonos (NOLOCK)   tfs on t.PkfkTerceros = tfs.PkFkTerceros 
                                                                 and tfs.orden =2
  											                     and tfs.FkTelefonoTipos = 1
  left join [DBMLC_0190].dbo.VW_Terceros_Telefonos (NOLOCK)    tt on t.PkfkTerceros = tt.PkFkTerceros 
                                                                 and tt.orden  =1
  													             and tt.FkTelefonoTipos  = 2
  left join [DBMLC_0190].dbo.VW_Terceros_Telefonos (NOLOCK)   tts on t.PkfkTerceros = tts.PkFkTerceros 
  	                                                             and tts.orden =2
														         and tts.FkTelefonoTipos = 2

where t.principal =1
 -- and t.PkfkTerceros = '774692'

```
