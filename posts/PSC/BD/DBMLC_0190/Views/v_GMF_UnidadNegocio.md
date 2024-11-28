# View: v_GMF_UnidadNegocio

## Usa los objetos:
- [[GMF_SedesParametros]]
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[v_GMF_UnidadNegocio]
AS
SELECT DISTINCT b.CodEmpresa, CAse when b.CodEmpresa in (1,3,5) then 'CASATORO' when b.CodEmpresa = 6 then 'MOTORES Y MAQUINAS S.A.' END AS 'Empresa', 
a.UnidadNegocio, 
b.CodCentro, b.NombreCentro--, 
--b.CodSeccion, b.NombreSeccion, 
--b.CodDepartamento, b.NombreDepartamento
FROM            dbo.GMF_SedesParametros AS a INNER JOIN
                         dbo.UnidadDeNegocio AS b ON a.UnidadNegocio = b.NombreUnidadNegocio
GROUP BY b.CodEmpresa, a.UnidadNegocio, b.CodCentro, b.NombreCentro, b.CodSeccion, b.NombreSeccion, b.CodDepartamento, b.NombreDepartamento


```
