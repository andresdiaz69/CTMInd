# View: V_GTH_OrgVigActEmp

## Usa los objetos:
- [[GTH_OrgActObjEmplea]]

```sql

CREATE VIEW [dbo].[V_GTH_OrgVigActEmp]
AS
SELECT        cod_vig, cons, cod_emp, cod_cia
FROM            dbo.GTH_OrgActObjEmplea
GROUP BY cod_vig, cons, cod_emp,cod_cia

```
