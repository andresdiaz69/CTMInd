# View: v_SST_Eval_Simulacros

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[v_SST_Eval_Simulacros]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst
FROM            dbo.GTH_Evalua
WHERE        (cod_ori = '10') OR
                         (cod_eva = '0')

```
