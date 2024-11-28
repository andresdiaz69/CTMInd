# View: vw_CiudadesDepartamentos

## Usa los objetos:
- [[ICACiudades]]
- [[ICADepartamentos]]

```sql


CREATE VIEW [dbo].[vw_CiudadesDepartamentos]
AS
SELECT        dbo.ICACiudades.CodigoCiudad, dbo.ICACiudades.NombreCiudad, dbo.ICADepartamentos.CodigoDpto, dbo.ICADepartamentos.NombreDpto
FROM            dbo.ICACiudades INNER JOIN
                         dbo.ICADepartamentos ON dbo.ICACiudades.FK_CodigoDpto = dbo.ICADepartamentos.CodigoDpto

```
