# View: V_SST_EventoEvaEnc

## Usa los objetos:
- [[GTH_Evalua]]
- [[SST_Eventos]]

```sql
CREATE VIEW [dbo].[V_SST_EventoEvaEnc]
AS
SELECT        E.cod_cia, E.anio, E.version, E.cod_suc, E.cod_cli, E.cons, E.cod_even, E.cod_eva, EV.Nom_eva
FROM            SST_Eventos AS E INNER JOIN
                         GTH_Evalua AS EV ON E.cod_eva = EV.cod_eva AND EV.cod_ori = '05'
UNION
SELECT        E.cod_cia, E.anio, E.version, E.cod_suc, E.cod_cli, E.cons, E.cod_even, E.Enc_Sat AS cod_eva, EV.Nom_eva
FROM            SST_Eventos AS E INNER JOIN
                         GTH_Evalua AS EV ON E.Enc_Sat = EV.cod_eva AND EV.cod_ori = '05'

```
