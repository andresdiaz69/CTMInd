# View: V_GTH_VisitaCandEmp

## Usa los objetos:
- [[GTH_RptVisitaDomi]]
- [[GTH_VisitaDomi]]

```sql

CREATE VIEW [dbo].[V_GTH_VisitaCandEmp]
AS
SELECT	num_req, cod_emp, ID_Visita, fec_vis
FROM	GTH_VisitaDomi
UNION
SELECT	num_req, cod_emp, ID_Visita, fec_vis
FROM	GTH_RptVisitaDomi


```
