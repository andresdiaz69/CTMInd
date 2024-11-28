# View: v_ptv_lotes

## Usa los objetos:
- [[gen_cajas]]
- [[v_inv_lotes_listaayuda]]

```sql

-- 2020/01/23 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_lotes]
AS
SELECT        lot.cod_lote, lot.cod_item, lot.cod_bod,lot.cod_suc,lot.fec_ven,lot.ano_acu,caj1.cod_caj AS caja
FROM            dbo.v_inv_lotes_listaayuda AS lot WITH (NOLOCK) INNER JOIN
                         dbo.gen_cajas AS caj1 WITH (NOLOCK) ON lot.cod_bod = caj1.cod_bod

```
