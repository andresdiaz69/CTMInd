# View: V_SST_EmpEventos

## Usa los objetos:
- [[SST_EventosInvita]]
- [[V_SST_Invitado]]

```sql
CREATE VIEW [dbo].[V_SST_EmpEventos]
AS
SELECT        EI.cod_cia, EI.anio, EI.version, EI.cod_suc, EI.cod_cli, EI.cons, EI.cod_even, EI.num_ses, EI.cod_emp, E.nom_emp
FROM            dbo.SST_EventosInvita AS EI INNER JOIN
                         dbo.V_SST_Invitado AS E ON EI.cod_emp = E.cod_emp

```
