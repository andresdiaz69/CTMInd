# View: V_GTH_EntrevCandEmp

## Usa los objetos:
- [[GTH_Entrevista]]
- [[GTH_RptEntrevista]]
- [[GTH_TipoEntrev]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[V_GTH_EntrevCandEmp]
AS
SELECT        ET.num_req, ET.cod_emp, ET.cod_ent, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) Nombre, ET.Tip_Ent, TE.Des_TipEnt, ET.Fec_Ent, ET.Num_Ent
FROM            GTH_Entrevista ET INNER JOIN
                         rhh_emplea E ON ET.cod_ent = E.cod_emp INNER JOIN
                         GTH_TipoEntrev TE ON ET.Tip_Ent = TE.Tip_Ent
UNION
SELECT        ET.num_req, ET.cod_emp, ET.cod_ent, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) Nombre, ET.Tip_Ent, TE.Des_TipEnt, ET.Fec_Ent, ET.Num_Ent
FROM            GTH_RptEntrevista ET INNER JOIN
                         rhh_emplea E ON ET.cod_ent = E.cod_emp INNER JOIN
                         GTH_TipoEntrev TE ON ET.Tip_Ent = TE.Tip_Ent



```
