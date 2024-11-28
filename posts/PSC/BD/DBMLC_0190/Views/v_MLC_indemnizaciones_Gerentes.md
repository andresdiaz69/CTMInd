# View: v_MLC_indemnizaciones_Gerentes

## Usa los objetos:
- [[rhh_DefConcep]]
- [[rhh_emplea]]
- [[rhh_liqhis]]

```sql
CREATE VIEW [dbo].[v_MLC_indemnizaciones_Gerentes] AS
SELECT CodigoEmpleado=Cod_emp,nombres,NombreConcepto=nom_con,Valor=val_liq
FROM (
	SELECT  orden = ROW_NUMBER() OVER (PARTITION BY l.cod_emp ORDER BY l.fec_cte DESC),
	l.cod_emp,Nombres = e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,l.ano_liq,l.per_liq,l.fec_cte,l.cod_con,c.nom_con,l.val_liq
	FROM		[Novasoft_CT_MM].dbo.rhh_liqhis		l
	LEFT JOIN	[Novasoft_CT_MM].dbo.rhh_DefConcep	c	ON	l.cod_con = c.cod_con
	LEFT JOIN	[Novasoft_CT_MM].dbo.rhh_emplea		e	ON	l.cod_emp = e.cod_emp
	WHERE l.tip_liq = '01'
	AND l.nat_liq = 3
	AND l.cod_con   in ('008416') 
)a WHERE orden = 1
--order by val_liq

```
