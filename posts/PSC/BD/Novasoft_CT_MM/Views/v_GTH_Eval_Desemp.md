# View: v_GTH_Eval_Desemp

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[v_GTH_Eval_Desemp]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst, ind_des
FROM            dbo.GTH_Evalua
WHERE        (cod_ori = '06') OR
                         (cod_eva = '0')

```
