# View: v_cie_infoalu

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_cursos]]
- [[cie_grados]]
- [[cie_nivel]]

```sql

/*VISTA INFORMACION ALUMNOS
JCESARS		MAYO/2010*/
CREATE VIEW [dbo].[v_cie_infoalu] 
AS
SELECT a.cod_alu,a.nom_alu,a.cod_gra,g.des_gra,a.cod_niv,n.des_niv,a.cod_cur,c.nom_cur
FROM cie_alumnos AS a WITH(NOLOCK)
	INNER JOIN cie_nivel AS n WITH(NOLOCK) ON a.cod_niv=n.cod_niv
	INNER JOIN cie_grados AS g WITH(NOLOCK) ON a.cod_gra=g.cod_gra
	INNER JOIN cie_cursos AS c WITH(NOLOCK) ON a.cod_cur=c.cod_cur;

```
