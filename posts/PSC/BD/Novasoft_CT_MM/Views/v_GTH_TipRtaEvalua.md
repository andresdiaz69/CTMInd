# View: v_GTH_TipRtaEvalua

## Usa los objetos:
- [[GTH_PregEvalua]]
- [[GTH_TipoRta]]

```sql
CREATE VIEW dbo.v_GTH_TipRtaEvalua
AS
SELECT     dbo.GTH_TipoRta.tip_rta, dbo.GTH_TipoRta.des_tip, dbo.GTH_PregEvalua.cod_eva, dbo.GTH_PregEvalua.ide_pre, dbo.GTH_PregEvalua.num_pre, 
                      dbo.GTH_PregEvalua.Pregunta
FROM         dbo.GTH_TipoRta INNER JOIN
                      dbo.GTH_PregEvalua ON dbo.GTH_TipoRta.tip_rta = dbo.GTH_PregEvalua.tip_rta

```
