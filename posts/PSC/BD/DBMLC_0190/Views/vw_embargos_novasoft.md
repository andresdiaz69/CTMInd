# View: vw_embargos_novasoft

## Usa los objetos:
- [[gen_compania]]
- [[rhh_embargo]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[rhh_tbtipEmbargo]]
- [[v_rhh_Concep]]

```sql
CREATE view [dbo].[vw_embargos_novasoft] as
select a.Compañia,NombreCompañia=e.nom_cia,CodigoEmpleado=codigo,Nombres = r.nom_emp + ' ' + r.ap1_emp + ' ' + r.ap2_emp,
Consecutivo,TipoEmbargo=tip_emb,DescripcionTipoEmbargo=descripcion,Tipo,CodigoConcepto=a.Cod_con,NombreConcepto=d.nom_con,Porcentaje,

Valor =val_emb,

FechaInicial=FECHA_INICIAL,ValorEmbargo=VALOR_EMB,
Saldo,ValorDescontado=VALOR_DESCONTADO
from(
		select em.cod_cia AS COMPAÑIA, e.cod_emp AS CODIGO,e.sec_emb AS CONSECUTIVO, 
		case e.tip_emb when 1 then 'Agotar Saldo' when 2 then 'Indefinidamente' end as TIPO,
		e.cod_con AS COD_CON, e.pje_apl AS PORCENTAJE, 
		val_emb=isnull(e.val_emb,0),
		e.fec_ini AS FECHA_INICIAL,
		isnull(e.vlr_tot,0) AS VALOR_EMB, ISNULL(saldo,0) AS SALDO, sum(h.val_liq) as VALOR_DESCONTADO,e.tip_emb,b.descripcion
		from		[Novasoft_CT_MM].dbo.rhh_embargo e
		inner join	[Novasoft_CT_MM].dbo.rhh_liqhis h on h.cod_emp = e.cod_emp and h.cod_con=e.cod_con and h.sec_emb =e.sec_emb
		inner join	[Novasoft_CT_MM].dbo.rhh_emplea em on em.cod_emp=e.cod_emp
		left join	[Novasoft_CT_MM].dbo.rhh_tbtipEmbargo b on b.tip_emb = e.tip_emb
		where em.est_lab not in ('00','99') and
		e.can_desc is null and saldo>0
		group by em.cod_cia, e.cod_emp,e.sec_emb, e.cod_con, e.fec_ini,e.vlr_tot, saldo,e.pje_apl,e.tip_emb,e.val_emb,e.tip_emb,b.descripcion
		
		union all
		
		select em.cod_cia AS COMPAÑIA, e.cod_emp AS CODIGO,e.sec_emb AS CONSECUTIVO,
		case e.tip_emb when 1 then  'Agotar Saldo' when 2 then 'Indefinidamente' end as TIPO,
		e.cod_con AS COD_CON, e.pje_apl AS PORCENTAJE, 
		val_emb=isnull(e.val_emb,0),
		e.fec_ini AS FECHA_INICIAL,isnull(e.vlr_tot,0) AS Valor_Emb, ISNULL(saldo,0)  AS SALDO, sum(h.val_liq) as Valor_Descontado,e.tip_emb,b.descripcion
		from		[Novasoft_CT_MM].dbo.rhh_embargo e
		inner join	[Novasoft_CT_MM].dbo.rhh_liqhis h on h.cod_emp = e.cod_emp and h.cod_con=e.cod_con and h.sec_emb =e.sec_emb
		inner join	[Novasoft_CT_MM].dbo.rhh_emplea em on em.cod_emp=e.cod_emp
		left join	[Novasoft_CT_MM].dbo.rhh_tbtipEmbargo b on b.tip_emb = e.tip_emb
		where em.est_lab not in ('00','99') and
		e.can_desc is null and (saldo>=0 or saldo is null) 
		and e.ind_des=2
		group by em.cod_cia,e.cod_emp,e.sec_emb, e.cod_con, e.fec_ini,e.vlr_tot, saldo,e.pje_apl,e.tip_emb,e.val_emb,e.tip_emb,b.descripcion
) a left join [Novasoft_CT_MM].dbo.gen_compania	e	on	e.cod_cia = a.compañia
	left join [Novasoft_CT_MM].dbo.rhh_emplea	r	on	r.cod_emp = a.codigo
	left join [Novasoft_CT_MM].dbo.v_rhh_Concep	d	on	d.cod_con=a.cod_con 
--where codigo = '79158200'
--17





```
