# View: V_SST_EventoInvitado

## Usa los objetos:
- [[GTH_Emplea_Externo]]
- [[rhh_emplea]]
- [[rhh_tbestlab]]
- [[SST_ClasificaExterno]]
- [[SST_EventosInvita]]

```sql
CREATE VIEW [dbo].[V_SST_EventoInvitado]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) + ' (' + RTRIM(EL.nom_est) + ')' AS nom_emp, 
EV.anio, EV.version, EV.cons, EV.cod_even, EV.ind_asis
FROM            dbo.rhh_emplea AS E WITH (NOLOCK) INNER JOIN
                         dbo.rhh_tbestlab AS EL WITH (NOLOCK) ON E.est_lab = EL.est_lab INNER JOIN
                         dbo.SST_EventosInvita AS EV WITH (NOLOCK) ON E.cod_emp = EV.cod_emp
GROUP BY E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp), EL.nom_est, EV.anio, EV.version, EV.cons, EV.cod_even, EV.ind_asis
UNION ALL
SELECT        E.cod_emp_ext AS cod_emp, RTRIM(E.nom_emp_ext) + ' (' + RTRIM(C.des_clas) + ')' AS nom_emp, EV.anio, EV.version, EV.cons, EV.cod_even, EV.ind_asis
FROM            GTH_Emplea_Externo AS E WITH (NOLOCK) INNER JOIN
                         SST_ClasificaExterno AS C WITH (NOLOCK) ON E.cod_clas = C.cod_clas INNER JOIN
                         dbo.SST_EventosInvita AS EV WITH (NOLOCK) ON E.cod_emp_ext = EV.cod_emp
GROUP BY E.cod_emp_ext, E.nom_emp_ext, C.des_clas, EV.anio, EV.version, EV.cons, EV.cod_even, EV.ind_asis

```
