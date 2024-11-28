# View: v_gen_subtip_cie_nov

## Usa los objetos:
- [[gen_subtipodoc]]

```sql

CREATE VIEW [dbo].[v_gen_subtip_cie_nov]
AS
SELECT cod_sub, nom_sub, cod_tip
FROM dbo.gen_subtipodoc AS a WITH(NOLOCK)
WHERE (cod_tip = '850');

```
