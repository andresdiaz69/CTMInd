# View: v_cie_anticipos

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_cabdoc]]
- [[cie_cuedoc]]

```sql

CREATE VIEW [dbo].[v_cie_anticipos]
AS

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,d.cod_alu,d.nom_alu,SUM(val_doc) AS saldo,'$'+CONVERT(varchar,SUM(val_doc))+' DE '+d.nom_alu AS descripcion,MAX(reg_doc) AS reg_doc,d.cod_fam
FROM cie_cabdoc AS a WITH(NOLOCK)
	INNER JOIN cie_cuedoc AS c WITH(NOLOCK) ON a.ano_doc=c.ano_doc AND a.per_doc=c.per_doc AND a.sub_tip=c.sub_tip AND a.num_doc=c.num_doc
	INNER JOIN cie_alumnos AS d WITH(NOLOCK) ON c.cod_alu=d.cod_alu
WHERE a.tip_doc='060' 
	AND (ano_ref='0' OR ano_ref IS NULL)
GROUP BY a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,d.cod_alu,d.nom_alu,d.cod_fam;

```
