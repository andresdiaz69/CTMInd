# View: v_GTH_Eval_SalOcupa

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[v_GTH_Eval_SalOcupa]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst
FROM            dbo.GTH_Evalua
WHERE        (cod_ori = '05') OR
                         (cod_eva = '0')

```
