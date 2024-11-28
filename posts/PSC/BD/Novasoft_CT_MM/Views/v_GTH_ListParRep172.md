# View: v_GTH_ListParRep172

## Usa los objetos:
- [[GTH_Emp_vinculados]]
- [[rhh_emplea]]

```sql
-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.07.30
-- Description:	Retorna vista para filtros de reporte GTH172
--
--	SELECT * from v_GTH_ListParRep172
--
-- =============================================
CREATE VIEW [dbo].[v_GTH_ListParRep172]
AS

	SELECT emp.cod_emp, 
		'Proceso: ' + CAST(vin.Cod_Proc AS VARCHAR(10)) + ' - ' + 
			RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp)+' '+RTRIM(emp.nom_emp) AS nom_emp, 
		vin.Cod_Proc 
	FROM rhh_emplea emp 
		INNER JOIN GTH_Emp_vinculados vin ON emp.cod_emp=vin.Cod_emp


```
