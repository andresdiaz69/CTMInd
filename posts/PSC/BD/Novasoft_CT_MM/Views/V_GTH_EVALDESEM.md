# View: V_GTH_EVALDESEM

## Usa los objetos:
- [[GTH_EvaExternos]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[V_GTH_EVALDESEM]
AS
SELECT        cod_emp AS cod_evador, RTRIM(nom_emp) + RTRIM(' ' + ap1_emp) + RTRIM(' ' + ap2_emp) AS nom_emp_evador, e_mail
FROM            rhh_emplea
UNION ALL
SELECT        Cod_Eva_Ext AS cod_evador, Nom_Eva_Ext AS nom_emp_evador, E_Mail AS e_mail
FROM            GTH_EvaExternos


```
