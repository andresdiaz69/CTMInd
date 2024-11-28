# View: V_GTH_ProcesoDisciplinario

## Usa los objetos:
- [[GTH_LlamAten]]
- [[GTH_LlamMotivo]]
- [[GTH_ProcesoDisciplinario]]

```sql
CREATE VIEW dbo.V_GTH_ProcesoDisciplinario
AS
SELECT        Pd.Cod_Proc, Lm.des_mot, La.cod_emp
FROM            dbo.GTH_ProcesoDisciplinario AS Pd INNER JOIN
                         dbo.GTH_LlamMotivo AS Lm ON Pd.Cod_Mot = Lm.cod_mot INNER JOIN
                         dbo.GTH_LlamAten AS La ON Pd.Cod_Proc = La.Cod_Proc

```
