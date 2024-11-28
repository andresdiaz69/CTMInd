# View: v_rhh_EmpConvCon

## Usa los objetos:
- [[fn_rhh_ModoEmp]]
- [[rhh_ConcepTip]]
- [[rhh_EmpConv]]
- [[V_rhh_concep]]

```sql

CREATE VIEW [dbo].[v_rhh_EmpConvCon]
AS
SELECT     dbo.rhh_EmpConv.cod_emp, dbo.rhh_EmpConv.cod_conv, dbo.V_rhh_concep.cod_con
FROM         dbo.rhh_EmpConv CROSS JOIN
					  dbo.V_rhh_concep INNER JOIN
					  dbo.rhh_ConcepTip ON dbo.V_rhh_concep.tipo_con = dbo.rhh_ConcepTip.tipo_con
WHERE     (dbo.V_rhh_concep.mod_liq = dbo.fn_rhh_ModoEmp(dbo.rhh_EmpConv.cod_emp, GETDATE()) OR
					  dbo.V_rhh_concep.mod_liq = '0') AND (dbo.V_rhh_concep.tipo_con IN ('01', '02', '03', '04'))


```
