# View: V_GTH_EjeEvaDesem

## Usa los objetos:
- [[GTH_EvaDesemAsig]]
- [[GTH_Evalua]]
- [[GTH_Rol]]

```sql
CREATE VIEW [dbo].[V_GTH_EjeEvaDesem]
AS
SELECT        DA.cod_eva + RTRIM(' - ' + CONVERT(CHAR, DA.cod_rol)) AS cod_eva, RTRIM('Rol ' + R.desc_rol) + RTRIM(' - ' + E.Nom_eva) AS Nom_eva, DA.cod_eva_des, DA.cod_emp_evado, DA.cod_emp_evador, DA.cod_rol, 
                         DA.cod_cia, DA.cod_grup_val
FROM            dbo.GTH_EvaDesemAsig AS DA INNER JOIN
                         dbo.GTH_Evalua AS E ON DA.cod_eva = E.cod_eva INNER JOIN
                         dbo.GTH_Rol AS R ON DA.cod_rol = R.cod_rol

```
