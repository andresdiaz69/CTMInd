# View: V_Incapacidades_Info

## Usa los objetos:
- [[rhh_ausentismo]]
- [[rhh_TbClasAus]]
- [[rhh_tbenfer]]
- [[rhh_TbTipAus]]

```sql


CREATE VIEW V_Incapacidades_Info
AS
SELECT	A.cod_emp
		, A.cod_aus
		, T.nom_aus
		, A.cod_enf
		, B.nom_enf
		, T.cod_con
		, T.Cod_ConPago
		, T.Cod_ConAuxDias
		, T.Cod_ConAuxPorcentaje
		, C.cla_aus
		, C.des_cla_aus
		, C.Ind_reconocimiento
		, C.Ind_DiaAus
		, C.DiaReconoce
		, A.fec_ini
		, A.fec_fin
		, año_ini = YEAR(A.fec_ini)
		, A.dias
		, A.ini_aus
		, A.fin_aus
		, A.cau_aus
		, A.nro_interno
		, A.res_nro
		, A.cer_nro
		, A.cernro_origen
FROM	[Novasoft_CT_MM].[dbo].[rhh_ausentismo] A
LEFT JOIN	[Novasoft_CT_MM].[dbo].[rhh_TbTipAus] T ON A.cod_aus = T.cod_aus
LEFT JOIN   [Novasoft_CT_MM].[dbo].[rhh_tbenfer] B ON A.cod_enf = B.cod_enf
LEFT JOIN	[Novasoft_CT_MM].[dbo].[rhh_TbClasAus] C ON T.cla_aus = C.cla_aus
```
