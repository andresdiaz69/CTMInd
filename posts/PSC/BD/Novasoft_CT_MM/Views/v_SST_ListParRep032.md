# View: v_SST_ListParRep032

## Usa los objetos:
- [[rhh_emplea]]
- [[SST_RepreCopasst]]

```sql
-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.09.30
-- Description:	Retorna vista con codigo, nombres para filtros de reporte SST032
--
--	SELECT * from v_SST_ListParRep032
--
-- =============================================
CREATE VIEW [dbo].[v_SST_ListParRep032]
AS

	SELECT emp.cod_emp, RTRIM(emp.ap1_emp) + RTRIM(' '+emp.ap2_emp) + RTRIM(' '+emp.nom_emp) as nombres, 
		rep.cod_copasst, rep.cod_cia 
	FROM rhh_emplea emp 
		INNER JOIN SST_RepreCopasst rep ON emp.cod_emp=rep.cod_emp;


```
