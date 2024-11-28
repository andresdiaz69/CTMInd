# View: V_GTH_AreaEmpleaPS

## Usa los objetos:
- [[fn_GTH_HisLab_NumSec]]
- [[GTH_Areas]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_tbestlab]]

```sql
CREATE VIEW [dbo].[V_GTH_AreaEmpleaPS]
AS
SELECT        H.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) + ' (' + RTRIM(EL.nom_est) + ')' AS nom_emp, H.cod_cia, H.cod_area
FROM            dbo.rhh_hislab AS H INNER JOIN
                         dbo.rhh_emplea AS E ON H.cod_emp = E.cod_emp AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(H.cod_emp) LEFT OUTER JOIN
                         dbo.GTH_Areas AS A ON H.cod_cia = A.cod_cia AND H.cod_area = A.cod_area INNER JOIN
                         dbo.rhh_tbestlab AS EL ON E.est_lab = EL.est_lab

```
