# View: v_GTH_For_Desvi

## Usa los objetos:
- [[GTH_Evalua]]

```sql

CREATE VIEW [dbo].[v_GTH_For_Desvi]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst
FROM            dbo.GTH_Evalua
WHERE        (cod_ori IN ('12', '13')) OR
                         (cod_eva = '0')


```
