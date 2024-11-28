# View: V_rhh_cons_idlpres

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_liqhis]]

```sql

CREATE VIEW [dbo].[V_rhh_cons_idlpres]
AS

SELECT idl_num, EMP.Cod_emp,RTRIM(LTRIM(EMP.Ap1_emp))+' '+RTRIM(LTRIM(EMP.ap2_emp))+' '+RTRIM(LTRIM(EMP.Nom_emp)) AS NOMBRE,
	  M.fec_liq, M.fec_cte,M.TIP_LIQ
FROM rhh_liqhis AS M
INNER JOIN rhh_emplea AS EMP ON	EMP.cod_emp = M.cod_emp 
WHERE M.COD_CON ='999901'
GROUP BY idl_num, EMP.Cod_emp,EMP.Ap1_emp,EMP.ap2_emp,EMP.Nom_emp,M.fec_liq, M.fec_cte,M.TIP_LIQ

```
