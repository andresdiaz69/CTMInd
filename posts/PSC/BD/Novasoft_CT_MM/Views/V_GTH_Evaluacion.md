# View: V_GTH_Evaluacion

## Usa los objetos:
- [[GTH_Evalua]]

```sql
CREATE VIEW [dbo].[V_GTH_Evaluacion]
AS
SELECT        cod_eva, CASE WHEN ind_des = 1 THEN Nom_eva + ' (Desactivada)' ELSE Nom_eva END AS Nom_eva, cod_ori
FROM            dbo.GTH_Evalua

```
