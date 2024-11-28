# View: v_ppe_disdoc

## Usa los objetos:
- [[ppe_activos]]
- [[ppe_cabdoc]]
- [[ppe_cuedoc]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ppe_disdoc]
AS
SELECT a.ano_doc, a.per_doc, a.sub_tip, a.tip_doc, a.num_doc, b.cod_pla, a.cod_suc, a.cod_cco, a.cod_cl1, a.cod_cl2, a.cod_cl3, b.cod_bod, c.cod_clas, b.cod_ter, c.cto_pes, a.fec_doc
FROM ppe_cabdoc a WITH (NOLOCK) INNER JOIN ppe_cuedoc b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
INNER JOIN ppe_activos c WITH (NOLOCK) ON b.cod_pla=c.cod_pla

```
