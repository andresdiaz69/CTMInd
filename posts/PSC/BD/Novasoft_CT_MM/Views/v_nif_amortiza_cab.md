# View: v_nif_amortiza_cab

## Usa los objetos:
- [[gen_amortiza]]
- [[nif_cabdoc]]

```sql

CREATE VIEW [dbo].[v_nif_amortiza_cab] AS
SELECT DISTINCT cab.ano_doc, cab.per_doc, cab.tip_doc, cab.sub_tip, cab.num_doc
FROM nif_cabdoc AS cab WITH(NOLOCK)
	INNER JOIN gen_amortiza AS amo WITH(NOLOCK) ON cab.ano_doc=amo.ano_doc AND cab.per_doc=amo.per_doc AND cab.tip_doc=amo.tip_doc AND cab.sub_tip=amo.sub_tip AND cab.num_doc=amo.num_doc;

```
