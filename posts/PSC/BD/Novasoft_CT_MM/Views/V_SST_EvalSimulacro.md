# View: V_SST_EvalSimulacro

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[V_SST_EvalSimulacro]
AS
SELECT        cod_eva, Nom_eva, ver_eva, Fec_cre, cod_ori, txt_inst
FROM            dbo.GTH_Evalua
WHERE        (cod_ori = '10') OR
                         (cod_eva = '0')

```
