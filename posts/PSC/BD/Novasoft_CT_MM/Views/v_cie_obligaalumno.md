# View: v_cie_obligaalumno

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_obligafammad]]
- [[cie_obligafampad]]
- [[cie_obligafamter]]

```sql

CREATE VIEW [dbo].[v_cie_obligaalumno]
AS
	SELECT a.cod_alu,a.cod_fam,ISNULL(b.cod_obliga,'R-99-PN') AS cod_obliga
	FROM cie_alumnos AS a WITH (NOLOCK)
		LEFT OUTER JOIN cie_obligafampad AS b WITH (NOLOCK) ON a.cod_fam=b.cod_fam
	WHERE a.ter_dec=1
	UNION ALL 
	SELECT a.cod_alu,a.cod_fam,ISNULL(b.cod_obliga,'R-99-PN') AS cod_obliga
	FROM cie_alumnos AS a WITH (NOLOCK)
		LEFT OUTER JOIN cie_obligafammad AS b WITH (NOLOCK) ON a.cod_fam=b.cod_fam
	WHERE a.ter_dec=2
	UNION ALL 
	SELECT a.cod_alu,a.cod_fam,ISNULL(b.cod_obliga,'R-99-PN') AS cod_obliga
	FROM cie_alumnos AS a WITH (NOLOCK)
		LEFT OUTER JOIN cie_obligafamter AS b WITH (NOLOCK) ON a.cod_fam=b.cod_fam
	WHERE a.ter_dec=3;

```
