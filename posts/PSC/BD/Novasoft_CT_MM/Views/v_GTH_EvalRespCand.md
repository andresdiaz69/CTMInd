# View: v_GTH_EvalRespCand

## Usa los objetos:
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua_Estado]]
- [[GTH_Evalua_Respuesta]]
- [[GTH_PregEvalua]]
- [[GTH_Rta]]

```sql
CREATE VIEW [dbo].[v_GTH_EvalRespCand]
AS
SELECT        EEP.cod_eva, EEP.cod_rpt_respond, EvE.cod_ori, ER.ide_pre, ER.cod_rta, ER.txt_lib, PE.Pregunta, EEP.nota_eva, EEP.consec_eva, EEP.id, PE.num_pre, R.Txt_rta, PE.peso_preg * R.val_rta / 100 AS NotaPreg
FROM            dbo.GTH_Evalua_Estado AS EvE INNER JOIN
                         dbo.GTH_Eval_Estado_Pers AS EEP ON EvE.consec_eva = EEP.consec_eva INNER JOIN
                         dbo.GTH_Evalua_Respuesta AS ER ON EEP.consec_eva = ER.consec_eva AND EEP.cod_eva = ER.cod_eva AND EEP.id = ER.id INNER JOIN
                         dbo.GTH_PregEvalua AS PE ON ER.cod_eva = PE.cod_eva AND ER.ide_pre = PE.ide_pre INNER JOIN
                         dbo.GTH_Rta AS R ON ER.cod_rta = R.cod_rta
WHERE        (EvE.cod_ori IN ('01', '08', '09', '11')) AND (EEP.nota_eva IS NOT NULL)

```
