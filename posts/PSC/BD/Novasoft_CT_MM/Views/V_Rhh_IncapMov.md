# View: V_Rhh_IncapMov

## Usa los objetos:
- [[Rhh_IncapMov]]
- [[Rhh_IncapMov]]
- [[Rhh_IncapTipMov]]

```sql

CREATE VIEW [dbo].[V_Rhh_IncapMov]
AS
SELECT     cod_emp, cod_aus, fec_ini, cer_nro, num_mov, tip_mov, fec_mov, num_auto, val_mov, for_pag, CASE Ie.tip_mov WHEN 1 THEN
						  (SELECT     SUM(Ii.val_mov * CASE T .tip_ope WHEN 'S' THEN 1 WHEN 'R' THEN - 1 ELSE 0 END)
							FROM          Rhh_IncapMov Ii INNER JOIN
												   Rhh_IncapTipMov T ON T .tip_mov = Ii.tip_mov
							WHERE      Ii.cod_emp = Ie.cod_emp AND Ii.cod_aus = Ie.cod_aus AND Ii.fec_ini = Ie.fec_ini AND Ii.cer_nro = Ie.cer_nro AND Ii.num_auto = Ie.num_auto) 
					  ELSE 0 END AS Saldo
FROM         dbo.Rhh_IncapMov AS Ie

```
