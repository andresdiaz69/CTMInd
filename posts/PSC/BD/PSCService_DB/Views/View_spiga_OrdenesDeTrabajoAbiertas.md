# View: View_spiga_OrdenesDeTrabajoAbiertas

## Usa los objetos:
- [[Empresas]]
- [[spiga_OrdenesDeTrabajoAbiertas]]
- [[UnidadDeNegocio]]

```sql
CREATE VIEW View_spiga_OrdenesDeTrabajoAbiertas AS
SELECT * FROM 
spiga_OrdenesDeTrabajoAbiertas a 
LEFT JOIN DBMLC_0190..Empresas b ON (b.CodigoEmpresa = a.IdEmpresas) 
LEFT JOIN DBMLC_0190..UnidadDeNegocio c ON (c.CodEmpresa = a.IdEmpresas AND 
                                            c.CodCentro  = a.IdCentros   AND 
											c.CodSeccion = a.IdSecciones AND 
											a.IdEmpresas = b.CodigoEmpresa AND 
											c.CodEmpresa = b.CodigoEmpresa) 
WHERE a.IdEmpresas IN (1,5,6)


```
