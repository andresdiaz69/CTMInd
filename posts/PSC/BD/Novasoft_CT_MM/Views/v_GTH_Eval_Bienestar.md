# View: v_GTH_Eval_Bienestar

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[v_GTH_Eval_Bienestar]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst, ind_des
FROM            dbo.GTH_Evalua
WHERE        (cod_ori = '03') OR
                         (cod_eva = '0')

```
