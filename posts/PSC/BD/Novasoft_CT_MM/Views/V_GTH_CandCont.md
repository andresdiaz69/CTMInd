# View: V_GTH_CandCont

## Usa los objetos:
- [[GTH_RequisicionEmp]]
- [[v_GTH_EmplCand]]

```sql
CREATE VIEW [dbo].[V_GTH_CandCont]
AS
SELECT        RE.num_req, RE.cod_emp, EC.NOM_EMP
FROM            dbo.GTH_RequisicionEmp AS RE INNER JOIN
                         dbo.v_GTH_EmplCand AS EC ON RE.cod_emp = EC.cod_emp
WHERE        (RE.ind_cnt = 1)

```
