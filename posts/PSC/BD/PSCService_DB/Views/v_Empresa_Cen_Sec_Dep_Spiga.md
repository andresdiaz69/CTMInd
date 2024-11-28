# View: v_Empresa_Cen_Sec_Dep_Spiga

## Usa los objetos:
- [[Centros]]
- [[Departamentos]]
- [[EmpresaCentros]]
- [[EmpresaCentroSecciones]]
- [[Empresas]]
- [[Secciones]]

```sql




CREATE view [dbo].[v_Empresa_Cen_Sec_Dep_Spiga] as
select Cod_empresa=t1.PkEmpresas, Nombre_Empresa=t1.Nombre, Cod_Centro=t2.PkFkCentros, Nombre_Centro=t4.Nombre, 
Cod_seccion=t5.PkSecciones_Iden, 
Nombre_Seccion=replace(replace(replace(replace(replace(replace(t5.Descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), Cod_Departamento=replace(replace(replace(replace(replace(replace(t6.PkDepartamentos,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), Nombre_Departamento=replace(replace(replace(replace(replace(replace(t6.Descripcion ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
from				[192.168.90.10\SPIGAPLUS].[DMS00280].CM.Empresas					as t1
INNER JOIN			[192.168.90.10\SPIGAPLUS].[DMS00280].CM.EmpresaCentros			as t2 on	t2.PkFkEmpresas=t1.PkEmpresas
LEFT OUTER JOIN		[192.168.90.10\SPIGAPLUS].[DMS00280].CM.EmpresaCentroSecciones	as t3 on	t3.PkFkEmpresas=t2.PkFkEmpresas 
																						and t3.PkFkCentros=t2.PkFkCentros
INNER JOIN			[192.168.90.10\SPIGAPLUS].[DMS00280].CM.Centros					as t4 on	t4.PkCentros=t2.PkFkCentros
LEFT OUTER JOIN		[192.168.90.10\SPIGAPLUS].[DMS00280].CM.Secciones					as t5 on	t5.PkSecciones_Iden=t3.PkFkSecciones
LEFT OUTER JOIN		[192.168.90.10\SPIGAPLUS].[DMS00280].CM.Departamentos				as t6 on	t6.PkDepartamentos=t5.FkDepartamentos
where T3.fechabaja is null

```
