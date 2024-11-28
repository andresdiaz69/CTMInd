# View: V_GTH_EventoInvitadoClimaLaboral

## Usa los objetos:
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua_Estado]]
- [[GTH_EventoInvita]]
- [[GTH_Eventos]]

```sql
CREATE VIEW [dbo].[V_GTH_EventoInvitadoClimaLaboral]
AS
SELECT        EI.cod_even, EI.cod_emp, CASE WHEN EP.nota_eva IS NOT NULL THEN 'Sí' ELSE 'Pendiente' END AS Estado
FROM            dbo.GTH_EventoInvita AS EI INNER JOIN
                         dbo.GTH_Eventos AS EV ON EI.cod_even = EV.cod_even LEFT JOIN
                         dbo.GTH_Evalua_Estado AS EE ON EV.cod_even = EE.codigo AND EV.cod_eva = EE.cod_eva AND EE.cod_ori = '19' LEFT JOIN
                         dbo.GTH_Eval_Estado_Pers AS EP ON EE.consec_eva = EP.consec_eva AND EE.cod_eva = EP.cod_eva AND EI.cod_emp = EP.cod_emp_respond

```
