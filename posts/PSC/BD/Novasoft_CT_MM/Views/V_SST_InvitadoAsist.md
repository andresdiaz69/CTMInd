# View: V_SST_InvitadoAsist

## Usa los objetos:
- [[SST_EventosInvita]]
- [[V_SST_Invitado]]

```sql
CREATE VIEW [dbo].[V_SST_InvitadoAsist]
AS
SELECT        EI.cod_cia, EI.anio, EI.version, EI.cod_suc, EI.cod_cli, EI.cons, EI.cod_even, EI.cod_emp, V.nom_emp
FROM            dbo.SST_EventosInvita AS EI INNER JOIN
                         dbo.V_SST_Invitado AS V ON EI.cod_emp = V.cod_emp
WHERE        (EI.ind_asis = 1)
GROUP BY EI.cod_cia, EI.anio, EI.version, EI.cod_suc, EI.cod_cli, EI.cons, EI.cod_even, EI.cod_emp, V.nom_emp

```
