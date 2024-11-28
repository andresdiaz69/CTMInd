# View: v_GTH_RequisicionEmp

## Usa los objetos:
- [[GTH_Requisicion]]
- [[GTH_RequisicionEmp]]
- [[GTH_RptEmplea]]

```sql
CREATE VIEW dbo.v_GTH_RequisicionEmp
AS
SELECT DISTINCT 
                         dbo.GTH_RequisicionEmp.cod_emp, dbo.GTH_RptEmplea.nom_emp, dbo.GTH_RptEmplea.ap1_emp, dbo.GTH_RptEmplea.ap2_emp, dbo.GTH_Requisicion.fec_sol, 
                         dbo.GTH_Requisicion.car_sol, dbo.GTH_RequisicionEmp.num_req
FROM            dbo.GTH_RequisicionEmp INNER JOIN
                         dbo.GTH_RptEmplea ON dbo.GTH_RptEmplea.cod_emp = dbo.GTH_RequisicionEmp.cod_emp INNER JOIN
                         dbo.GTH_Requisicion ON dbo.GTH_Requisicion.num_req = dbo.GTH_RequisicionEmp.num_req

```
