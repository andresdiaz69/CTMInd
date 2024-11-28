# View: v_GTH_AsistenteEvento

## Usa los objetos:
- [[GTH_Asistencia]]
- [[GTH_Eventos]]
- [[rhh_emplea]]

```sql
CREATE VIEW dbo.v_GTH_AsistenteEvento
AS
SELECT     dbo.rhh_emplea.cod_emp, dbo.rhh_emplea.ap1_emp, dbo.rhh_emplea.ap2_emp, dbo.rhh_emplea.nom_emp, dbo.GTH_Eventos.cod_even, 
                      dbo.GTH_Eventos.nom_even, dbo.GTH_Asistencia.pje_Asist, dbo.GTH_Asistencia.Eval_Cuant, dbo.GTH_Asistencia.Eval_Cuali
FROM         dbo.rhh_emplea INNER JOIN
                      dbo.GTH_Asistencia ON dbo.rhh_emplea.cod_emp = dbo.GTH_Asistencia.cod_emp INNER JOIN
                      dbo.GTH_Eventos ON dbo.GTH_Asistencia.cod_even = dbo.GTH_Eventos.cod_even

```
