# View: V_SST_EmpRindCta

## Usa los objetos:
- [[rhh_emplea]]
- [[SST_IntegraAltaGerencia]]

```sql
CREATE VIEW [dbo].[V_SST_EmpRindCta]
AS
SELECT        I.cod_emp, RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) + ' ' + RTRIM(E.nom_emp) AS nom_emp, I.cod_alta_gerencia
FROM            dbo.SST_IntegraAltaGerencia AS I WITH (NOLOCK) INNER JOIN
                         dbo.rhh_emplea AS E WITH (NOLOCK) ON I.cod_emp = E.cod_emp
WHERE        (I.rind_cta = 1)

```
