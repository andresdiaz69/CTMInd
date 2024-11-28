# View: V_SST_Roles

## Usa los objetos:
- [[rhh_emplea]]
- [[SST_EmpRolSGSST]]
- [[SST_Roles]]

```sql
CREATE VIEW [dbo].[V_SST_Roles]
AS
SELECT        ER.cod_cia, ER.cod_rol, R.des_rol, ER.cod_emp, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) AS nom_emp, ER.fec_ini, ER.fec_fin
FROM            dbo.SST_EmpRolSGSST AS ER INNER JOIN
                         dbo.SST_Roles AS R ON ER.cod_rol = R.cod_rol AND ER.cod_cia = R.cod_cia INNER JOIN
                         dbo.rhh_emplea AS E ON ER.cod_emp = E.cod_emp

```
