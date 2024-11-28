# View: v_consulta_retirados

## Usa los objetos:
- [[rhh_hislab]]
- [[v_ultima_historia_laboral]]

```sql
create view [dbo].[v_consulta_retirados] as
select  l.num_sec,l.cod_con,h.nue_con,h.cod_emp,cod_cia,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cl4,cod_cl5,cod_cl6,cod_cl7,cod_car,
cod_ciu,cod_dep,cod_pai,l.fec_ini,fec_fin,cau_ret,fec_ret,res_ret,ret_liq,sal_bas,tip_con,tie_ded,tip_pag,
sec_car,cod_ins,cod_nov,tip_nov,cod_empleo,ind_nov,ind_con,fec_pba,Cla_nom,nom_con,nom_rem,nom_prm,
fec_nov,res_nom,fre_nom,ded_horas,val_hora,clasif_cat,fch_retro,Act_Pose,cod_area,
suc_SS,sal_ant_flex,por_flex,cod_CT,cod_mon,sal_MonExt,cod_CauPro,Cod_esc,Tip_Docente,cod_jus_ret,
ded_horasTot,fch_ajustesal
from	rhh_hislab					h
join	v_ultima_historia_laboral	l	on	h.cod_emp = l.cod_emp 
											and h.num_sec = l.num_sec
											and h.cod_con = l.cod_con
where (fec_ret is not null or fec_ret < getdate())
---and cod_emp ='1018410258'
group by  h.nue_con,h.cod_emp,l.num_sec,l.cod_con,l.fec_ini,cod_cia,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cl4,cod_cl5,cod_cl6,cod_cl7,cod_car,
cod_ciu,cod_dep,cod_pai,fec_fin,cau_ret,fec_ret,res_ret,ret_liq,sal_bas,tip_con,tie_ded,tip_pag,
sec_car,cod_ins,cod_nov,tip_nov,cod_empleo,ind_nov,ind_con,fec_pba,Cla_nom,nom_con,nom_rem,nom_prm,
fec_nov,res_nom,fre_nom,ded_horas,val_hora,clasif_cat,fch_retro,Act_Pose,cod_area,
suc_SS,sal_ant_flex,por_flex,cod_CT,cod_mon,sal_MonExt,cod_CauPro,Cod_esc,Tip_Docente,cod_jus_ret,
ded_horasTot,fch_ajustesal

```
