# View: V_GTH_AssCandEmp

## Usa los objetos:
- [[GTH_Assessment]]
- [[GTH_RptAssessment]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[V_GTH_AssCandEmp]
AS
SELECT	A.num_req, A.cod_emp, A.cod_emp_evador, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) Nombre,
		A.cvo_ass, A.fec_ass
FROM	GTH_Assessment A
INNER	JOIN rhh_emplea E ON A.cod_emp_evador = E.cod_emp
UNION
SELECT	A.num_req, A.cod_emp, A.cod_emp_evador, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) Nombre,
		A.cvo_ass, A.fec_ass
FROM	GTH_RptAssessment A
INNER	JOIN rhh_emplea E ON A.cod_emp_evador = E.cod_emp


```
