# View: v_GTH_Evalua

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[v_GTH_Evalua]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst, ind_des
FROM            dbo.GTH_Evalua
WHERE        (cod_ori IN ('07', '0')) OR
                         (cod_eva = '0')

```
