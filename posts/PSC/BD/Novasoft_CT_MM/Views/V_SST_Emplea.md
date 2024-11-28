# View: V_SST_Emplea

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_hislab]]

```sql
CREATE VIEW [dbo].[V_SST_Emplea]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) AS nom_emp, H.cod_suc, H.cod_cco, H.cod_cia, H.fec_ini, H.fec_fin
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.rhh_hislab AS H ON E.cod_emp = H.cod_emp

```
