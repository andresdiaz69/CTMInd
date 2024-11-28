# View: v_nif_dian2006terceros

## Usa los objetos:
- [[gen_terceros]]
- [[nif_concepdian2006]]
- [[nif_datosdian2006]]
- [[nif_literdian2006]]

```sql

/*AYVEGA AGOSTO/2018 SNR2018-0151 SE HOMOLOGA FUNCIONALIDAD DE LOS MEDIOS CON LA CONTABILIDAD LOCAL*/
CREATE VIEW [dbo].[v_nif_dian2006terceros]
AS
SELECT d.cod_for, L.val_top AS top_min, d.nit_ter, d.raz_soc, SUM(d.pri_val) AS valor1
, SUM(d.seg_val) AS valor2, SUM(d.valor3) AS valor3, SUM(d.valor4) AS valor4, SUM(d.valor5) AS valor5
, SUM(d.valor6) AS valor6, SUM(d.valor7) AS valor7, SUM(d.valor8) AS valor8, SUM(d.valor9) AS valor9
, t.e_mail
FROM  dbo.nif_datosdian2006 AS d WITH (NOLOCK)
INNER JOIN dbo.nif_concepdian2006 AS c WITH (NOLOCK) ON d.cod_for = c.cod_for AND d.cod_con = c.cod_con  
INNER JOIN nif_literdian2006 AS L WITH (NOLOCK) ON C.cod_lit= L.cod_lit 
INNER JOIN dbo.gen_terceros AS T WITH (NOLOCK) ON d.nit_ter = T.ter_nit
GROUP BY d.cod_for, l.val_top, d.nit_ter, d.raz_soc, t.e_mail
HAVING (SUM(d.pri_val) >= l.val_top OR SUM(d.seg_val) >= l.val_top OR SUM(d.valor3) >= l.val_top
OR SUM(d.valor4) >= l.val_top OR SUM(d.valor5) >= l.val_top OR SUM(d.valor6) >= l.val_top
OR SUM(d.valor7) >= l.val_top OR SUM(d.valor8) >= l.val_top OR SUM(d.valor9) >= l.val_top)

```
