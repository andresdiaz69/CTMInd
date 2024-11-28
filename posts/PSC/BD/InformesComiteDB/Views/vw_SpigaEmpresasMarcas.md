# View: vw_SpigaEmpresasMarcas

## Usa los objetos:
- [[spiga_EmpresasMarcas]]

```sql

CREATE VIEW [dbo].[vw_SpigaEmpresasMarcas]
AS
	select CodigoEmpresa,NombreEmpresa,CodigoMarca,NombreMarca 
	from PSCService_DB..spiga_EmpresasMarcas 
	group by CodigoEmpresa,NombreEmpresa,CodigoMarca,NombreMarca

```
