# View: v_ppe_activos

## Usa los objetos:
- [[ppe_activos]]

```sql

/* AYVEGA JULIO/2017 VISTA PARA LISTA DE AYUDA EN DOCUMENTOS SNR2017-0065 
   AYVEGA SEPTIEMBRE/2017 SRS2017- SE AGREGAN CAMPOS REQUERIDOS PARA LOS DOCUMENTOS
-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)*/
CREATE VIEW [dbo].[v_ppe_activos]
AS
SELECT cod_pla,+'Pla Fis: '+CASE WHEN pla_fis IS NULL THEN '0' ELSE RTRIM(LTRIM(pla_fis)) END+'- '+des_cor AS des_cor,cod_est,fec_asig,fec_adq,met_val,TIP_DEP,val_det
FROM ppe_activos WITH (NOLOCK);

```
