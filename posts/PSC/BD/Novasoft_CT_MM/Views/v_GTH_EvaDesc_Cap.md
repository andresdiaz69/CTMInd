# View: v_GTH_EvaDesc_Cap

## Usa los objetos:
- [[GTH_Evalua]]
- [[GTH_Evalua_Estado]]
- [[GTH_EventoInvita]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[v_GTH_EvaDesc_Cap]
AS
SELECT        EI.cod_even, EE.cod_ori, EE.cod_eva, EE.consec_eva, E.ap1_emp, E.ap2_emp, E.nom_emp, EI.cod_emp
FROM            dbo.GTH_EventoInvita AS EI INNER JOIN
                         dbo.GTH_Evalua_Estado AS EE ON EI.cod_even = EE.codigo INNER JOIN
                         dbo.rhh_emplea AS E ON EI.cod_emp = E.cod_emp INNER JOIN
                         dbo.GTH_Evalua AS EV ON EE.cod_eva = EV.cod_eva AND EE.cod_eva = EV.cod_eva
WHERE        (EE.cod_ori = '02' OR
                         EE.cod_ori = '04') AND (EI.ind_asis = 1)


```
