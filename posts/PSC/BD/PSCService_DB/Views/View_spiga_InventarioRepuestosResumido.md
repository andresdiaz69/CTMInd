# View: View_spiga_InventarioRepuestosResumido

## Usa los objetos:
- [[Empresas]]
- [[spiga_InventarioRepuestosResumido]]
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[View_spiga_InventarioRepuestosResumido] AS
SELECT a.*, c.Sigla, c.NombreUnidadNegocio, c.Division FROM 
spiga_InventarioRepuestosResumido a
LEFT JOIN DBMLC_0190..Empresas b ON (a.IdEmpresas = b.CodigoEmpresa)
LEFT JOIN DBMLC_0190..UnidadDeNegocio c ON (c.CodEmpresa = a.IdEmpresas AND
                                            c.CodCentro =  a.IdCentros AND
											c.CodSeccion = a.IdSecciones AND
											a.IdEmpresas = b.CodigoEmpresa AND 
											c.CodEmpresa = b.CodigoEmpresa)
WHERE a.IdEmpresas IN (1,5,6) AND
      a.Stock > 0

-- 22,743 Records

```
