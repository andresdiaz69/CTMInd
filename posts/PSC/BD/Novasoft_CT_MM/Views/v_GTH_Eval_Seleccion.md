# View: v_GTH_Eval_Seleccion

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[v_GTH_Eval_Seleccion]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst, ind_des
FROM            dbo.GTH_Evalua
WHERE        (cod_ori IN ('01', '08', '09', '11')) OR
                         (cod_eva = '0')

```
