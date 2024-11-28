# View: v_cxp_prov1450

## Usa los objetos:
- [[cxp_provee]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_prov1450]
AS

SELECT provee,rso
FROM cxp_provee WITH (NOLOCK)
WHERE ind_1450=1
UNION ALL
SELECT provee,rso
FROM cxp_provee WITH (NOLOCK)
WHERE ind_iman=1

```
