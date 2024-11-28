# View: v_ctt_contratos

## Usa los objetos:
- [[GTH_CONTRATOS]]
- [[RHH_EMPLEA]]

```sql
CREATE VIEW [dbo].[v_ctt_contratos]
AS
SELECT	C.cod_emp, C.cod_con, C.num_cont, C.tip_con, C.fec_con, C.not_con, C.cla_sal, C.tip_cot,
		C.SubTip_Cot, C.ind_extjero, C.ind_resi_extjero, C.cod_pai, C.cod_dep, C.cod_ciu,
		C.ind_ley1393, C.cod_est, C.ind_contrat, C.ind_L1450, C.fec_pba, C.num_req, C.Tip_VincDian,
		C.TipBenef, C.id_proceso,por_rete, por_iva,por_retiva,cod_act,por_ica,por_SSctt
FROM	GTH_CONTRATOS C WITH(NOLOCK) INNER JOIN RHH_EMPLEA E WITH(NOLOCK) ON C.cod_emp =E.cod_emp
WHERE	E.ind_ctt= 1

```
