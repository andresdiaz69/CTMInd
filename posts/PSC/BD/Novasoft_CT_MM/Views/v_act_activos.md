# View: v_act_activos

## Usa los objetos:
- [[act_activos]]

```sql

/* AYVEGA JULIO/2017 VISTA PARA LISTA DE AYUDA EN DOCUMENTOS SNR2017-0064 
   AYVEGA SEPTIEMBRE/2017 SRS2017- SE AGREGAN CAMPOS REQUERIDOS PARA LOS DOCUMENTOS*/
CREATE VIEW [dbo].[v_act_activos]
AS
SELECT cod_pla,+'Pla Fis: '+CASE WHEN pla_fis IS NULL THEN '0' ELSE RTRIM(LTRIM(pla_fis)) END+'- '+des_cor AS des_cor,cod_est,fec_asig,fec_adq,TIP_DEP
FROM act_activos WITH(NOLOCK);

```
