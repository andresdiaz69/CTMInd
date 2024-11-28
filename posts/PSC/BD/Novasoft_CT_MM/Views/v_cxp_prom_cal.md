# View: v_cxp_prom_cal

## Usa los objetos:
- [[com_criterio]]
- [[cxp_califica]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_prom_cal]
AS
SELECT cxp_califica.*,com_criterio.peso_cri,
ROUND((cxp_califica.valor*com_criterio.peso_cri)/100 ,1) AS cal_def
FROM cxp_califica WITH (NOLOCK)
INNER JOIN com_criterio WITH (NOLOCK) 
ON cxp_califica.cod_met=com_criterio.cod_met and
cxp_califica.cod_cri=com_criterio.cod_cri

```
