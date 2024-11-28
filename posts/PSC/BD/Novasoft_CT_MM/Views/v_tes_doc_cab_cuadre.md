# View: v_tes_doc_cab_cuadre

## Usa los objetos:
- [[cxc_cliente]]
- [[gen_monedas]]
- [[gen_terceros]]
- [[tes_cabdoc]]
- [[tes_cuedoc]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_tes_doc_cab_cuadre]
AS
SELECT DISTINCT 
                      dbo.tes_cabdoc.ano_doc, dbo.tes_cabdoc.per_doc, dbo.tes_cabdoc.sub_tip, dbo.tes_cabdoc.num_doc, dbo.tes_cuedoc.cod_ter, 
                      dbo.tes_cabdoc.cliente, dbo.tes_cabdoc.ind_mp, dbo.cxc_cliente.nom_cli, dbo.gen_terceros.ter_nombre, dbo.gen_monedas.des_mon
FROM         dbo.tes_cabdoc WITH (NOLOCK) INNER JOIN
                      dbo.tes_cuedoc WITH (NOLOCK) ON dbo.tes_cabdoc.ano_doc = dbo.tes_cuedoc.ano_doc AND dbo.tes_cabdoc.per_doc = dbo.tes_cuedoc.per_doc AND 
                      dbo.tes_cabdoc.sub_tip = dbo.tes_cuedoc.sub_tip AND dbo.tes_cabdoc.num_doc = dbo.tes_cuedoc.num_doc INNER JOIN
                      dbo.cxc_cliente WITH (NOLOCK) ON dbo.tes_cuedoc.cod_cli = dbo.cxc_cliente.cod_cli INNER JOIN
                      dbo.gen_terceros WITH (NOLOCK) ON dbo.tes_cuedoc.cod_ter = dbo.gen_terceros.ter_nit INNER JOIN
                      dbo.gen_monedas WITH (NOLOCK) ON dbo.tes_cabdoc.ind_mp = dbo.gen_monedas.cod_mon AND dbo.cxc_cliente.tip_mon = dbo.gen_monedas.cod_mon

```
