# View: v_opr_servicios_nov

## Usa los objetos:
- [[inv_items]]
- [[opr_det_contratos]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_opr_servicios_nov]
AS
SELECT '%' AS cod_item,'TODOS' AS des_item,'%' AS num_cto,'%' AS sit_cli,'%' AS cod_cli
UNION ALL
SELECT	DISTINCT C.cod_item,I.des_item,num_cto,sit_cli,cod_cli
FROM	opr_det_contratos AS C WITH (NOLOCK) INNER JOIN inv_items AS I WITH (NOLOCK)
		ON C.cod_item = I.cod_item
WHERE	ind_opr in ('01','02','03','04');

```
