# View: vw_SpigaEmpresasMarcas

## Usa los objetos:
- [[EmpresaCentroMarcas]]
- [[Empresas]]
- [[Marcas]]

```sql




CREATE VIEW [dbo].[vw_SpigaEmpresasMarcas] AS
SELECT    t1.PkFkEmpresas CodigoEmpresa,t2.Nombre NombreEmpresa,t1.PkFkMarcas CodigoMarca,upper(t3.Nombre) NombreMarca
FROM [192.168.90.10\SPIGAPLUS].DMS00280.CM.EmpresaCentroMarcas t1 inner join
[192.168.90.10\SPIGAPLUS].DMS00280.CM.Empresas t2 on t1.PkFkEmpresas = t2.PkEmpresas inner join
[192.168.90.10\SPIGAPLUS].DMS00280.CM.Marcas t3 on t1.PkFkMarcas = t3.PkMarcas
where t1.FechaBaja is null
group by PkFkEmpresas,PkFkMarcas,t2.Nombre,t3.Nombre



```
