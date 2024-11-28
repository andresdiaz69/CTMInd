# View: v_GTH_EvaDesc_Sel

## Usa los objetos:
- [[GTH_EvalSolCargo]]
- [[GTH_Evalua]]
- [[GTH_Evalua_Estado]]
- [[GTH_RequisicionEmp]]
- [[GTH_RptEmplea]]

```sql
CREATE VIEW [dbo].[v_GTH_EvaDesc_Sel]
AS
SELECT        dbo.GTH_Evalua_Estado.cod_ori, dbo.GTH_Evalua_Estado.cod_eva, dbo.GTH_Evalua.Nom_eva, dbo.GTH_Evalua_Estado.consec_eva, dbo.GTH_EvalSolCargo.cod_emp, dbo.GTH_RptEmplea.ap1_emp, 
                         dbo.GTH_RptEmplea.ap2_emp, dbo.GTH_RptEmplea.nom_emp, dbo.GTH_Evalua_Estado.codigo
FROM            dbo.GTH_RequisicionEmp INNER JOIN
                         dbo.GTH_EvalSolCargo ON dbo.GTH_RequisicionEmp.num_req = dbo.GTH_EvalSolCargo.num_req AND dbo.GTH_RequisicionEmp.cod_emp = dbo.GTH_EvalSolCargo.cod_emp INNER JOIN
                         dbo.GTH_Evalua_Estado ON dbo.GTH_EvalSolCargo.cod_eva = dbo.GTH_Evalua_Estado.cod_eva INNER JOIN
                         dbo.GTH_RptEmplea ON dbo.GTH_RequisicionEmp.cod_emp = dbo.GTH_RptEmplea.cod_emp INNER JOIN
                         dbo.GTH_Evalua ON dbo.GTH_EvalSolCargo.cod_eva = dbo.GTH_Evalua.cod_eva
WHERE        (dbo.GTH_Evalua_Estado.cod_ori IN ('01', '08', '09', '11'))

```
