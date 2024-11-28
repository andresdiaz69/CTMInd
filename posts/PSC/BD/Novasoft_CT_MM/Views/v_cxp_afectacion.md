# View: v_cxp_afectacion

## Usa los objetos:
- [[cxp_afectacion]]
- [[gen_monedas]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_afectacion] 
AS

SELECT a.Cod_afe,RTRIM(a.Nom_afe)+'     MONEDA:'+ RTRIM(b.des_mon) AS nombre,a.tip_mon
FROM cxp_afectacion AS a WITH (NOLOCK) INNER JOIN gen_monedas AS b WITH (NOLOCK) ON A.tip_mon=B.cod_mon

```
