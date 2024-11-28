# View: V_GTH_EmpConv

## Usa los objetos:
- [[rhh_EmpConv]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[V_GTH_EmpConv]
AS
SELECT DISTINCT E.cod_emp, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) AS Nombre, Ec.cod_conv, Ec.conv_suc, Ec.conv_cco, E.cod_car
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.rhh_EmpConv AS Ec ON E.cod_emp = Ec.cod_emp AND Ec.fec_ini <= GETDATE() AND (Ec.fec_fin IS NULL OR
                         Ec.fec_fin >= GETDATE()) AND E.est_lab NOT IN ('00', '99')


```
