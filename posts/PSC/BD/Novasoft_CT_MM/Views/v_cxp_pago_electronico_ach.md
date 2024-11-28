# View: v_cxp_pago_electronico_ach

## Usa los objetos:
- [[cxp_provee]]
- [[gen_bancos]]
- [[v_tes_docum_std]]

```sql

CREATE VIEW [dbo].[v_cxp_pago_electronico_ach]
AS

SELECT '02'+(substring(LEFT(rtrim(p.provee)+space(15),15)+(RIGHT('000000000000000000'
			+ltrim(str(SUM(a.net_doc)*100,18,0)),18))
			+(LEFT(substring(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(rtrim(a.ter_nombre),'Ñ','N'),'.',' '),'&','Y'),'2','DOS'),'3','TRES'),1,22)
			+space(22),22))+LEFT(substring(b.cod_tra,1,9)+space(9),9)+(CASE p.tip_cta WHEN 1 THEN '32' WHEN 2 THEN '22' END)
			+LEFT(substring(p.cta_ban,1,17)+space(17),17)+substring(a.num_doc,1,9)+'-'+space(70)+'  '+space(40),1,205)) AS registro,a.ind_mp,a.usuario,
			a.ano_doc,a.per_doc,a.tip_doc,a.sub_tip,a.num_doc,a.cod_pro
FROM v_tes_docum_std AS a WITH (NOLOCK) 
	INNER JOIN cxp_provee AS p WITH (NOLOCK) ON a.cod_pro=p.provee
	INNER JOIN gen_bancos AS b WITH (NOLOCK) ON p.ban_ach = b.cod_ban
WHERE a.ind_pago=0 
	AND p.ind_pag=1 
	AND a.tip_doc IN ('141','160','310') 
	AND a.ach_control>0 
	AND a.cambio='0'
GROUP BY p.provee,a.ter_nombre,b.cod_tra,p.tip_cta,p.cta_ban,a.num_doc,a.ind_mp,a.usuario,a.ano_doc,a.per_doc,a.tip_doc,a.sub_tip,a.num_doc,a.cod_pro

```
