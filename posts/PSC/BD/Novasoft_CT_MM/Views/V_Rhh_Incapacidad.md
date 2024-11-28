# View: V_Rhh_Incapacidad

## Usa los objetos:
- [[rhh_emplea]]
- [[Rhh_Incapacidad]]
- [[Rhh_IncapMov]]
- [[rhh_liqhis]]
- [[rhh_TbTipAus]]

```sql
CREATE VIEW [dbo].[V_Rhh_Incapacidad]
AS  WITH Incapa
	   AS (SELECT I.cod_emp,
			    cod_aus,
			    fec_ini,
			    ini_aus,
			    fin_aus,
			    cer_nro,
			    dias,
			    ind_Canc_Tot,
			    (
			    SELECT ISNULL(SUM(val_liq), 0) AS Expr1
			    FROM dbo.rhh_liqhis AS L
			    WHERE(cod_emp = I.cod_emp)
			    AND (cer_nro = I.cer_nro)
			    AND (fec_cte >= I.ini_aus)
			    AND (cod_con IN(
							SELECT Cod_ConPago
							FROM dbo.rhh_TbTipAus
							WHERE(Cod_ConPago <> '0')
						    )
				   )
			    ) AS ValPagIncEmp,
			    (
			    SELECT ISNULL(SUM(val_mov), 0) AS Expr1
			    FROM dbo.Rhh_IncapMov AS Im
			    WHERE(I.cod_emp = cod_emp) AND (I.cer_nro = cer_nro) AND (tip_mov > 1)
			    ) AS ValRecuIncAdm,
			    (
			    SELECT ISNULL(SUM(val_mov), 0) AS Expr1
			    FROM dbo.Rhh_IncapMov AS Im
			    WHERE(I.cod_emp = cod_emp) AND (I.cer_nro = cer_nro) AND (tip_mov = 1)
			    ) AS Autorizado,
				ind_ctt, fec_rad
		  FROM dbo.Rhh_Incapacidad AS I
		  INNER JOIN rhh_emplea E ON E.COD_EMP =I.cod_emp )
	   SELECT cod_emp,
			cod_aus,
			fec_ini,
			ini_aus,
			fin_aus,
			cer_nro,
			dias,
			ind_Canc_Tot,
			ValPagIncEmp,
			ValRecuIncAdm,
			ValPagIncEmp - ValRecuIncAdm AS Saldo,
			Autorizado,
			IND_CTT,
			fec_rad
	   FROM Incapa AS I;

```
