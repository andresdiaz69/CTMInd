# View: V_GTH_SeguimientoAPO

## Usa los objetos:
- [[fn_GTH_HisLab_NumSec]]
- [[Fn_rhh_NombreCompleto]]
- [[GTH_Eventos]]
- [[GTH_SeguimientoAPO]]
- [[rhh_estudio]]
- [[rhh_hislab]]
- [[rhh_tbinsti]]

```sql

CREATE VIEW [dbo].[V_GTH_SeguimientoAPO]
AS
SELECT EST.cons, EST.cod_emp, dbo.Fn_rhh_NombreCompleto(EST.cod_emp,2) AS nom_emp, EST.cod_est, EST.nom_est, INS.cod_mes AS cod_ins, HIS.cod_cia,
	   INS.nom_ins, EST.cod_even, EVE.nom_even, EST.fec_gra, SEG.fec_vigi, SEG.fec_vigf
FROM   dbo.rhh_estudio AS EST 
INNER JOIN rhh_hislab AS HIS ON EST.cod_emp = HIS.cod_emp AND HIS.num_sec = dbo.fn_GTH_HisLab_NumSec(EST.cod_emp)
INNER JOIN dbo.rhh_tbinsti AS INS ON EST.cod_ins = INS.cod_ins 
INNER JOIN dbo.GTH_Eventos AS EVE ON EST.cod_even = EVE.cod_even 
LEFT JOIN dbo.GTH_SeguimientoAPO AS SEG ON EST.cod_emp = SEG.cod_emp AND EST.cons = SEG.cons AND EST.cod_est = SEG.cod_est AND EST.cod_ins = SEG.cod_ins AND EST.cod_even = SEG.cod_even
WHERE EST.tipo_est IN ('03', '04');

```
